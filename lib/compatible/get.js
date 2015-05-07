'use strict';

var helpers = require('../helpers');

function get(id, overrides) {
  helpers.checkMinArgs(arguments, 1);
  return this.resolve(id, overrides);
}

module.exports = get;
