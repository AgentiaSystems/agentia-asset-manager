'use strict';

var deprecate = require('depd')('AssetManager');

var mixin = require('./static/mixin');

exports = module.exports = deprecate.function(function AssetManager() {
  mixin.call(this, this, true);
  return this;
}, 'AssetManager() constructor');

// utility methods
exports.create = require('./static/create');
exports.mixin = require('./static/mixin');
exports.attach = require('./static/attach');
