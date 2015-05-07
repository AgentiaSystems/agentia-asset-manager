'use strict';

var checkIf = require('./check-if');

function isModule(id) {
  return checkIf.call(this, id, 'module');
}

module.exports = isModule;
