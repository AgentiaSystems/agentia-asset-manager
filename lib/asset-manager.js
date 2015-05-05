'use strict';

var AssetManager = function AssetManager() {
  this.__assets = {};

  return this;
};

// core methods
AssetManager.prototype.registerAsset = require('./register-asset');
AssetManager.prototype.registerFunction = require('./register-function');
AssetManager.prototype.registerModule = require('./register-module');
AssetManager.prototype.registerFiles = require('./register-files');
AssetManager.prototype.registerInstance = require('./register-instance');
AssetManager.prototype.registerHash = require('./register-hash');
AssetManager.prototype.register = require('./register');

AssetManager.prototype.resolve = require('./resolve');
AssetManager.prototype.resolveAsset = require('./resolve-asset');
AssetManager.prototype.invoke = require('./invoke');

AssetManager.prototype.remove = require('./remove');

// helper methods
AssetManager.prototype.isRegistered = require('./helpers').isRegistered;
AssetManager.prototype.isInstance = require('./helpers').isInstance;
AssetManager.prototype.isFunction = require('./helpers').isFunction;
AssetManager.prototype.isModule = require('./helpers').isModule;
AssetManager.prototype.isInjectable = require('./helpers').isInjectable;
AssetManager.prototype.isResolved = require('./helpers').isResolved;

// convenience methods mimicking `dependable` behavior
AssetManager.prototype.load = require('./compatible').load;
AssetManager.prototype.get = require('./compatible').get;

module.exports = AssetManager;
