'use strict';

var checkIf = require('./check-if');

function isFunction(id) {
  return checkIf.call(this, id, 'function');
}

module.exports = isFunction;
