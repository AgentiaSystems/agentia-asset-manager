'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../lib/asset-manager');

describe('AssetManager()', function() {
  var modular = new AssetManager();

  it('should be a function', function() {
    expect(AssetManager).to.be.a('function');
  });

  it('should be a factory of AssetManager objects', function() {
    expect(modular).to.be.an.instanceof(AssetManager);
  });

  describe('API', function() {

    it('should expose .registerAsset()', function() {
      expect(modular).to.have.property('registerAsset').that.is.a('function');
    });

    it('should expose .registerFunction()', function() {
      expect(modular).to.have.property('registerFunction').that.is.a('function');
    });

    it('should expose .registerModule()', function() {
      expect(modular).to.have.property('registerModule').that.is.a('function');
    });

    it('should expose .registerFolder()', function() {
      expect(modular).to.have.property('registerFolder').that.is.a('function');
    });

    it('should expose .registerConstant()', function() {
      expect(modular).to.have.property('registerConstant').that.is.a('function');
    });

    it('should expose .registerHash()', function() {
      expect(modular).to.have.property('registerHash').that.is.a('function');
    });

    it('should expose .register()', function() {
      expect(modular).to.have.property('register').that.is.a('function');
    });

    it('should expose .resolve()', function() {
      expect(modular).to.have.property('resolve').that.is.a('function');
    });

    it('should expose .remove()', function() {
      expect(modular).to.have.property('remove').that.is.a('function');
    });

  });

  describe('API (helper methods)', function() {

    it('should expose .isRegistered()', function() {
      expect(modular).to.have.property('isRegistered').that.is.a('function');
    });

    it('should expose .isConstant()', function() {
      expect(modular).to.have.property('isConstant').that.is.a('function');
    });

    it('should expose .isFunction()', function() {
      expect(modular).to.have.property('isFunction').that.is.a('function');
    });

    it('should expose .isModule()', function() {
      expect(modular).to.have.property('isModule').that.is.a('function');
    });

    it('should expose .isInjectable()', function() {
      expect(modular).to.have.property('isInjectable').that.is.a('function');
    });

  });

  describe('API (for compatibility with "dependable")', function() {

    it('should expose .load()', function() {
      expect(modular).to.have.property('load').that.is.a('function');
    });

    it('should expose .get()', function() {
      expect(modular).to.have.property('get').that.is.a('function');
    });

  });

});
