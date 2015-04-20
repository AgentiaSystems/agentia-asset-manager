'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../');
var Asset = require('../../lib/asset');
var errors = require('../../lib/errors');

describe('AssetManager.registerAsset()', function() {

  before(function() {
    this.am = new AssetManager();
  });

  after(function() {
    this.am = null;
  });

  it('should register a new asset', function () {
    this.am.registerAsset(new Asset('id', 'value', { constant: true }));
    expect(this.am.resolve('id')).to.equal('value');
  });

  it('should register replace an existing asset', function () {
    this.am.registerAsset(new Asset('id', 'value1', { constant: true }));
    this.am.registerAsset(new Asset('id', 'value2', { constant: true }));
    expect(this.am.resolve('id')).to.equal('value2');
  });

  it('should throw an error, when called one argument', function() {
    expect(function() {
      this.am.registerAsset();
    }.bind(this)).to.throw(errors.InvalidArguments);
  });

  it('should throw an error, when id argument not a string', function() {
    expect(function() {
      this.am.registerAsset('invalid');
    }.bind(this)).to.throw(errors.MustBeAsset);
  });

});
