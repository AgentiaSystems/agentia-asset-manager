'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../../');
var errors = require('../../../lib/errors');

describe('AssetManager.registerModule()', function() {

  describe('registering a non-injectable module asset', function() {

    describe('with id', function() {

      before(function() {
        this.id = 'module';
        this.modulePath = require.resolve('../../fixtures/test-module-a');
        this.am = AssetManager.create();
        this.am.registerModule(this.id, this.modulePath);
      });

      after(function() {
        this.am = null;
      });

      it('should register the asset', function() {
        expect(this.am.isRegistered(this.id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(this.am.resolve(this.id)).to.equal(require(this.modulePath));
      });

    });

    describe('without id', function() {

      before(function() {
        this.id = 'testModuleA';
        this.modulePath = require.resolve('../../fixtures/test-module-a');
        this.am = AssetManager.create();
        this.am.registerModule(this.modulePath);
      });

      after(function() {
        this.am = null;
      });

      it('should register the asset', function() {
        expect(this.am.isRegistered(this.id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(this.am.resolve(this.id)).to.equal(require(this.modulePath));
      });

    });

  });

  describe('registering a injectable module asset', function() {

    describe('with id', function() {

      before(function() {
        this.id = 'module';
        this.modulePath = require.resolve('../../fixtures/test-module-a');
        this.am = AssetManager.create();
        this.am.registerInstance('a', 1);
        this.am.registerInstance('b', 2);
        this.am.registerModule(this.id, this.modulePath, true);
      });

      after(function() {
        this.am = null;
      });

      it('should register the asset', function() {
        expect(this.am.isRegistered(this.id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(this.am.resolve(this.id)).to.equal(3);
      });

    });

    describe('without id', function() {

      before(function() {
        this.id = 'testModuleA';
        this.moduleA = require.resolve('../../fixtures/test-module-a');
        this.am = AssetManager.create();
        this.am.registerInstance('a', 1);
        this.am.registerInstance('b', 2);
        this.am.registerModule(this.moduleA, true);
      });

      after(function() {
        this.am = null;
      });

      it('should register the asset', function() {
        expect(this.am.isRegistered(this.id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(this.am.resolve(this.id)).to.equal(3);
      });

    });

    describe('requires another module', function() {

      before(function() {
        this.am = AssetManager.create();
        this.id = 'module';
        this.moduleA = require.resolve('../../fixtures/test-module-a');
        this.moduleB = require.resolve('../../fixtures/test-module-b');
        this.am.registerInstance('a', 1);
        this.am.registerInstance('b', 2);
        this.am.registerModule(this.moduleA, true);
        this.am.registerModule(this.id, this.moduleB, true);
      });

      after(function() {
        this.am = null;
      });

      it('should register the asset', function() {
        expect(this.am.isRegistered(this.id)).to.be.true;
      });

      it('should allow asset resolution', function() {
        expect(this.am.resolve(this.id)).to.equal(3);
      });

    });

  });

  describe('calling .registerModule() with invalmodulePath arguments', function() {

    beforeEach(function() {
      this.am = AssetManager.create();
    });

    afterEach(function() {
      this.am = null;
    });

    it('should throw an error, when missing arguments', function() {
      expect(function() {
        this.am.registerModule();
      }.bind(this)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when id not a string', function() {
      expect(function() {
        this.am.registerModule(123, 'module');
      }.bind(this)).to.throw(errors.MustBeString);
    });

    it('should throw an error, when module "modulePath" not a string', function() {
      expect(function() {
        this.am.registerModule('id', 123);
      }.bind(this)).to.throw(errors.MustBeString);
    });

  });

});
