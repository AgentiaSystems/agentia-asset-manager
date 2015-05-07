'use strict';

function attach(target) {
  this.mixin(target.prototype);
}

module.exports = attach;
