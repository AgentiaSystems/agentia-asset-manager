'use strict';

var chai = require('chai');
var expect = chai.expect;

var Modular = require('../../');
var errors = require('../../lib/errors');

describe('Modular.registerHash()', function() {

  describe('registering an object hash (with injection disabled)', function() {
    var modular = new Modular();
    var hash = {
      key1: 'value1',
      key2: 123,
      key3: false,
      key4: { key: 'value '},
      key5: function() {}
    };
    modular.registerHash(hash);

    it('should register all the assets', function() {
      expect(modular.isRegistered('key1')).to.be.true;
      expect(modular.isRegistered('key2')).to.be.true;
      expect(modular.isRegistered('key3')).to.be.true;
      expect(modular.isRegistered('key4')).to.be.true;
      expect(modular.isRegistered('key5')).to.be.true;
    });

    it('should register with appropriate types', function() {
      expect(modular.isConstant('key1')).to.be.true;
      expect(modular.isConstant('key2')).to.be.true;
      expect(modular.isConstant('key3')).to.be.true;
      expect(modular.isConstant('key4')).to.be.true;
      expect(modular.isFunction('key5')).to.be.true;
    });

    it('should allow resolution of constant dependency', function() {
      expect(modular.resolve('key1')).to.equal(hash.key1);
      expect(modular.resolve('key2')).to.equal(hash.key2);
      expect(modular.resolve('key3')).to.equal(hash.key3);
      expect(modular.resolve('key4')).to.deep.equal(hash.key4);
      expect(modular.resolve('key5')).to.equal(hash.key5);
    });

  });

  describe('registering an object hash (with injection enabled)', function() {
    var modular = new Modular();
    var hash = {
      key1: 'value1',
      key2: 123,
      key3: false,
      key4: { key: 'value '},
      key5: function(key2) {
        return key2 * 2;
      }
    };
    modular.registerHash(hash, true);

    it('should register all the assets', function() {
      expect(modular.isRegistered('key1')).to.be.true;
      expect(modular.isRegistered('key2')).to.be.true;
      expect(modular.isRegistered('key3')).to.be.true;
      expect(modular.isRegistered('key4')).to.be.true;
      expect(modular.isRegistered('key5')).to.be.true;
    });

    it('should register with appropriate types', function() {
      expect(modular.isConstant('key1')).to.be.true;
      expect(modular.isConstant('key2')).to.be.true;
      expect(modular.isConstant('key3')).to.be.true;
      expect(modular.isConstant('key4')).to.be.true;
      expect(modular.isFunction('key5')).to.be.true;
    });

    it('should allow resolution of constant dependency', function() {
      expect(modular.resolve('key1')).to.equal(hash.key1);
      expect(modular.resolve('key2')).to.equal(hash.key2);
      expect(modular.resolve('key3')).to.equal(hash.key3);
      expect(modular.resolve('key4')).to.deep.equal(hash.key4);
      expect(modular.resolve('key5')).to.equal(hash.key2 * 2);
    });

  });

  describe('calling .registerHash() with invalid arguments', function() {
    var modular;

    beforeEach(function() {
      modular = new Modular();
    });

    afterEach(function() {
      modular = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        modular.registerHash();
      }).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        modular.registerHash(123);
      }).to.throw(errors.MustBeObject);
    });

  });

});
