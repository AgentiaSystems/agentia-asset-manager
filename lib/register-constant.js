'use strict';

var utils = require('agentia-utilities');
var Asset = require('./asset');
var errors = require('./errors');
var helpers = require('./helpers');

var registerContant = function registerContant(id, asset) {
  helpers.checkMinArgs(arguments, 2);

  if (!utils.isString(id)) {
    throw new errors.MustBeString('id');
  }

  this._assets[id] = new Asset(id, asset, { constant: true });
  return this;
};

module.exports = registerContant;
