'use strict';

var util = require('util');
var inherits = util.inherits;
var error = require('./error');

function MustBeObject(id) {
  error(this, '%s must be an object', id);
}

inherits(MustBeObject, Error);

module.exports = MustBeObject;
