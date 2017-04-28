'use strict';

//      
var selectionPrototype = {
  data: function(data            , getKey           )         {
    var this$1 = this;

    var precValues = Object.assign({}, this.__data.enter, this.__data.update);
    // flush
    this.__data = {
      enter: {},
      exit: {},
      update: {}
    };
    for (var index         = 0; index < data.length; index += 1) {
      var value = data[index];
      var key = !!getKey ? getKey(value) : index;
      // already exists:
      // --> add in update pool
      // --> remove from precValues to compute exit quickly
      if (key in precValues) {
        this$1.__data.update[key] = value;
        delete precValues[key];
      }
      // else we add it
      else {
        this$1.__data.enter[key] = value;
      }
    }
    this.__data.exit = Object.assign({}, precValues);
    return this;
  },
  enter: function() {
    return Object.values(this.__data.enter);
  },
  update: function() {
    return Object.values(this.__data.update);
  },
  all: function() {
    return Object.values(Object.assign({}, this.__data.enter,
      this.__data.update));
  },
  exit: function() {
    return Object.values(this.__data.exit);
  }
};

var dthree = {
  selections: {},
  selectAll: function(namespace        ) {
    if (typeof namespace === 'undefined') { throw new Error('dthree.selectAll: namespace is not provided'); }
    if (typeof namespace !== 'string') { throw new Error('dthree.selectAll: namespace should be a string'); }
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

module.exports = dthree;
