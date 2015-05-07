'use strict';

var errors = require('../errors');

function checkMinArgs(args, min) {
  if (args.length < min) {
    throw new errors.InvalidArguments();
  }
}

module.exports = checkMinArgs;
