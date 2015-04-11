'use strict';

var fs = require('fs');
var utils = require('agentia-utilities');
var errors = require('./errors');

var compatible = exports = module.exports = {};

compatible.get = function get(id, overrides) {
  if (arguments.length < 1) {
    throw new errors.InvalidArguments();
  }

  return this.resolve(id, overrides);
};

compatible.load = function load(id) {
  var file = fs.statSync;

  if (arguments.length < 1) {
    throw new errors.InvalidArguments();
  }

  if (!utils.isString(id)) {
    throw new errors.MustBeString();
  }

  if (file(id).isDirectory()) {
    this.registerFolder(id, true);
    return this;
  }

  this.registerModule(id, true);
  return this;
};
