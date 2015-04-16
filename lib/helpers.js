'use strict';

var utils = require('agentia-utilities');
var errors = require('./errors');

var helpers = module.exports = {};

// General use helpers
helpers.checkMustBeString = function checkMustBeString(value, name) {
  if (!utils.isString(value)) {
    throw new errors.MustBeString(name);
  }
};

helpers.checkMinArgs = function checkMinArgs(args, min) {
  if (args.length < min) {
    throw new errors.InvalidArguments();
  }
};

helpers.checkMustBeAsset = function checkMustBeAsset(value, name) {
  var Asset = require('./asset');
  if (!(value instanceof Asset)) {
    throw new errors.MustBeAsset(name);
  }
};

// AssetManager Class helpers
helpers.isRegistered = function isRegistered(id) {
  helpers.checkMustBeString(id, 'id');
  return this._assets.hasOwnProperty(id);
};

var checkIf = function checkIf(id, check) {
  helpers.checkMustBeString(id, 'id');
  if (this.isRegistered(id)) {
    switch (check) {
      case 'constant': {
        return this._assets[id].isConstant;
      }
      case 'module': {
        return this._assets[id].isModule;
      }
      case 'function': {
        return this._assets[id].isFunction;
      }
      case 'injectable': {
        return this._assets[id].isInjectable;
      }
    }
  }
  return false;
};

helpers.isConstant = function isConstant(id) {
  return checkIf.call(this, id, 'constant');
};

helpers.isModule = function isModule(id) {
  return checkIf.call(this, id, 'module');
};

helpers.isFunction = function isFunction(id) {
  return checkIf.call(this, id, 'function');
};

helpers.isInjectable = function isInjectable(id) {
  return checkIf.call(this, id, 'injectable');
};
