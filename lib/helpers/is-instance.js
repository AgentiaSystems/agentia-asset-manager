'use strict';

var checkIf = require('./check-if');

function isInstance(id) {
  return checkIf.call(this, id, 'instance');
}

module.exports = isInstance;
