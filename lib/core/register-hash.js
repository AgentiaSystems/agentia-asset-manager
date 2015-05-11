'use strict';

var utils = require('agentia-utilities');
var errors = require('../errors');
var helpers = require('../helpers');

var registerHash = function registerHash(hash, injectable) {
  helpers.checkMinArgs(arguments, 1);

  if (!utils.isObject(hash)) {
    throw new errors.MustBeObject('hash');
  }

  if (!utils.isBoolean(injectable)) {
    injectable = false;
  }

  Object.keys(hash).forEach(function(id) {
    var asset = hash[id];
    this.register(id, asset, injectable);
  }, this);

  return this;
};

module.exports = registerHash;
