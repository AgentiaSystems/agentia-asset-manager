'use strict';

function create(compatible) {
  return this.mixin({}, compatible);
}

module.exports = create;
