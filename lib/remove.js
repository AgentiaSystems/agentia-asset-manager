'use strict';

var EventEmitter = require('events').EventEmitter;
var utils = require('agentia-utilities');
var errors = require('./errors');

var remove = function remove(id) {
  var context;

  if (arguments.length < 1) {
    throw new errors.InvalidArguments();
  }

  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }

  if (this._assets[id]) {
    context = this._assets[id]._context;
    if (context instanceof EventEmitter) {
      context.emit('remove');
      context.removeAllListeners('remove');
    }
    delete this._assets[id];
    return this;
  }

  return this;
};

module.exports = remove;
