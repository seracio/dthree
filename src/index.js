// @flow
import {forEach, isCollection} from 'iterall';

const selectionPrototype = {
  data: function(data: Iterable<any>, getKey: Function = (value, index) => index): Object {

    // flush
    // exit will receive by default previous enter and update
    // we'll remove values from it over iteration
    // enter and update are flushed
    // and will be populated over iteration
    this.__data.exit = { ...this.__data.enter, ...this.__data.update };
    this.__data.enter = {};
    this.__data.update = {};

    forEach(data, (value, index) => {
      const key = getKey(value, index);
      // already exists:
      // --> add in update pool
      // --> remove from exit
      if (key in this.__data.exit) {
        this.__data.update[key] = value;
        delete this.__data.exit[key];
      }
      // else we add it
      else {
        this.__data.enter[key] = value;
      }
    });
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
