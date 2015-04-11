'use strict';

var chai = require('chai');
var expect = chai.expect;

var Modular = require('../../');
var errors = require('../../lib/errors');

describe('Modular.registerModule()', function() {

  describe('registering a non-injectable module asset', function() {

    describe('with id', function() {
      var modular = new Modular();
      var id = 'module';
      var modulePath = require.resolve('../fixtures/test-module-a');
      modular.registerModule(id, modulePath);

      it('should register the asset', function() {
        expect(modular.isRegistered(id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(modular.resolve(id)).to.equal(require(modulePath));
      });

    });

    describe('without id', function() {
      var modular = new Modular();
      var id = 'testModuleA';
      var modulePath = require.resolve('../fixtures/test-module-a');
      modular.registerModule(modulePath);

      it('should register the asset', function() {
        expect(modular.isRegistered(id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(modular.resolve(id)).to.equal(require(modulePath));
      });

    });

  });

  describe('registering a injectable module asset', function() {

    describe('with id', function() {
      var modular = new Modular();
      var id = 'module';
      var modulePath = require.resolve('../fixtures/test-module-a');
      modular.registerConstant('a', 1);
      modular.registerConstant('b', 2);
      modular.registerModule(id, modulePath, true);

      it('should register the asset', function() {
        expect(modular.isRegistered(id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(modular.resolve(id)).to.equal(3);
      });

    });

    describe('without id', function() {
      var modular = new Modular();
      var id = 'testModuleA';
      var moduleA = require.resolve('../fixtures/test-module-a');
      modular.registerConstant('a', 1);
      modular.registerConstant('b', 2);
      modular.registerModule(moduleA, true);

      it('should register the asset', function() {
        expect(modular.isRegistered(id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(modular.resolve(id)).to.equal(3);
      });

    });

    describe('requires another module', function() {
      var modular = new Modular();
      var id = 'module';
      var moduleA = require.resolve('../fixtures/test-module-a');
      var moduleB = require.resolve('../fixtures/test-module-b');
      modular.registerConstant('a', 1);
      modular.registerConstant('b', 2);
      modular.registerModule(moduleA, true);
      modular.registerModule(id, moduleB, true);

      it('should register the asset', function() {
        expect(modular.isRegistered(id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(modular.resolve(id)).to.equal(3);
      });

    });

  });

  describe('calling .registerModule() with invalmodulePath arguments', function() {
    var modular;

    beforeEach(function() {
      modular = new Modular();
    });

    afterEach(function() {
      modular = null;
    });

    it('should throw an error, when missing arguments', function() {
      expect(function() {
        modular.registerModule();
      }).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when id not a string', function() {
      expect(function() {
        modular.registerModule(123, 'module');
      }).to.throw(errors.MustBeString);
    });

    it('should throw an error, when module "modulePath" not a string', function() {
      expect(function() {
        modular.registerModule('id', 123);
      }).to.throw(errors.MustBeString);
    });

  });

});
