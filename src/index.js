// @flow
import {forEach, isCollection} from 'iterall';
const selectionPrototype = {
  data: function (data: Iterable<any>, getKey: ?Function): Object {
    if (!isCollection(data)) {
      throw new Error('data param should be an Iterable');
    }

    // flush
    // exit will receive by default previous enter and update
    // we'll remove values from it over iteration
    // enter and update are flushed
    // and will be populated over iteration
    this.__data.exit = new Map([...this.__data.update.entries(), ...this.__data.enter.entries()]);
    this.__data.enter.clear();
    this.__data.update.clear();

    forEach(data, (value, index) => {
      const key = !!getKey ? getKey(value, index) : index;
      // already exists:
      // --> add in update pool
      // --> remove from precValues to compute exit quickly
      if (this.__data.exit.has(key)) {
        this.__data.update.set(key, value);
        this.__data.exit.delete(key);
      }
      // else we add it
      else {
        this.__data.enter.set(key, value);
      }
    });
    // chaining pattern
    return this;
  },
  enter: function () {
    return [...this.__data.enter.values()];
  },
  update: function () {
    return [...this.__data.update.values()];
  },
  all: function () {
    return [...this.update(), ...this.enter()];
  },
  exit: function () {
    return [...this.__data.exit.values()];
  }
};

const dthree = {
  selections: {},
  selectAll: function (namespace: string) {
    if (typeof namespace === 'undefined') throw new Error('dthree.selectAll: namespace is not provided');
    if (typeof namespace !== 'string') throw new Error('dthree.selectAll: namespace should be a string');
    if (!(namespace in this.selections)) {
      this.selections[namespace] = Object.create(selectionPrototype);
      this.selections[namespace].__data = {
        enter: new Map(),
        exit: new Map(),
        update: new Map()
      };
    }
    return this.selections[namespace];
  },
};

export default dthree;
