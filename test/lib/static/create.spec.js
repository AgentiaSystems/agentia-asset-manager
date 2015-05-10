'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../../');

describe('AssetManager.create()', function() {

  describe('with no compatibility argument', function() {

    before(function() {
      this.obj = AssetManager.create();
    });

    it('should return an object', function() {
      expect(this.obj).to.be.an('object');
    });

    it('should return object with AssetManager properties', function () {
      expect(this.obj).to.have.property('__assets').that.is.a('object');
    });

    it('should return object with AssetManager core methods', function () {
      expect(this.obj).to.have.property('registerAsset').that.is.a('function');
      expect(this.obj).to.have.property('registerFunction').that.is.a('function');
      expect(this.obj).to.have.property('registerModule').that.is.a('function');
      expect(this.obj).to.have.property('registerFiles').that.is.a('function');
      expect(this.obj).to.have.property('registerInstance').that.is.a('function');
      expect(this.obj).to.have.property('registerHash').that.is.a('function');
      expect(this.obj).to.have.property('register').that.is.a('function');
      expect(this.obj).to.have.property('resolve').that.is.a('function');
      expect(this.obj).to.have.property('resolveAsset').that.is.a('function');
      expect(this.obj).to.have.property('invoke').that.is.a('function');
      expect(this.obj).to.have.property('remove').that.is.a('function');
    });

    it('should return object with AssetManager helper methods', function() {
      expect(this.obj).to.have.property('isFunction').that.is.a('function');
      expect(this.obj).to.have.property('isInjectable').that.is.a('function');
      expect(this.obj).to.have.property('isInstance').that.is.a('function');
      expect(this.obj).to.have.property('isModule').that.is.a('function');
      expect(this.obj).to.have.property('isRegistered').that.is.a('function');
      expect(this.obj).to.have.property('isResolved').that.is.a('function');
    });

    it('should return object without AssetManager compatibility methods', function() {
      expect(this.obj).to.not.have.property('get');
      expect(this.obj).to.not.have.property('load');
    });

  });

  describe('with compatibility set to false', function() {

    before(function() {
      this.obj = AssetManager.create(false);
    });

    it('should return an object', function() {
      expect(this.obj).to.be.an('object');
    });

    it('should return object with AssetManager properties', function () {
      expect(this.obj).to.have.property('__assets').that.is.a('object');
    });

    it('should return object with AssetManager core methods', function () {
      expect(this.obj).to.have.property('registerAsset').that.is.a('function');
      expect(this.obj).to.have.property('registerFunction').that.is.a('function');
      expect(this.obj).to.have.property('registerModule').that.is.a('function');
      expect(this.obj).to.have.property('registerFiles').that.is.a('function');
      expect(this.obj).to.have.property('registerInstance').that.is.a('function');
      expect(this.obj).to.have.property('registerHash').that.is.a('function');
      expect(this.obj).to.have.property('register').that.is.a('function');
      expect(this.obj).to.have.property('resolve').that.is.a('function');
      expect(this.obj).to.have.property('resolveAsset').that.is.a('function');
      expect(this.obj).to.have.property('invoke').that.is.a('function');
      expect(this.obj).to.have.property('remove').that.is.a('function');
    });

    it('should return object with AssetManager helper methods', function() {
      expect(this.obj).to.have.property('isFunction').that.is.a('function');
      expect(this.obj).to.have.property('isInjectable').that.is.a('function');
      expect(this.obj).to.have.property('isInstance').that.is.a('function');
      expect(this.obj).to.have.property('isModule').that.is.a('function');
      expect(this.obj).to.have.property('isRegistered').that.is.a('function');
      expect(this.obj).to.have.property('isResolved').that.is.a('function');
    });

    it('should return object without AssetManager compatibility methods', function() {
      expect(this.obj).to.not.have.property('get');
      expect(this.obj).to.not.have.property('load');
    });

  });

  describe('with compatibility set to false', function() {

    before(function() {
      this.obj = AssetManager.create(true);
    });

    it('should return an object', function() {
      expect(this.obj).to.be.an('object');
    });

    it('should return object with AssetManager properties', function () {
      expect(this.obj).to.have.property('__assets').that.is.a('object');
    });

    it('should return object with AssetManager core methods', function () {
      expect(this.obj).to.have.property('registerAsset').that.is.a('function');
      expect(this.obj).to.have.property('registerFunction').that.is.a('function');
      expect(this.obj).to.have.property('registerModule').that.is.a('function');
      expect(this.obj).to.have.property('registerFiles').that.is.a('function');
      expect(this.obj).to.have.property('registerInstance').that.is.a('function');
      expect(this.obj).to.have.property('registerHash').that.is.a('function');
      expect(this.obj).to.have.property('register').that.is.a('function');
      expect(this.obj).to.have.property('resolve').that.is.a('function');
      expect(this.obj).to.have.property('resolveAsset').that.is.a('function');
      expect(this.obj).to.have.property('invoke').that.is.a('function');
      expect(this.obj).to.have.property('remove').that.is.a('function');
    });

    it('should return object with AssetManager helper methods', function() {
      expect(this.obj).to.have.property('isFunction').that.is.a('function');
      expect(this.obj).to.have.property('isInjectable').that.is.a('function');
      expect(this.obj).to.have.property('isInstance').that.is.a('function');
      expect(this.obj).to.have.property('isModule').that.is.a('function');
      expect(this.obj).to.have.property('isRegistered').that.is.a('function');
      expect(this.obj).to.have.property('isResolved').that.is.a('function');
    });

    it('should return object with AssetManager compatibility methods', function() {
      expect(this.obj).to.have.property('get').that.is.a('function');
      expect(this.obj).to.have.property('load').that.is.a('function');
    });

  });

});
