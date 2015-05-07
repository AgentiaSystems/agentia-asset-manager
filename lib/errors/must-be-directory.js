'use strict';

var util = require('util');
var inherits = util.inherits;
var error = require('./error');

function MustBeDirectory(id) {
  error(this, '%s must be a valid directory', id);
}

inherits(MustBeDirectory, Error);

module.exports = MustBeDirectory;
