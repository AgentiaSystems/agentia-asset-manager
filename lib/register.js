'use strict';

var utils = require('agentia-utilities');
var helpers = require('./helpers');

var register = function register(id, asset, injectable) {

  helpers.checkMinArgs(arguments, 1);

  if (utils.isObject(id)) {
    injectable = utils.isBoolean(asset) ? asset : true;
    asset = id;
    return this.registerHash(asset, injectable);
  }

  helpers.checkMustBeString(id, 'id');

  injectable = utils.isBoolean(injectable) ? injectable : true;

  if (utils.isFunction(asset)) {
    return this.registerFunction(id, asset, injectable);
  }

  return this.registerInstance(id, asset);
};

module.exports = register;
