'use strict';

var utils = require('agentia-utilities');
var errors = require('./errors');
var helpers = require('./helpers');

var register = function register(id, asset, injectable) {

  helpers.checkMinArgs(arguments, 1);

  if (utils.isObject(id)) {
    injectable = utils.isBoolean(asset) ? asset : true;
    asset = id;
    return this.registerHash(asset, injectable);
  }

  if (!utils.isString(id)) {
    throw new errors.MustBeString();
  }

  injectable = utils.isBoolean(injectable) ? injectable : true;

  if (utils.isFunction(asset)) {
    return this.registerFunction(id, asset, injectable);
  }

  return this.registerConstant(id, asset);
};

module.exports = register;
