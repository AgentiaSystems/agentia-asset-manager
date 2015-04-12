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
  if (this.isRegistered(id)) {
    return this._assets[id].isConstant();
  }
  return false;
};

helpers.isModule = function isModule(id) {
  helpers.checkMustBeString(id, 'id');
  if (this.isRegistered(id)) {
    return this._assets[id].isModule();
  }
  return false;
};

helpers.isFunction = function isFunction(id) {
  helpers.checkMustBeString(id, 'id');
  if (this.isRegistered(id)) {
    return this._assets[id].isFunction();
  }
  return false;
};

helpers.isInjectable = function isInjectable(id) {
  helpers.checkMustBeString(id, 'id');
  if (this.isRegistered(id)) {
    return this._assets[id].isInjectable();
  }
  return false;
};

helpers.checkMinArgs = function checkMinArgs(args, min) {
  if (args.length < min) {
    throw new errors.InvalidArguments();
  }
};
