'use strict';

var Asset = require('./asset');
var helpers = require('../helpers');

var registerInstance = function registerInstance(id, asset) {
  helpers.checkMinArgs(arguments, 2);
  helpers.checkMustBeString(id, 'id');

  this.registerAsset(new Asset(id, asset, { constant: true }));

  return this;
};

module.exports = registerInstance;
