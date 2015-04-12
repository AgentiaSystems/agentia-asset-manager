'use strict';

var utils = require('agentia-utilities');
var errors = require('./errors');

var helpers = module.exports = {};

helpers.checkMustBeString = function checkMustBeString(value, name) {
  if (!utils.isString(value)) {
    throw new errors.MustBeString(name);
  }
};

helpers.isRegistered = function isRegistered(id) {
  helpers.checkMustBeString(id, 'id');
  return this._assets.hasOwnProperty(id);
};

helpers.isConstant = function isConstant(id) {
  helpers.checkMustBeString(id, 'id');
  return this.isRegistered(id) && this._assets[id].isConstant();
};

helpers.isModule = function isModule(id) {
  helpers.checkMustBeString(id, 'id');
  return this.isRegistered(id) && this._assets[id].isModule();
};

helpers.isFunction = function isFunction(id) {
  helpers.checkMustBeString(id, 'id');
  return this.isRegistered(id) && this._assets[id].isFunction();
};

helpers.isInjectable = function isInjectable(id) {
  helpers.checkMustBeString(id, 'id');
  return this.isRegistered(id) && this._assets[id].isInjectable();
};

helpers.checkMinArgs = function checkMinArgs(args, min) {
  if (args.length < min) {
    throw new errors.InvalidArguments();
  }
};
