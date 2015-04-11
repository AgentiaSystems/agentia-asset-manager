'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('agentia-utilities');
var errors = require('./errors');

var registerFolder = function registerFolder(folderPath, injenctable) {
  var file = fs.statSync;

  if (arguments.length < 1) {
    throw new errors.InvalidArguments();
  }

  if (!utils.isString(folderPath)) {
    throw new errors.MustBeString('folderPath');
  }

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
