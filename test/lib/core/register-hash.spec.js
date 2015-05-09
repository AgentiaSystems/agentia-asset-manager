'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../');
var errors = require('../../lib/errors');

describe('AssetManager.registerHash()', function() {

  describe('registering an object hash (with invokeion disabled)', function() {

    before(function() {
      this.hash = {
        key1: 'value1',
        key2: 123,
        key3: false,
        key4: { key: 'value '},
        key5: function() {}
      };
      this.am = new AssetManager();
      this.am.registerHash(this.hash);
    });

    after(function() {
      this.am = null;
    });

    it('should register all the assets', function() {
      expect(this.am.isRegistered('key1')).to.be.true;
      expect(this.am.isRegistered('key2')).to.be.true;
      expect(this.am.isRegistered('key3')).to.be.true;
      expect(this.am.isRegistered('key4')).to.be.true;
      expect(this.am.isRegistered('key5')).to.be.true;
    });

    it('should register with appropriate types', function() {
      expect(this.am.isInstance('key1')).to.be.true;
      expect(this.am.isInstance('key2')).to.be.true;
      expect(this.am.isInstance('key3')).to.be.true;
      expect(this.am.isInstance('key4')).to.be.true;
      expect(this.am.isFunction('key5')).to.be.true;
    });

    it('should allow resolution of constant dependency', function() {
      expect(this.am.resolve('key1')).to.equal(this.hash.key1);
      expect(this.am.resolve('key2')).to.equal(this.hash.key2);
      expect(this.am.resolve('key3')).to.equal(this.hash.key3);
      expect(this.am.resolve('key4')).to.deep.equal(this.hash.key4);
      expect(this.am.resolve('key5')).to.equal(this.hash.key5);
    });

  });

  describe('registering an object hash (with invokeion enabled)', function() {

    before(function() {
      this.hash = {
        key1: 'value1',
        key2: 123,
        key3: false,
        key4: { key: 'value '},
        key5: function(key2) {
          return key2 * 2;
        }
      };
      this.am = new AssetManager();
      this.am.registerHash(this.hash, true);
    });

    it('should register all the assets', function() {
      expect(this.am.isRegistered('key1')).to.be.true;
      expect(this.am.isRegistered('key2')).to.be.true;
      expect(this.am.isRegistered('key3')).to.be.true;
      expect(this.am.isRegistered('key4')).to.be.true;
      expect(this.am.isRegistered('key5')).to.be.true;
    });

    it('should register with appropriate types', function() {
      expect(this.am.isInstance('key1')).to.be.true;
      expect(this.am.isInstance('key2')).to.be.true;
      expect(this.am.isInstance('key3')).to.be.true;
      expect(this.am.isInstance('key4')).to.be.true;
      expect(this.am.isFunction('key5')).to.be.true;
    });

    it('should allow resolution of constant dependency', function() {
      expect(this.am.resolve('key1')).to.equal(this.hash.key1);
      expect(this.am.resolve('key2')).to.equal(this.hash.key2);
      expect(this.am.resolve('key3')).to.equal(this.hash.key3);
      expect(this.am.resolve('key4')).to.deep.equal(this.hash.key4);
      expect(this.am.resolve('key5')).to.equal(this.hash.key2 * 2);
    });

  });

  describe('calling .registerHash() with invalid arguments', function() {

    beforeEach(function() {
      this.am = new AssetManager();
    });

    afterEach(function() {
      this.am = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        this.am.registerHash();
      }.bind(this)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        this.am.registerHash(123);
      }.bind(this)).to.throw(errors.MustBeObject);
    });

  });

});
