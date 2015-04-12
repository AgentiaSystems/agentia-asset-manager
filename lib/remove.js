'use strict';

var EventEmitter = require('events').EventEmitter;
var helpers = require('./helpers');

var remove = function remove(id) {
  var context;

  helpers.checkMinArgs(arguments, 1);
  helpers.checkMustBeString(id, 'id');

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
