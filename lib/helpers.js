'use strict';

var utils = require('agentia-utilities');
var errors = require('./errors');

var helpers = module.exports = {};

helpers.isRegistered = function isRegistered(id) {
  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }
  return this._assets.hasOwnProperty(id);
};

helpers.isConstant = function isConstant(id) {
  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }
  return this.isRegistered(id) && this._assets[id].isConstant();
};

helpers.isModule = function isModule(id) {
  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }
  return this.isRegistered(id) && this._assets[id].isModule();
};

helpers.isFunction = function isFunction(id) {
  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }
  return this.isRegistered(id) && this._assets[id].isFunction();
};

helpers.isInjectable = function isInjectable(id) {
  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }
  return this.isRegistered(id) && this._assets[id].isInjectable();
};
