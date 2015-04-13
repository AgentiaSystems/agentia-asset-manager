'use strict';

var AssetManager = function AssetManager() {
  this._assets = {};

  return this;
};

// core methods
AssetManager.prototype.registerAsset = require('./register-asset');
AssetManager.prototype.registerFunction = require('./register-function');
AssetManager.prototype.registerModule = require('./register-module');
AssetManager.prototype.registerFolder = require('./register-folder');
AssetManager.prototype.registerConstant = require('./register-constant');
AssetManager.prototype.registerHash = require('./register-hash');
AssetManager.prototype.register = require('./register');
AssetManager.prototype.resolve = require('./resolve');
AssetManager.prototype.remove = require('./remove');

// helper methods
AssetManager.prototype.isRegistered = require('./helpers').isRegistered;
AssetManager.prototype.isConstant = require('./helpers').isConstant;
AssetManager.prototype.isFunction = require('./helpers').isFunction;
AssetManager.prototype.isModule = require('./helpers').isModule;
AssetManager.prototype.isInjectable = require('./helpers').isInjectable;

// convenience methods mimicking `dependable` behavior
AssetManager.prototype.load = require('./compatible').load;
AssetManager.prototype.get = require('./compatible').get;

module.exports = AssetManager;
