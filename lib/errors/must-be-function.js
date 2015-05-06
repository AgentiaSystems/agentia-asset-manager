'use strict';

var util = require('util');
var inherits = util.inherits;
var error = require('./error');

function MustBeFunction(id) {
  error(this, '%s must be a function', id);
}

inherits(MustBeFunction, Error);

module.exports = MustBeFunction;
