'use strict';

var helpers = require('./helpers');

var remove = function remove(id) {

  helpers.checkMinArgs(arguments, 1);
  helpers.checkMustBeString(id, 'id');

  if (this._assets[id]) {
    delete this._assets[id];
  }

  return this;
};

module.exports = remove;
