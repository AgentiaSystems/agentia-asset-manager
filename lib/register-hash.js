'use strict';

var utils = require('agentia-utilities');
var errors = require('./errors');

var registerHash = function registerHash(hash, injectable) {
  var id;
  var asset;

  if (arguments.length < 1) {
    throw new errors.InvalidArguments();
  }

  if (!utils.isObject(hash)) {
    throw new errors.MustBeObject('hash');
  }

  if (!utils.isBoolean(injectable)) {
    injectable = false;
  }

  for (id in hash) {
    if (hash.hasOwnProperty(id)) {
      asset = hash[id];
      this.register(id, asset, injectable);
    }
  }

  return this;
};

module.exports = registerHash;
