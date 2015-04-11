'use strict';

var EventEmitter = require('events').EventEmitter;
var utils = require('agentia-utilities');
var errors = require('./errors');

var saveRequired = function saveRequirements(name) {
  this._required.push({
    name: name,
    isVisited: false
  });
};

var Asset = function Asset(id, asset, options) {

  if (arguments.length < 2) {
    throw new errors.InvalidArguments();
  }

  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }

  options = utils.isObject(options) ? options : {};

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

  if (utils.isBoolean(options.constant)) {
    this._isConstant = options.constant;
  }

  if (this._isConstant) {
    this._value = asset;
    this._isResolved = true;
    return this;
  }

  if (utils.isBoolean(options.injectable)) {
    this._isInjectable = options.injectable;
  }

  if (utils.isBoolean(options.module)) {
    this._isModule = options.module;
    this._module = asset;
  }

  if (!this._isInjectable) {
    this._value = this._isModule ? require(this._module) : asset;
    this._isFunction = utils.isFunction(this._value);
    this._isResolved = true;
    return this;
  }

  this._factory = this._isModule ? require(this._module) : asset;
  this._isFunction = utils.isFunction(this._factory);

  if (!this.isFunction(this._factory)) {
    this._value = this._factory;
    this._factory = null;
    this._isResolved = true;
    this._isConstant = true;
    this._isInjectable = false;
    return this;
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
