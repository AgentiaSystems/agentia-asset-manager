'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

var compatible = module.exports = {};

compatible.get = function get(id, overrides) {
  helpers.checkMinArgs(arguments, 1);

  return this.resolve(id, overrides);
};

compatible.load = function load(id) {
  var file = fs.statSync;

  helpers.checkMinArgs(arguments, 1);
  helpers.checkMustBeString(id, 'id');

  if (file(id).isDirectory()) {
    this.registerFiles(path.join(id, '*.js'), true);
    return this;
  }

  this.registerModule(id, true);
  return this;
};
