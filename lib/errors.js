'use strict';

var errors = exports = module.exports = {};

var InvalidArguments = errors.InvalidArguments = function InvalidArguments() {
  this.name = 'InvalidArguments';
  this.message = 'Invalid number of arguments';
};
InvalidArguments.prototype = Object.create(Error.prototype);
InvalidArguments.prototype.constructor = InvalidArguments;

var MustBeString = errors.MustBeString = function MustBeString(id) {
  this.name = 'MustBeString';
  this.message = '"' + id + '" must be a string';
};
MustBeString.prototype = Object.create(Error.prototype);
MustBeString.prototype.constructor = MustBeString;

var MustBeFunction = errors.MustBeFunction = function MustBeFunction(id) {
  this.name = 'MustBeFunction';
  this.message = '"' + id + '" must be a function';
};
MustBeFunction.prototype = Object.create(Error.prototype);
MustBeFunction.prototype.constructor = MustBeFunction;

var MustBeStringOrFunction = errors.MustBeStringOrFunction = function MustBeStringOrFunction(id) {
  this.name = 'MustBeStringOrFunction';
  this.message = '"' + id + '" must be a string or a function';
};
MustBeStringOrFunction.prototype = Object.create(Error.prototype);
MustBeStringOrFunction.prototype.constructor = MustBeStringOrFunction;

var MustBeObject = errors.MustBeObject = function MustBeObject(id) {
  this.name = 'MustBeObject';
  this.message = '"' + id + '" must be an object';
};
MustBeObject.prototype = Object.create(Error.prototype);
MustBeObject.prototype.constructor = MustBeObject;

var MustBeDirectory = errors.MustBeDirectory = function MustBeDirectory(id) {
  this.name = 'MustBeDirectory';
  this.message = '"' + id + '" must be a valid directory';
};
MustBeDirectory.prototype = Object.create(Error.prototype);
MustBeDirectory.prototype.constructor = MustBeDirectory;

var CircularReference = errors.CircularReference = function CircularReference(id) {
  this.name = 'CircularReference';
  this.message = 'circular reference found (' + id + ')';
};
CircularReference.prototype = Object.create(Error.prototype);
CircularReference.prototype.constructor = CircularReference;

var AssetNotFound = errors.AssetNotFound = function AssetNotFound(id) {
  this.name = 'AssetNotFound';
  this.message = 'asset not found (' + id + ')';
};
AssetNotFound.prototype = Object.create(Error.prototype);
AssetNotFound.prototype.constructor = AssetNotFound;
