'use strict';

var utils = require('agentia-utilities');
var errors = require('./errors');

var helpers = module.exports = {};

var mustBeString = function mustBeString(id) {
  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }
};

helpers.isRegistered = function isRegistered(id) {
  mustBeString(id);
  return this._assets.hasOwnProperty(id);
};

helpers.isConstant = function isConstant(id) {
  mustBeString(id);
  return this.isRegistered(id) && this._assets[id].isConstant();
};

helpers.isModule = function isModule(id) {
  mustBeString(id);
  return this.isRegistered(id) && this._assets[id].isModule();
};

helpers.isFunction = function isFunction(id) {
  mustBeString(id);
  return this.isRegistered(id) && this._assets[id].isFunction();
};

helpers.isInjectable = function isInjectable(id) {
  mustBeString(id);
  return this.isRegistered(id) && this._assets[id].isInjectable();
};

helpers.checkMinArgs = function checkMinArgs(args, min) {
  if (args.length < min) {
    throw new errors.InvalidArguments();
  }
};
