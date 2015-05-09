'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../../');
var errors = require('../../../lib/errors');

describe('AssetManager.register()', function() {

  describe('register a hash', function() {

    describe('with invokeion enabled (default)', function() {

      before(function() {
        this.hash = {
          key1: 'data1',
          key2: 123,
          key3: false,
          key4: { key: 'data '},
          key5: function(key2) {
            return key2 * 2;
          }
        };
        this.am = new AssetManager();
        this.am.register(this.hash);
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

      it('should allow resolution of constant asset', function() {
        expect(this.am.resolve('key1')).to.equal(this.hash.key1);
        expect(this.am.resolve('key2')).to.equal(this.hash.key2);
        expect(this.am.resolve('key3')).to.equal(this.hash.key3);
        expect(this.am.resolve('key4')).to.deep.equal(this.hash.key4);
        expect(this.am.resolve('key5')).to.equal(this.hash.key2 * 2);
      });

    });

    describe('with invokeion disabled', function() {

      before(function() {
        this.am = new AssetManager();
        this.hash = {
          key1: 'data1',
          key2: 123,
          key3: false,
          key4: { key: 'data '},
          key5: function() {}
        };
        this.am.register(this.hash, false);
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

      it('should allow resolution of constant asset', function() {
        expect(this.am.resolve('key1')).to.equal(this.hash.key1);
        expect(this.am.resolve('key2')).to.equal(this.hash.key2);
        expect(this.am.resolve('key3')).to.equal(this.hash.key3);
        expect(this.am.resolve('key4')).to.deep.equal(this.hash.key4);
        expect(this.am.resolve('key5')).to.equal(this.hash.key5);
      });

    });

  });

  describe('register a function', function() {

    describe('with invokeion enabled (default)', function() {

      before(function() {
        this.dataId = 'age';
        this.data = 21;

        this.fnId = 'id';
        this.fn = function(age) {
          return age;
        };

        this.am = new AssetManager();
        this.am.registerInstance(this.dataId, this.data);
        this.am.register(this.fnId, this.fn);
      });

      after(function() {
        this.am = null;
      });

      it('should register the asset', function() {
        expect(this.am.isRegistered(this.fnId)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(this.am.resolve(this.fnId)).to.equal(this.data);
      });

    });

    describe('with invokeion disabled', function () {

      before(function() {
        this.id = 'id';
        this.fn = function(age) {
          return age;
        };
        this.am = new AssetManager();
        this.am.register(this.id, this.fn, false);
      });

      after(function() {
        this.am = null;
      });

      it('should register the asset', function() {
        expect(this.am.isRegistered(this.id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(this.am.resolve(this.id)).to.equal(this.fn);
      });

    });

  });

  describe('register a constant', function() {

    describe('string', function() {

      before(function() {
        this.id = 'id';
        this.data = 'data';
        this.am = new AssetManager();
        this.am.register(this.id, this.data);
      });

      after(function() {
        this.am = null;
      });

      it('should register the asset', function() {
        expect(this.am.isRegistered(this.id)).to.be.true;
      });

      it('should register as a constant asset', function() {
        expect(this.am.isInstance(this.id)).to.be.true;
      });

      it('should allow resolution of constant asset', function() {
        expect(this.am.resolve(this.id)).to.equal(this.data);
      });

    });

    describe('object', function() {

      before(function() {
        this.id = 'id';
        this.data = { key: 'data' };
        this.am = new AssetManager();
        this.am.register(this.id, this.data);
      });

      after(function() {
        this.am = null;
      });

      it('should register the asset', function() {
        expect(this.am.isRegistered(this.id)).to.be.true;
      });

      it('should register as a constant asset', function() {
        expect(this.am.isInstance(this.id)).to.be.true;
      });

      it('should allow resolution of constant asset', function() {
        expect(this.am.resolve(this.id)).to.deep.equal(this.data);
      });

    });

    describe('array', function() {

      before(function() {
        this.id = 'id';
        this.data = [ 'data1', 'data2', 'data3' ];
        this.am = new AssetManager();
        this.am.register(this.id, this.data);
      });

      after(function() {
        this.am = null;
      });

      it('should register the asset', function() {
        expect(this.am.isRegistered(this.id)).to.be.true;
      });

      it('should register as a constant asset', function() {
        expect(this.am.isInstance(this.id)).to.be.true;
      });

      it('should allow resolution of constant asset', function() {
        expect(this.am.resolve(this.id)).to.deep.equal(this.data);
      });

    });

  });

  describe('calling .register() with invalid arguments', function() {

    beforeEach(function() {
      this.am = new AssetManager();
    });

    afterEach(function() {
      this.am = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        this.am.register();
      }.bind(this)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when id not a string', function() {
      expect(function() {
        this.am.register(123, 'module');
      }.bind(this)).to.throw(errors.MustBeString);
    });

  });

});
