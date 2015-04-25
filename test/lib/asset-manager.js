'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../lib/asset-manager');

describe('AssetManager()', function() {
  before(function() {
    this.am = new AssetManager();
  });

  it('should be a function', function() {
    expect(AssetManager).to.be.a('function');
  });

  it('should be a factory of AssetManager objects', function() {
    expect(this.am).to.be.an.instanceof(AssetManager);
  });

  describe('API', function() {

    it('should expose .registerAsset()', function() {
      expect(this.am).to.have.property('registerAsset').that.is.a('function');
    });

    it('should expose .registerFunction()', function() {
      expect(this.am).to.have.property('registerFunction').that.is.a('function');
    });

    it('should expose .registerModule()', function() {
      expect(this.am).to.have.property('registerModule').that.is.a('function');
    });

    it('should expose .registerFolder()', function() {
      expect(this.am).to.have.property('registerFiles').that.is.a('function');
    });

    it('should expose .registerInstance()', function() {
      expect(this.am).to.have.property('registerInstance').that.is.a('function');
    });

    it('should expose .registerHash()', function() {
      expect(this.am).to.have.property('registerHash').that.is.a('function');
    });

    it('should expose .register()', function() {
      expect(this.am).to.have.property('register').that.is.a('function');
    });

    it('should expose .resolve()', function() {
      expect(this.am).to.have.property('resolve').that.is.a('function');
    });

    it('should expose .remove()', function() {
      expect(this.am).to.have.property('remove').that.is.a('function');
    });

  });

  describe('API (helper methods)', function() {

    it('should expose .isRegistered()', function() {
      expect(this.am).to.have.property('isRegistered').that.is.a('function');
    });

    it('should expose .isInstance()', function() {
      expect(this.am).to.have.property('isInstance').that.is.a('function');
    });

    it('should expose .isFunction()', function() {
      expect(this.am).to.have.property('isFunction').that.is.a('function');
    });

    it('should expose .isModule()', function() {
      expect(this.am).to.have.property('isModule').that.is.a('function');
    });

    it('should expose .isInjectable()', function() {
      expect(this.am).to.have.property('isInjectable').that.is.a('function');
    });

  });

  describe('API (for compatibility with "dependable")', function() {

    it('should expose .load()', function() {
      expect(this.am).to.have.property('load').that.is.a('function');
    });

    it('should expose .get()', function() {
      expect(this.am).to.have.property('get').that.is.a('function');
    });

  });

});
