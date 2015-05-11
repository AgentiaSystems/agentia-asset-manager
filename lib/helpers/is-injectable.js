'use strict';

var checkIf = require('./check-if');

function isInjectable(id) {
  return checkIf.call(this, id, 'injectable');
}

module.exports = isInjectable;
