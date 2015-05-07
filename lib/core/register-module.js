'use strict';

var path = require('path');
var utils = require('agentia-utilities');
var changeCase = require('agentia-change-case');
var Asset = require('./asset');
var helpers = require('../helpers');

var registerModule = function registerModule(id, modulePath, injectable) {
  helpers.checkMinArgs(arguments, 1);
  helpers.checkMustBeString(id, 'id');

  if (arguments.length === 1) {
    modulePath = id;
    id = changeCase.camel(path.basename(modulePath, '.js'));
  }

  if (arguments.length === 2 && utils.isBoolean(modulePath)) {
    injectable = modulePath;
    modulePath = id;
    id = changeCase.camel(path.basename(modulePath, '.js'));
  }

  helpers.checkMustBeString(modulePath, 'modulePath');

  if (!utils.isBoolean(injectable)) {
    injectable = false;
  }

  this.registerAsset(new Asset(id, modulePath, {
    module: true,
    injectable: injectable
  }));

  return this;
};

module.exports = registerModule;
