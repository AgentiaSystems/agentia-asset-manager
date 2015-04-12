'use strict';

var chai = require('chai');
var expect = chai.expect;

var Modular = require('../../');
var errors = require('../../lib/errors');

describe('Modular.registerConstant()', function() {

  describe('registering a constant dependency (string)', function() {
    var modular = new Modular();
    var id = 'id';
    var data = 'data';
    modular.registerConstant(id, data);

    it('should register the dependency', function() {
      expect(modular.isRegistered(id)).to.be.true;
    });

    it('should register as a constant dependency', function() {
      expect(modular.isConstant(id)).to.be.true;
    });

    it('should allow resolution of constant dependency', function() {
      expect(modular.resolve(id)).to.equal(data);
    });

  });

  describe('registering a constant dependency (object)', function() {
    var modular = new Modular();
    var id = 'id';
    var data = { key: 'data' };
    modular.registerConstant(id, data);

    it('should register the dependency', function() {
      expect(modular.isRegistered(id)).to.be.true;
    });

    it('should register as a constant dependency', function() {
      expect(modular.isConstant(id)).to.be.true;
    });

    it('should allow resolution of constant dependency', function() {
      expect(modular.resolve(id)).to.deep.equal(data);
    });

  });

  describe('registering a constant dependency (array)', function() {
    var modular = new Modular();
    var id = 'id';
    var data = [ 'data1', 'data2', 'data3' ];
    modular.registerConstant(id, data);

    it('should register the dependency', function() {
      expect(modular.isRegistered(id)).to.be.true;
    });

    it('should register as a constant dependency', function() {
      expect(modular.isConstant(id)).to.be.true;
    });

    it('should allow resolution of constant dependency', function() {
      expect(modular.resolve(id)).to.deep.equal(data);
    });

  });

  describe('calling .registerConstant() with invalid arguments', function() {
    var modular;

    beforeEach(function() {
      modular = new Modular();
    });

    afterEach(function() {
      modular = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function () {
        modular.registerConstant();
      }).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when called one argument', function() {
      expect(function() {
        modular.registerConstant('id');
      }).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when id argument not a string', function() {
      expect(function() {
        modular.registerConstant(123, 'id');
      }).to.throw(errors.MustBeString);
    });

  });
});
