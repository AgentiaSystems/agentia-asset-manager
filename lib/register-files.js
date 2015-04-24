'use strict';

var glob = require('glob');
var utils = require('agentia-utilities');
var helpers = require('./helpers');

var registerFiles = function registerFiles(pattern, injenctable) {

  helpers.checkMinArgs(arguments, 1);
  helpers.checkMustBeString(pattern, 'pattern');

  if (!utils.isBoolean(injenctable)) {
    injenctable = false;
  }

  glob.sync(pattern).forEach(function(filename) {
    this.registerModule(filename, injenctable);
  }.bind(this));

  return this;
};

module.exports = registerFiles;
