'use strict';

var mixin = require('./static/mixin');

exports = module.exports = function AssetManager() {
  mixin.call(this, this, true);
  return this;
};

// utility methods
exports.create = require('./static/create');
exports.mixin = require('./static/mixin');
exports.attach = require('./static/attach');
