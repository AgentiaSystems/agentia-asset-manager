'use strict';

var helpers = require('./helpers');

var registerAsset = function registerAsset(asset) {
  helpers.checkMinArgs(arguments, 1);
  helpers.checkMustBeAsset(asset, 'asset');

  if (this.isRegistered(asset.id)) {
    this.remove(asset.id);
  }

  this._assets[asset.id] = asset;

  return this;
};

module.exports = registerAsset;
