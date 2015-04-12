'use strict';

var chai = require('chai');
var expect = chai.expect;

var Modular = require('../../');
var Asset = require('../../lib/asset');
var errors = require('../../lib/errors');

describe('Modular.registerAsset()', function() {
  var modular;

  before(function() {
    modular = new Modular();
  });

  after(function() {
    modular = null;
  });

  it('should register a new asset', function () {
    modular.registerAsset(new Asset('id', 'value', { constant: true }));
    expect(modular.resolve('id')).to.equal('value');
  });

  it('should register replace an existing asset', function () {
    modular.registerAsset(new Asset('id', 'value1', { constant: true }));
    modular.registerAsset(new Asset('id', 'value2', { constant: true }));
    expect(modular.resolve('id')).to.equal('value2');
  });

  it('should throw an error, when called one argument', function() {
    expect(function() {
      modular.registerAsset();
    }).to.throw(errors.InvalidArguments);
  });

  it('should throw an error, when id argument not a string', function() {
    expect(function() {
      modular.registerAsset('invalid');
    }).to.throw(errors.MustBeAsset);
  });

});
