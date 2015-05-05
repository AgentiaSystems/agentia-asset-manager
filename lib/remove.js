'use strict';

var helpers = require('./helpers');

var remove = function remove(id) {

  helpers.checkMinArgs(arguments, 1);
  helpers.checkMustBeString(id, 'id');

  if (this.__assets[id]) {
    delete this.__assets[id];
  }

  return this;
};

module.exports = remove;
