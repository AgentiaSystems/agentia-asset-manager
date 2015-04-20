'use strict';

var debug = require('debug')('asset-manager:resolve');

var utils = require('agentia-utilities');
var Asset = require('./asset');
var errors = require('./errors');
var helpers = require('./helpers');

var resolveAssetRequirements = function(asset, override, context) {
  var requirements;

  debug('attempting to resolve asset: "%s"', asset.id);

  requirements = asset._required.map(function(requirement) {
    debug('asset "%s" requires: "%s"', asset.id, requirement.id);

    if (utils.exists(override[requirement.id])) {
      debug('requirement "%s" was overridden', requirement.id);
      return override[requirement.id];
    }

    if (requirement.isVisited) {
      throw new errors.CircularReference(requirement.id);
    }

    debug('attempting to resolve requirement: "%s"', requirement.id);
    requirement.isVisited = true;
    requirement.value = this.resolve(requirement.id);

    debug('resolved requirement: "%s"', requirement.id);
    return requirement.value;
  }, this);

  asset.resolveTo(asset.factory.apply(context, requirements));
  debug('resolved asset: "%s"', asset.id);
  return asset.value;
};

var resolveAsset = function resolveAsset(target, override, context) {
  var id;
  var asset;

  helpers.checkMinArgs(arguments, 1);

  if (!utils.isObject(override)) {
    override = {};
  }

  if (utils.isString(target)) {
    id = target;
    if (!this._assets[id]) {
      throw new errors.AssetNotFound(id);
    }

    if (utils.exists(override[target])) {
      debug('asset "%s" was overridden', target);
      return override[target];
    }

    asset = this._assets[target];
  }

  if (target instanceof Asset) {
    asset = target;
  }

  if (utils.isUndefined(asset)) {
    throw new errors.AssetUndefined('target');
  }

  if (asset.isResolved) {
    debug('asset "%s" is already resolved', asset.id);
    return asset.value;
  }

  return resolveAssetRequirements.call(this, asset, override, context);
};

module.exports = resolveAsset;
