// @flow
const selectionPrototype = {
  data: function(data: Array<any>, getKey: ?Function): Object {
    const precValues = { ...this.__data.enter, ...this.__data.update };
    // flush
    this.__data = {
      enter: {},
      exit: {},
      update: {}
    };
    for (let index: number = 0; index < data.length; index += 1) {
      const value = data[index];
      const key = !!getKey ? getKey(value) : index;
      // already exists:
      // --> add in update pool
      // --> remove from precValues to compute exit quickly
      if (key in precValues) {
        this.__data.update[key] = value;
        delete precValues[key];
      }
      // else we add it
      else {
        this.__data.enter[key] = value;
      }
    }
    this.__data.exit = { ...precValues };
    return this;
  },
  enter: function() {
    return Object.values(this.__data.enter);
  },
  update: function() {
    return Object.values(this.__data.update);
  },
  all: function() {
    return Object.values({
      ...this.__data.enter,
      ...this.__data.update,
    });
  },
  exit: function() {
    return Object.values(this.__data.exit);
  }
};

const dthree = {
  selections: {},
  selectAll: function(namespace: string) {
    if (typeof namespace === 'undefined') throw new Error('dthree.selectAll: namespace is not provided');
    if (typeof namespace !== 'string') throw new Error('dthree.selectAll: namespace should be a string');
    if (!(namespace in this.selections)) {
      this.selections[namespace] = Object.create(selectionPrototype);
      this.selections[namespace].__data = {
        enter: {},
        exit: {},
        update: {}
      };
    }
    return this.selections[namespace];
  },
};

export default dthree;

