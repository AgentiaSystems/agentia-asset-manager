'use strict';

var util = require('util');
var inherits = util.inherits;
var error = require('./error');

function AssetUndefined(id) {
  error(this, '%s must be an asset id or instance', id);
}

inherits(AssetUndefined, Error);

module.exports = AssetUndefined;
