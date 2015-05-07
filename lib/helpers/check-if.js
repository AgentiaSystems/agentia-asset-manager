'use strict';

var checkMustBeString = require('./check-must-be-string');

function checkIf(id, check) {
  checkMustBeString(id, 'id');
  if (this.isRegistered(id)) {
    switch (check) {
      case 'instance': {
        return this.__assets[id].isInstance;
      }
      case 'module': {
        return this.__assets[id].isModule;
      }
      case 'function': {
        return this.__assets[id].isFunction;
      }
      case 'injectable': {
        return this.__assets[id].isInjectable;
      }
      case 'resolved': {
        return this.__assets[id].isResolved;
      }
    }
  }
  return false;
}

module.exports = checkIf;
