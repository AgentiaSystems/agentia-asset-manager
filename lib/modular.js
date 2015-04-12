'use strict';

var Modular = function Modular() {
  this._assets = {};

  return this;
};

// core methods
Modular.prototype.registerAsset = require('./register-asset');
Modular.prototype.registerFunction = require('./register-function');
Modular.prototype.registerModule = require('./register-module');
Modular.prototype.registerFolder = require('./register-folder');
Modular.prototype.registerConstant = require('./register-constant');
Modular.prototype.registerHash = require('./register-hash');
Modular.prototype.register = require('./register');
Modular.prototype.resolve = require('./resolve');
Modular.prototype.remove = require('./remove');

// helper methods
Modular.prototype.isRegistered = require('./helpers').isRegistered;
Modular.prototype.isConstant = require('./helpers').isConstant;
Modular.prototype.isFunction = require('./helpers').isFunction;
Modular.prototype.isModule = require('./helpers').isModule;
Modular.prototype.isInjectable = require('./helpers').isInjectable;

// convenience methods mimicking `dependable` behavior
Modular.prototype.load = require('./compatible').load;
Modular.prototype.get = require('./compatible').get;

module.exports = Modular;
