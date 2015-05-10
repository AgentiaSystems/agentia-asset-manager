'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../../');
var errors = require('../../../lib/errors');

describe('AssetManager.mixin()', function() {

  describe('with no compatibility argument', function() {

    before(function() {
      this.obj = {
        fn: function() {},
        key: 'value'
      };
      AssetManager.mixin(this.obj);
    });

    it('should preserve existing properties', function() {
      expect(this.obj).to.have.property('fn').that.is.a('function');
      expect(this.obj).to.have.property('key').that.is.a('string');
      expect(this.obj.key).to.equal('value');
    });

    it('should add AssetManager properties', function () {
      expect(this.obj).to.have.property('__assets').that.is.a('object');
    });

    it('should add AssetManager core methods', function () {
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

    it('should add AssetManager helper methods', function() {
      expect(this.obj).to.have.property('isFunction').that.is.a('function');
      expect(this.obj).to.have.property('isInjectable').that.is.a('function');
      expect(this.obj).to.have.property('isInstance').that.is.a('function');
      expect(this.obj).to.have.property('isModule').that.is.a('function');
      expect(this.obj).to.have.property('isRegistered').that.is.a('function');
      expect(this.obj).to.have.property('isResolved').that.is.a('function');
    });

    it('should not add AssetManager compatibility methods', function() {
      expect(this.obj).to.not.have.property('get');
      expect(this.obj).to.not.have.property('load');
    });

  });

  describe('with compatibility set to false', function() {

    before(function() {
      this.obj = {
        fn: function() {},
        key: 'value'
      };
      AssetManager.mixin(this.obj, false);
    });

    it('should preserve existing properties', function() {
      expect(this.obj).to.have.property('fn').that.is.a('function');
      expect(this.obj).to.have.property('key').that.is.a('string');
      expect(this.obj.key).to.equal('value');
    });

    it('should add AssetManager properties', function () {
      expect(this.obj).to.have.property('__assets').that.is.a('object');
    });

    it('should add AssetManager core methods', function () {
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

    it('should add AssetManager helper methods', function() {
      expect(this.obj).to.have.property('isFunction').that.is.a('function');
      expect(this.obj).to.have.property('isInjectable').that.is.a('function');
      expect(this.obj).to.have.property('isInstance').that.is.a('function');
      expect(this.obj).to.have.property('isModule').that.is.a('function');
      expect(this.obj).to.have.property('isRegistered').that.is.a('function');
      expect(this.obj).to.have.property('isResolved').that.is.a('function');
    });

    it('should not add AssetManager compatibility methods', function() {
      expect(this.obj).to.not.have.property('get');
      expect(this.obj).to.not.have.property('load');
    });

  });

  describe('with compatibility set to false', function() {

    before(function() {
      this.obj = {
        fn: function() {},
        key: 'value'
      };
      AssetManager.mixin(this.obj, true);
    });

    it('should preserve existing properties', function() {
      expect(this.obj).to.have.property('fn').that.is.a('function');
      expect(this.obj).to.have.property('key').that.is.a('string');
      expect(this.obj.key).to.equal('value');
    });

    it('should add AssetManager properties', function () {
      expect(this.obj).to.have.property('__assets').that.is.a('object');
    });

    it('should add AssetManager core methods', function () {
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

    it('should add AssetManager helper methods', function() {
      expect(this.obj).to.have.property('isFunction').that.is.a('function');
      expect(this.obj).to.have.property('isInjectable').that.is.a('function');
      expect(this.obj).to.have.property('isInstance').that.is.a('function');
      expect(this.obj).to.have.property('isModule').that.is.a('function');
      expect(this.obj).to.have.property('isRegistered').that.is.a('function');
      expect(this.obj).to.have.property('isResolved').that.is.a('function');
    });

    it('should add AssetManager compatibility methods', function() {
      expect(this.obj).to.have.property('get').that.is.a('function');
      expect(this.obj).to.have.property('load').that.is.a('function');
    });

  });

  describe('with invalid arguments', function () {

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        AssetManager.mixin();
      }).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when target not an object', function() {
      expect(function() {
        AssetManager.mixin('id');
      }).to.throw(errors.MustBeObject);
    });

  });

});
