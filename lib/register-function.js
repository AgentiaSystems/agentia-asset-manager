'use strict';

var utils = require('agentia-utilities');
var Asset = require('./asset');
var errors = require('./errors');

var registerFunction = function registerFunction(id, fn, injectable) {
  var asset;

  if (arguments.length < 2) {
    throw new errors.InvalidArguments();
  }

  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }

  if (!utils.isFunction(fn)) {
    throw new errors.MustBeFunction('fn');
  }

  if (!utils.isBoolean(injectable)) {
    injectable = false;
  }

  asset = new Asset(id, fn, { injectable: injectable });
  this._assets[id] = asset;

  return this;
};

module.exports = registerFunction;
