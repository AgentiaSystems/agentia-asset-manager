'use strict';

var utils = require('agentia-utilities');
var errors = require('../errors');

function checkMustBeString(value, name) {
  if (!utils.isString(value)) {
    throw new errors.MustBeString(name);
  }
}

module.exports = checkMustBeString;
