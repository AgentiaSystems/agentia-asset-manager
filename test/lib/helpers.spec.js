'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../');
var Asset = require('../../lib/asset');
var errors = require('../../lib/errors');
var helpers = require('../../lib/helpers');

describe('Helpers', function() {

  describe('General Use', function() {

    describe('.checkMustBeString()', function() {

      it('should return silently if check succedes', function() {
        expect(function() {
          helpers.checkMustBeString('value', 'id');
        }).to.not.throw;
      });

      it('should throw an error if check fails', function() {
        expect(function() {
          helpers.checkMustBeString(1234, 'id');
        }).to.not.throw;
      });

    });

    describe('.checkMinArgs()', function() {

      it('should return silently if check succedes', function() {
        expect(function() {
          helpers.checkMinArgs([1, 2, 3], 3);
        }).to.not.throw;
      });

      it('should throw an error if check fails', function() {
        expect(function() {
          helpers.checkMinArgs([1, 2], 3);
        }).to.not.throw;
      });

    });

    describe('.checkMustBeAsset()', function() {
      var asset = new Asset('id', 'value', { constant: true });

      it('should return silently if check succedes', function() {
        expect(function() {
          helpers.checkMustBeAsset(asset, 'id');
        }).to.not.throw;
      });

      it('should throw an error if check fails', function() {
        expect(function() {
          helpers.checkMustBeAsset({}, 'id');
        }).to.not.throw;
      });

    });

  });

  describe('AssetManager Class', function() {

    describe('AssetManager.isRegistered()', function() {
      var modular;
      var is = 'is';
      var isnot = 'isnot';

      before(function() {
        modular = new AssetManager();
        modular.registerConstant(is, 'value');
      });

      after(function() {
        modular.remove(is);
        modular.remove(isnot);
        modular = null;
      });

      it('should return true for existing dependencies', function() {
        expect(modular.isRegistered(is)).to.be.true;
      });

      it('should return false for non-existing dependencies', function() {
        expect(modular.isRegistered(isnot)).to.be.false;
      });

      it('should throw an error, when called with arguments', function() {
        expect(function() {
          modular.isRegistered();
        }).to.throw(errors.MustBeString);
      });

    });

    describe('AssetManager.isConstant()', function() {
      var modular;
      var is = 'is';
      var isnot = 'isnot';
      var invalid = 'invalid';

      before(function() {
        modular = new AssetManager();
        modular.registerConstant(is, 'value');
        modular.registerFunction(isnot, function() {}, true);
      });

      after(function() {
        modular.remove(is);
        modular.remove(isnot);
        modular = null;
      });

      it('should return true for constant dependencies', function() {
        expect(modular.isConstant(is)).to.be.true;
      });

      it('should return false for non-constant dependencies', function() {
        expect(modular.isConstant(isnot)).to.be.false;
      });

      it('should return false for non-existing dependencies', function() {
        expect(modular.isConstant(invalid)).to.be.false;
      });

      it('should throw an error, when called with arguments', function() {
        expect(function() {
          modular.isConstant();
        }).to.throw(errors.MustBeString);
      });

    });

    describe('AssetManager.isModule()', function() {
      var modular;
      var is = 'is';
      var isnot = 'isnot';
      var invalid = 'invalid';

      before(function() {
        modular = new AssetManager();
        modular.registerModule(is, require.resolve('../fixtures/test-module-a'));
        modular.registerFunction(isnot, function() {}, true);
      });

      after(function() {
        modular.remove(is);
        modular.remove(isnot);
        modular = null;
      });

      it('should return true for module dependencies', function() {
        expect(modular.isModule(is)).to.be.true;
      });

      it('should return false for non-module dependencies', function() {
        expect(modular.isModule(isnot)).to.be.false;
      });

      it('should return false for non-existing dependencies', function() {
        expect(modular.isModule(invalid)).to.be.false;
      });

      it('should throw an error, when called with arguments', function() {
        expect(function() {
          modular.isModule();
        }).to.throw(errors.MustBeString);
      });

    });

    describe('AssetManager.isFunction()', function() {
      var modular;
      var is = 'is';
      var isnot = 'isnot';
      var invalid = 'invalid';

      before(function() {
        modular = new AssetManager();
        modular.registerFunction(is, function() {}, true);
        modular.registerConstant(isnot, 'value');
      });

      after(function() {
        modular.remove(is);
        modular.remove(isnot);
        modular = null;
      });

      it('should return true for function dependencies', function() {
        expect(modular.isFunction(is)).to.be.true;
      });

      it('should return false for non-function dependencies', function() {
        expect(modular.isFunction(isnot)).to.be.false;
      });

      it('should return false for non-existing dependencies', function() {
        expect(modular.isFunction(invalid)).to.be.false;
      });

      it('should throw an error, when called with arguments', function() {
        expect(function() {
          modular.isFunction();
        }).to.throw(errors.MustBeString);
      });

    });

    describe('AssetManager.isInjectable()', function() {
      var modular;
      var is = 'is';
      var isnot = 'isnot';
      var invalid = 'invalid';

      before(function() {
        modular = new AssetManager();
        modular.registerFunction(is, function() {}, true);
        modular.registerFunction(isnot, function() {}, false);
      });

      after(function() {
        modular.remove(is);
        modular.remove(isnot);
        modular = null;
      });

      it('should return true for function dependencies', function() {
        expect(modular.isInjectable(is)).to.be.true;
      });

      it('should return false for non-function dependencies', function() {
        expect(modular.isInjectable(isnot)).to.be.false;
      });

      it('should return false for non-existing dependencies', function() {
        expect(modular.isInjectable(invalid)).to.be.false;
      });

      it('should throw an error, when called with arguments', function() {
        expect(function() {
          modular.isInjectable();
        }).to.throw(errors.MustBeString);
      });

    });

  });

});
