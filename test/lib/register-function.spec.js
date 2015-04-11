'use strict';

var chai = require('chai');
var expect = chai.expect;

var Modular = require('../../');
var errors = require('../../lib/errors');

describe('Modular.registerFunction()', function() {

  describe('registering a function asset (injectable)', function() {
    var modular = new Modular();
    var data = 21;
    var id = 'id';
    var fn = function(age) {
      return age;
    };
    modular.registerConstant('age', data);
    modular.registerFunction(id, fn, true);

    it('should register the asset', function() {
      expect(modular.isRegistered(id)).to.be.true;
    });

    it('should allow asset resolution', function() {
      expect(modular.resolve(id)).to.equal(data);
    });

  });

  describe('registering a function asset (non-injectable)', function () {
    var modular = new Modular();
    var id = 'id';
    var fn = function(age) {
      return age;
    };
    modular.registerFunction(id, fn);

    it('should register the asset', function() {
      expect(modular.isRegistered(id)).to.be.true;
    });

    it('should allow asset resolution', function() {
      expect(modular.resolve(id)).to.equal(fn);
    });

  });

  describe('calling .registerFunction() with invalid arguments', function() {
    var modular;

    beforeEach(function() {
      modular = new Modular();
    });

    afterEach(function() {
      modular = null;
    });

    it('should throw an error, when missing arguments', function() {
      expect(function() {
        modular.registerFunction();
      }).to.throw(errors.InvalidArguments);

      expect(function() {
        modular.registerFunction('id');
      }).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when id argument not a string', function() {
      var fn = function() {};
      expect(function() {
        modular.registerFunction(123, fn);
      }).to.throw(errors.MustBeString);
    });

    it('should throw an error, when fn argument not a function', function() {
      expect(function() {
        modular.registerFunction('id', 'fn');
      }).to.throw(errors.MustBeFunction);
    });

  });
});
