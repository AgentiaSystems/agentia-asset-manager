'use strict';

var checkMustBeString = require('./check-must-be-string');

function isRegistered(id) {
  checkMustBeString(id, 'id');
  return this.__assets.hasOwnProperty(id);
}

module.exports = isRegistered;
