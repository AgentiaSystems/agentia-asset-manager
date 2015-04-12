'use strict';

var EventEmitter = require('events').EventEmitter;
var utils = require('agentia-utilities');
var helpers = require('./helpers');

var validateOptions = function validateOptions(options, asset) {
  if (utils.isBoolean(options.constant)) {
    this._isConstant = options.constant;
  }

  if (utils.isBoolean(options.injectable)) {
    this._isInjectable = options.injectable;
  }

  if (utils.isBoolean(options.module)) {
    this._isModule = options.module;
    this._module = asset;
  }
};

var setIfConstant = function setIfConstant(asset) {
  this._value = asset;
  this._isResolved = true;
  return this;
};

var setIfNonInjectable = function setIfNonInjectable(asset) {
  this._value = this._isModule ? require(this._module) : asset;
  this._isFunction = utils.isFunction(this._value);
  this._isResolved = true;
  return this;
};

var setIfNonFunction = function setIfNonFunction() {
  this._value = this._factory;
  this._factory = null;
  this._isResolved = true;
  this._isConstant = true;
  this._isInjectable = false;
  return this;
};

var initAsset = function initAsset(id) {
  this.id = id;
  this._isInjectable = false;
  this._isFunction = false;
  this._isConstant = false;
  this._isModule = false;
  this._isResolved = false;

  this._factory = null;
  this._module = null;
  this._context = null;
  this._value = null;
  this._required = [];
};

var saveRequired = function saveRequirements(name) {
  this._required.push({
    name: name,
    isVisited: false
  });
};

var Asset = function Asset(id, asset, options) {

  helpers.checkMinArgs(arguments, 2);
  helpers.checkMustBeString(id, 'id');

  options = utils.isObject(options) ? options : {};

  initAsset.call(this, id);

  validateOptions.call(this, options, asset);

  if (this._isConstant) {
    return setIfConstant.call(this, asset);
  }

  if (!this._isInjectable) {
    return setIfNonInjectable.call(this, asset);
  }

  this._factory = this._isModule ? require(this._module) : asset;
  this._isFunction = utils.isFunction(this._factory);

  if (!this._isFunction) {
    return setIfNonFunction.call(this);
  }

  this._context = new EventEmitter();
  utils.getParamNames(this._factory).forEach(saveRequired, this);
  return this;
};

Asset.prototype.isInjectable = function isInjectable() {
  return this._isInjectable;
};

Asset.prototype.isConstant = function isConstant() {
  return this._isConstant;
};

Asset.prototype.isModule = function isModule() {
  return this._isModule;
};

Asset.prototype.isFunction = function isFunction() {
  return this._isFunction;
};

Asset.prototype.isResolved = function isResolved() {
  return this._isResolved;
};

Asset.prototype.getFactory = function getFactory() {
  return this._factory;
};

Asset.prototype.getValue = function getValue() {
  return this._value;
};

Asset.prototype.resolveTo = function resolveTo(value) {
  this._value = value;
  this._isResolved = true;
  return this;
};

module.exports = Asset;
