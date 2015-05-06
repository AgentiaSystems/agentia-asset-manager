'use strict';

var util = require('util');
var inherits = util.inherits;
var error = require('./error');

function MustBeStringOrFunction(id) {
  error(this, '%s must be a string or a function', id);
}

inherits(MustBeStringOrFunction, Error);

module.exports = MustBeStringOrFunction;
