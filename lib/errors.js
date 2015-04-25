'use strict';

var util = require('util');
var inherits = util.inherits;
var format = util.format;
var errors = module.exports = {};

var error = function error(err, template, id) {
  Error.call(err);
  Error.captureStackTrace(err, err.constructor);
  err.name = err.constructor.name;

  if (typeof id === 'undefined') {
    err.message = template;
  } else {
    err.message = format(template, id);
  }
};

errors.InvalidArguments = function InvalidArguments() {
  error(this, 'Invalid number of arguments');
};
inherits(errors.InvalidArguments, Error);

errors.MustBeString = function MustBeString(id) {
  error(this, '%s must be a string', id);
};
inherits(errors.MustBeString, Error);

errors.MustBeFunction = function MustBeFunction(id) {
  error(this, '%s must be a function', id);
};
inherits(errors.MustBeFunction, Error);

errors.MustBeStringOrFunction = function MustBeStringOrFunction(id) {
  error(this, '%s must be a string or a function', id);
};
inherits(errors.MustBeStringOrFunction, Error);

errors.MustBeObject = function MustBeObject(id) {
  error(this, '%s must be an object', id);
};
inherits(errors.MustBeObject, Error);

errors.MustBeDirectory = function MustBeDirectory(id) {
  error(this, '%s must be a valid directory', id);
};
inherits(errors.MustBeDirectory, Error);

errors.CircularReference = function CircularReference(id) {
  error(this, 'circular reference found (%s)', id);
};
inherits(errors.CircularReference, Error);

errors.AssetNotFound = function AssetNotFound(id) {
  error(this, 'asset not found (%s)', id);
};
inherits(errors.AssetNotFound, Error);

errors.AssetUndefined = function AssetUndefined(id) {
  error(this, '%s must be an asset id or instance', id);
};
inherits(errors.AssetUndefined, Error);

errors.MustBeAsset = function MustBeAsset(id) {
  error(this, '%s must be an instance of Asset', id);
};
inherits(errors.MustBeAsset, Error);
