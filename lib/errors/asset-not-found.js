'use strict';

var util = require('util');
var inherits = util.inherits;
var error = require('./error');

function AssetNotFound(id) {
  error(this, 'asset not found (%s)', id);
}

inherits(AssetNotFound, Error);

module.exports = AssetNotFound;
