'use strict';

var utils = require('agentia-utilities');
var helpers = require('./helpers');

var validateOptions = function validateOptions(options, asset) {
  if (utils.isBoolean(options.constant)) {
    this._isInstance = options.constant;
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
  this._isInstance = true;
  this._isInjectable = false;
  return this;
};

var initAsset = function initAsset(id) {
  this.id = id;
  this._isInjectable = false;
  this._isFunction = false;
  this._isInstance = false;
  this._isModule = false;
  this._isResolved = false;

  this._factory = null;
  this._module = null;
  this._context = null;
  this._value = null;
  this._required = [];
};

var saveRequired = function saveRequirements(id) {
  this._required.push({
    id: id,
    isVisited: false
  });
};

var Asset = function Asset(id, asset, options) {

  helpers.checkMinArgs(arguments, 2);
  helpers.checkMustBeString(id, 'id');

  options = utils.isObject(options) ? options : {};

  initAsset.call(this, id);

  validateOptions.call(this, options, asset);

  if (this._isInstance) {
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

  this._context = options.context;
  utils.getParamNames(this._factory).forEach(saveRequired, this);
  return this;
};

Object.defineProperty(Asset.prototype, 'isInjectable', {
  get: function() {
    return this._isInjectable;
  }
});

Object.defineProperty(Asset.prototype, 'isInstance', {
  get: function() {
    return this._isInstance;
  }
});

Object.defineProperty(Asset.prototype, 'isModule', {
  get: function() {
    return this._isModule;
  }
});

Object.defineProperty(Asset.prototype, 'isFunction', {
  get: function() {
    return this._isFunction;
  }
});

Object.defineProperty(Asset.prototype, 'isResolved', {
  get: function() {
    return this._isResolved;
  }
});

Object.defineProperty(Asset.prototype, 'factory', {
  get: function() {
    return this._factory;
  }
});

Object.defineProperty(Asset.prototype, 'value', {
  get: function() {
    return this._value;
  }
});

Asset.prototype.resolveTo = function resolveTo(value) {
  this._value = value;
  this._isResolved = true;
  return this;
};

module.exports = Asset;
