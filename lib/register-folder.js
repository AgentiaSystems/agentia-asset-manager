'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('agentia-utilities');
var errors = require('./errors');
var helpers = require('./helpers');

var registerFolder = function registerFolder(folderPath, injenctable) {
  var file = fs.statSync;

  helpers.checkMinArgs(arguments, 1);
  helpers.checkMustBeString(folderPath, 'folderPath');

  if (!utils.isBoolean(injenctable)) {
    injenctable = false;
  }

  if (!file(folderPath).isDirectory()) {
    throw new errors.MustBeDirectory('folderPath');
  }

  fs.readdirSync(folderPath)
    .forEach(function(moduleName) {
      if (moduleName.match(/.*\.js$/)) {
        this.registerModule(path.join(folderPath, moduleName), injenctable);
      }
    }, this);

  return this;
};

module.exports = registerFolder;
