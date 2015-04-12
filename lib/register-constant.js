'use strict';

var Asset = require('./asset');
var helpers = require('./helpers');

var registerContant = function registerContant(id, asset) {
  helpers.checkMinArgs(arguments, 2);
  helpers.checkMustBeString(id, 'id');

  this._assets[id] = new Asset(id, asset, { constant: true });
  return this;
};

module.exports = registerContant;
