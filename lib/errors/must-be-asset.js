'use strict';

var util = require('util');
var inherits = util.inherits;
var error = require('./error');

function MustBeAsset(id) {
  error(this, '%s must be an instance of Asset', id);
}

inherits(MustBeAsset, Error);

module.exports = MustBeAsset;
