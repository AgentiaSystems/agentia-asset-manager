'use strict';

var inherits = require('util').inherits;
var errors = module.exports = {};

errors.InvalidArguments = function InvalidArguments() {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = 'Invalid number of arguments';
};
inherits(errors.InvalidArguments, Error);

errors.MustBeString = function MustBeString(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be a string';
};
inherits(errors.MustBeString, Error);

errors.MustBeFunction = function MustBeFunction(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be a function';
};
inherits(errors.MustBeFunction, Error);

errors.MustBeStringOrFunction = function MustBeStringOrFunction(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be a string or a function';
};
inherits(errors.MustBeStringOrFunction, Error);

errors.MustBeObject = function MustBeObject(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be an object';
};
inherits(errors.MustBeObject, Error);

errors.MustBeDirectory = function MustBeDirectory(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be a valid directory';
};
inherits(errors.MustBeDirectory, Error);

errors.CircularReference = function CircularReference(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = 'circular reference found (' + id + ')';
};
inherits(errors.CircularReference, Error);

errors.AssetNotFound = function AssetNotFound(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = 'asset not found (' + id + ')';
};
inherits(errors.AssetNotFound, Error);

errors.AssetUndefined = function AssetUndefined(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be an asset id or instance';
};
inherits(errors.AssetUndefined, Error);

errors.MustBeAsset = function MustBeAsset(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be an instance of Asset';
};
inherits(errors.MustBeAsset, Error);
