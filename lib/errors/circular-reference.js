'use strict';

var util = require('util');
var inherits = util.inherits;
var error = require('./error');

function CircularReference(id) {
  error(this, 'circular reference found (%s)', id);
}

inherits(CircularReference, Error);

module.exports = CircularReference;
