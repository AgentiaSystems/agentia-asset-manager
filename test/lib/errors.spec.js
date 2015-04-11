'use strict';

var chai = require('chai');
var expect = chai.expect;

var errors = require('../../lib/errors');

describe('Errors', function() {

  it('should expose an InvalidArguments error', function() {
    expect(new errors.InvalidArguments()).to.be.an.instanceOf(Error);
  });

  it('should expose a MustBeString error', function() {
    expect(new errors.MustBeString()).to.be.an.instanceOf(Error);
  });

  it('should expose a MustBeFunction error', function() {
    expect(new errors.MustBeFunction()).to.be.an.instanceOf(Error);
  });

  it('should expose a MustBeStringOrFunction error', function() {
    expect(new errors.MustBeStringOrFunction()).to.be.an.instanceOf(Error);
  });

  it('should expose a MustBeObject error', function() {
    expect(new errors.MustBeObject()).to.be.an.instanceOf(Error);
  });

  it('should expose a MustBeDirectory error', function() {
    expect(new errors.MustBeDirectory()).to.be.an.instanceOf(Error);
  });

  it('should expose a CircularReference error', function() {
    expect(new errors.CircularReference()).to.be.an.instanceOf(Error);
  });

  it('should expose an AssetNotFound error', function() {
    expect(new errors.AssetNotFound()).to.be.an.instanceOf(Error);
  });

});
