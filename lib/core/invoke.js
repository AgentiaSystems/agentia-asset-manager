'use strict';

var utils = require('agentia-utilities');
var Asset = require('./asset');
var errors = require('../errors');
var helpers = require('../helpers');

var invoke = function invoke(fn, override, context) {
  var asset;

  helpers.checkMinArgs(arguments, 1);

  if (!utils.isFunction(fn)) {
    throw new errors.MustBeFunction('fn');
  }

  if (!utils.isObject(context)) {
    context = null;
  }

  if (!utils.isObject(override)) {
    override = {};
  }

  asset = new Asset('__temp__', fn, {
    injectable: true,
    context: override._context
  });

  return this.resolveAsset(asset, override, context);
};

module.exports = invoke;
