'use strict';


var utils = require('agentia-utilities');
var errors = require('../errors');
var helpers = require('../helpers');

var resolve = function resolve(target, override, context) {

  helpers.checkMinArgs(arguments, 1);

  if (!utils.isObject(override)) {
    override = {};
  }

  if (utils.isString(target)) {
    return this.resolveAsset(target, override, context);
  }

  if (utils.isFunction(target)) {
    return this.invoke(target, override, context);
  }

  throw new errors.MustBeStringOrFunction(target);
};

module.exports = resolve;
