'use strict';

var inherits = require('util').inherits;
var errors = module.exports = {};

var InvalidArguments = errors.InvalidArguments = function InvalidArguments() {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = 'Invalid number of arguments';
};
inherits(InvalidArguments, Error);

var MustBeString = errors.MustBeString = function MustBeString(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be a string';
};
inherits(MustBeString, Error);

var MustBeFunction = errors.MustBeFunction = function MustBeFunction(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be a function';
};
inherits(MustBeFunction, Error);

var MustBeStringOrFunction = errors.MustBeStringOrFunction = function MustBeStringOrFunction(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be a string or a function';
};
inherits(MustBeStringOrFunction, Error);

var MustBeObject = errors.MustBeObject = function MustBeObject(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be an object';
};
inherits(MustBeObject, Error);

var MustBeDirectory = errors.MustBeDirectory = function MustBeDirectory(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be a valid directory';
};
inherits(MustBeDirectory, Error);

var CircularReference = errors.CircularReference = function CircularReference(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = 'circular reference found (' + id + ')';
};
inherits(CircularReference, Error);

var AssetNotFound = errors.AssetNotFound = function AssetNotFound(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = 'asset not found (' + id + ')';
};
inherits(AssetNotFound, Error);

var MustBeAsset = errors.MustBeAsset = function MustBeAsset(id) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = '"' + id + '" must be an instance of Asset';
};
inherits(MustBeAsset, Error);
