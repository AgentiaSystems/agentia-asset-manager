'use strict';

var checkIf = require('./check-if');

function isResolved(id) {
  return checkIf.call(this, id, 'resolved');
}

module.exports = isResolved;
