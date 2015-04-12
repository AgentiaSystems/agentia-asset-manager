'use strict';

var fs = require('fs');
var utils = require('agentia-utilities');
var helpers = require('./helpers');
var errors = require('./errors');

var compatible = module.exports = {};

compatible.get = function get(id, overrides) {
  helpers.checkMinArgs(arguments, 1);

  return this.resolve(id, overrides);
};

compatible.load = function load(id) {
  var file = fs.statSync;

  helpers.checkMinArgs(arguments, 1);

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
