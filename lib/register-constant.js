'use strict';

var utils = require('agentia-utilities');
var Asset = require('./asset');
var errors = require('./errors');

var registerContant = function registerContant(id, asset) {
  if (arguments.length < 2) {
    throw new errors.InvalidArguments();
  }

  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }

  this._assets[id] = new Asset(id, asset, { constant: true });
  return this;
};

module.exports = registerContant;
