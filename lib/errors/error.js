'use strict';

var util = require('util');
var format = util.format;

function error(err, template, id) {
  Error.call(err);
  Error.captureStackTrace(err, err.constructor);
  err.name = err.constructor.name;

  if (typeof id === 'undefined') {
    err.message = template;
  } else {
    err.message = format(template, id);
  }
}

module.exports = error;
