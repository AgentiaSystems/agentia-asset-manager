'use strict';

var merge = require('merge-descriptors');
var utils = require('agentia-utilities');

var core = require('../core');
var helpers = require('../helpers/mixin');
var compatible = require('../compatible');
var init = require('./init');

function mixin(instance, compatibility) {
  compatibility = utils.isBoolean(compatibility) ? compatibility : false;
  merge(instance, core);
  merge(instance, helpers);
  init.call(instance);
  if (compatibility) {
    merge(instance, compatible);
  }
}

module.exports = mixin;
