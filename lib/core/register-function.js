'use strict';

var utils = require('agentia-utilities');
var Asset = require('./asset');
var errors = require('../errors');
var helpers = require('../helpers');

var registerFunction = function registerFunction(id, fn, injectable) {
  helpers.checkMinArgs(arguments, 2);
  helpers.checkMustBeString(id, 'id');

  if (!utils.isFunction(fn)) {
    throw new errors.MustBeFunction('fn');
  }

  if (!utils.isBoolean(injectable)) {
    injectable = false;
  }

  this.registerAsset(new Asset(id, fn, { injectable: injectable }));

  return this;
};

module.exports = registerFunction;
