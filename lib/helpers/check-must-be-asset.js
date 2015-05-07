'use strict';

var errors = require('../errors');
var Asset = require('../core/asset');

function checkMustBeAsset(value, name) {
  if (!(value instanceof Asset)) {
    throw new errors.MustBeAsset(name);
  }
}

module.exports = checkMustBeAsset;
