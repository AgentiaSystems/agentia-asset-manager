'use strict';

var debug = require('debug')('modular:resolve');

var utils = require('agentia-utilities');
var Asset = require('./asset');
var errors = require('./errors');
var helpers = require('./helpers');

var resolveDependency = function(asset, override) {
  var requirements;

  debug('attempting to resolve asset: "%s"', asset.name);

  requirements = asset._required.map(function(requirement) {
    debug('asset "%s" requires: "%s"', asset.name, requirement.name);

    if (utils.exists(override[requirement.name])) {
      debug('requirement "%s" was overridden', requirement.name);
      return override[requirement.name];
    }

    if (requirement.isVisited) {
      throw new errors.CircularReference(requirement.name);
    }

    debug('attempting to resolve requirement: "%s"', requirement.name);
    requirement.isVisited = true;
    requirement.value = this.resolve(requirement.name);

    debug('resolved requirement: "%s"', requirement.name);
    return requirement.value;
  }, this);

  asset.resolveTo(asset.getFactory().apply(asset._context, requirements));
  debug('resolved asset: "%s"', asset.name);
  return asset.getValue();
};

var resolve = function resolve(target, override) {
  var asset;

  helpers.checkMinArgs(arguments, 1);

  if (!utils.isString(target) && !utils.isFunction(target)) {
    throw new errors.MustBeStringOrFunction(target);
  }

  if (!utils.isObject(override)) {
    override = {};
  }

  if (utils.isString(target)) {
    if (!this._assets[target]) {
      throw new errors.AssetNotFound(target);
    }

    if (utils.exists(override[target])) {
      debug('asset "%s" was overridden', target);
      return override[target];
    }

    asset = this._assets[target];

  } else {
    asset = new Asset('__temp__', target, { injectable: true });
  }

  if (asset.isResolved()) {
    debug('asset "%s" is already resolved', asset.name);
    return asset.getValue();
  }

  return resolveDependency.call(this, asset, override);
};

module.exports = resolve;
