'use strict';

var util = require('util');
var inherits = util.inherits;
var error = require('./error');

function MustBeString(id) {
  error(this, '%s must be a string', id);
}

inherits(MustBeString, Error);

module.exports = MustBeString;
