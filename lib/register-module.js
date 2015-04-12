'use strict';

var path = require('path');
var utils = require('agentia-utilities');
var changeCase = require('agentia-change-case');
var Asset = require('./asset');
var errors = require('./errors');
var helpers = require('./helpers');

var registerModule = function registerModule(id, modulePath, injectable) {
  var asset;

  helpers.checkMinArgs(arguments, 1);

  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }

  if (arguments.length === 1) {
    modulePath = id;
    id = changeCase.camel(path.basename(modulePath, '.js'));
  }

  if (arguments.length === 2 && utils.isBoolean(modulePath)) {
    injectable = modulePath;
    modulePath = id;
    id = changeCase.camel(path.basename(modulePath, '.js'));
  }

  if (!utils.isString(modulePath)) {
    throw new errors.MustBeString('modulePath');
  }

  if (!utils.isBoolean(injectable)) {
    injectable = false;
  }

  asset = new Asset(id, modulePath, {
    module: true,
    injectable: injectable
  });

  this._assets[id] = asset;

  return this;
};

module.exports = registerModule;
