'use strict';

var merge = require('merge-descriptors');
var utils = require('agentia-utilities');

var helpers = require('../helpers');
var errors = require('../errors');

var coreMixin = require('../core');
var helpersMixin = require('../helpers/mixin');
var compatibleMixin = require('../compatible');
var init = require('./init');

function mixin(instance, compatibility) {
  helpers.checkMinArgs(arguments, 1);

  if (!utils.isObject(instance)) {
    throw new errors.MustBeObject('instance');
  }

  compatibility = utils.isBoolean(compatibility) ? compatibility : false;
  merge(instance, coreMixin);
  merge(instance, helpersMixin);
  init.call(instance);
  if (compatibility) {
    merge(instance, compatibleMixin);
  }
}

module.exports = mixin;
