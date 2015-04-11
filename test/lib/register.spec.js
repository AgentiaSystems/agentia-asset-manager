'use strict';

var chai = require('chai');
var expect = chai.expect;

var Modular = require('../../');
var errors = require('../../lib/errors');

describe('Modular.register()', function() {

  describe('register a hash', function() {

    describe('with injection enabled (default)', function() {
      var modular = new Modular();
      var hash = {
        key1: 'data1',
        key2: 123,
        key3: false,
        key4: { key: 'data '},
        key5: function(key2) {
          return key2 * 2;
        }
      };
      modular.register(hash);

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

      it('should allow resolution of constant asset', function() {
        expect(modular.resolve('key1')).to.equal(hash.key1);
        expect(modular.resolve('key2')).to.equal(hash.key2);
        expect(modular.resolve('key3')).to.equal(hash.key3);
        expect(modular.resolve('key4')).to.deep.equal(hash.key4);
        expect(modular.resolve('key5')).to.equal(hash.key2 * 2);
      });

    });

    describe('with injection disabled', function() {
      var modular = new Modular();
      var hash = {
        key1: 'data1',
        key2: 123,
        key3: false,
        key4: { key: 'data '},
        key5: function() {}
      };
      modular.register(hash, false);

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

      it('should allow resolution of constant asset', function() {
        expect(modular.resolve('key1')).to.equal(hash.key1);
        expect(modular.resolve('key2')).to.equal(hash.key2);
        expect(modular.resolve('key3')).to.equal(hash.key3);
        expect(modular.resolve('key4')).to.deep.equal(hash.key4);
        expect(modular.resolve('key5')).to.equal(hash.key5);
      });

    });

  });

  describe('register a function', function() {

    describe('with injection enabled (default)', function() {
      var modular = new Modular();
      var data = 21;
      var id = 'id';
      var fn = function(age) {
        return age;
      };
      modular.registerConstant('age', data);
      modular.register(id, fn);

      it('should register the asset', function() {
        expect(modular.isRegistered(id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(modular.resolve(id)).to.equal(data);
      });

    });

    describe('with injection disabled', function () {
      var modular = new Modular();
      var id = 'id';
      var fn = function(age) {
        return age;
      };
      modular.register(id, fn, false);

      it('should register the asset', function() {
        expect(modular.isRegistered(id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(modular.resolve(id)).to.equal(fn);
      });

    });

  });

  describe('register a constant', function() {

    describe('string', function() {
      var modular = new Modular();
      var id = 'id';
      var data = 'data';
      modular.register(id, data);

      it('should register the asset', function() {
        expect(modular.isRegistered(id)).to.be.true;
      });

      it('should register as a constant asset', function() {
        expect(modular.isConstant(id)).to.be.true;
      });

      it('should allow resolution of constant asset', function() {
        expect(modular.resolve(id)).to.equal(data);
      });

    });

    describe('object', function() {
      var modular = new Modular();
      var id = 'id';
      var data = { key: 'data' };
      modular.register(id, data);

      it('should register the asset', function() {
        expect(modular.isRegistered(id)).to.be.true;
      });

      it('should register as a constant asset', function() {
        expect(modular.isConstant(id)).to.be.true;
      });

      it('should allow resolution of constant asset', function() {
        expect(modular.resolve(id)).to.deep.equal(data);
      });

    });

    describe('array', function() {
      var modular = new Modular();
      var id = 'id';
      var data = [ 'data1', 'data2', 'data3' ];
      modular.register(id, data);

      it('should register the asset', function() {
        expect(modular.isRegistered(id)).to.be.true;
      });

      it('should register as a constant asset', function() {
        expect(modular.isConstant(id)).to.be.true;
      });

      it('should allow resolution of constant asset', function() {
        expect(modular.resolve(id)).to.deep.equal(data);
      });

    });

  });

  describe('calling .register() with invalid arguments', function() {
    var modular;

    beforeEach(function() {
      modular = new Modular();
    });

    afterEach(function() {
      modular = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        modular.register();
      }).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when id not a string', function() {
      expect(function() {
        modular.register(123, 'module');
      }).to.throw(errors.MustBeString);
    });

  });

});
