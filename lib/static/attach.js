'use strict';

var utils = require('agentia-utilities');
var errors = require('../errors');
var helpers = require('../helpers');

function attach(target) {
  helpers.checkMinArgs(arguments, 1);

  if (!utils.isObject(target)) {
    throw new errors.MustBeObject('target');
  }

  this.mixin(target.prototype);

  return target;
}

module.exports = attach;
