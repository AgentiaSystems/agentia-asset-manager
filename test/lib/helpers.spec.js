'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../');
var Asset = require('../../lib/core/asset');
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

      before(function() {
        this.asset = new Asset('id', 'value', { constant: true });
      });

      it('should return silently if check succedes', function() {
        expect(function() {
          helpers.checkMustBeAsset(this.asset, 'id');
        }.bind(this)).to.not.throw;
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

      before(function() {
        this.is = 'is';
        this.isnot = 'isnot';
        this.am = new AssetManager();
        this.am.registerInstance(this.is, 'value');
      });

      after(function() {
        this.am.remove(this.is);
        this.am.remove(this.isnot);
        this.am = null;
      });

      it('should return true for existing dependencies', function() {
        expect(this.am.isRegistered(this.is)).to.be.true;
      });

      it('should return false for non-existing dependencies', function() {
        expect(this.am.isRegistered(this.isnot)).to.be.false;
      });

      it('should throw an error, when called with arguments', function() {
        expect(function() {
          this.am.isRegistered();
        }.bind(this)).to.throw(errors.MustBeString);
      });

    });

    describe('AssetManager.isInstance()', function() {

      before(function() {
        this.is = 'is';
        this.isnot = 'isnot';
        this.invalid = 'invalid';
        this.am = new AssetManager();
        this.am.registerInstance(this.is, 'value');
        this.am.registerFunction(this.isnot, function() {}, true);
      });

      after(function() {
        this.am.remove(this.is);
        this.am.remove(this.isnot);
        this.am = null;
      });

      it('should return true for constant dependencies', function() {
        expect(this.am.isInstance(this.is)).to.be.true;
      });

      it('should return false for non-constant dependencies', function() {
        expect(this.am.isInstance(this.isnot)).to.be.false;
      });

      it('should return false for non-existing dependencies', function() {
        expect(this.am.isInstance(this.invalid)).to.be.false;
      });

      it('should throw an error, when called with arguments', function() {
        expect(function() {
          this.am.isInstance();
        }.bind(this)).to.throw(errors.MustBeString);
      });

    });

    describe('AssetManager.isModule()', function() {

      before(function() {
        this.is = 'is';
        this.isnot = 'isnot';
        this.invalid = 'invalid';
        this.am = new AssetManager();
        this.am.registerModule(this.is, require.resolve('../fixtures/test-module-a'));
        this.am.registerFunction(this.isnot, function() {}, true);
      });

      after(function() {
        this.am.remove(this.is);
        this.am.remove(this.isnot);
        this.am = null;
      });

      it('should return true for module dependencies', function() {
        expect(this.am.isModule(this.is)).to.be.true;
      });

      it('should return false for non-module dependencies', function() {
        expect(this.am.isModule(this.isnot)).to.be.false;
      });

      it('should return false for non-existing dependencies', function() {
        expect(this.am.isModule(this.invalid)).to.be.false;
      });

      it('should throw an error, when called with arguments', function() {
        expect(function() {
          this.am.isModule();
        }.bind(this)).to.throw(errors.MustBeString);
      });

    });

    describe('AssetManager.isFunction()', function() {

      before(function() {
        this.is = 'is';
        this.isnot = 'isnot';
        this.invalid = 'invalid';
        this.am = new AssetManager();
        this.am.registerFunction(this.is, function() {}, true);
        this.am.registerInstance(this.isnot, 'value');
      });

      after(function() {
        this.am.remove(this.is);
        this.am.remove(this.isnot);
        this.am = null;
      });

      it('should return true for function dependencies', function() {
        expect(this.am.isFunction(this.is)).to.be.true;
      });

      it('should return false for non-function dependencies', function() {
        expect(this.am.isFunction(this.isnot)).to.be.false;
      });

      it('should return false for non-existing dependencies', function() {
        expect(this.am.isFunction(this.invalid)).to.be.false;
      });

      it('should throw an error, when called with arguments', function() {
        expect(function() {
          this.am.isFunction();
        }.bind(this)).to.throw(errors.MustBeString);
      });

    });

    describe('AssetManager.isInjectable()', function() {

      before(function() {
        this.is = 'is';
        this.isnot = 'isnot';
        this.invalid = 'invalid';
        this.am = new AssetManager();
        this.am.registerFunction(this.is, function() {}, true);
        this.am.registerFunction(this.isnot, function() {}, false);
      });

      after(function() {
        this.am.remove(this.is);
        this.am.remove(this.isnot);
        this.am = null;
      });

      it('should return true for function dependencies', function() {
        expect(this.am.isInjectable(this.is)).to.be.true;
      });

      it('should return false for non-function dependencies', function() {
        expect(this.am.isInjectable(this.isnot)).to.be.false;
      });

      it('should return false for non-existing dependencies', function() {
        expect(this.am.isInjectable(this.invalid)).to.be.false;
      });

      it('should throw an error, when called with arguments', function() {
        expect(function() {
          this.am.isInjectable();
        }.bind(this)).to.throw(errors.MustBeString);
      });

    });

    describe('AssetManager.isResolved()', function() {

      before(function() {
        this.is = 'is';
        this.isnot = 'isnot';
        this.invalid = 'invalid';
        this.fn = function(a) {
          return a;
        };
        this.am = new AssetManager();
        this.am.registerInstance(this.is, 'resolved');
        this.am.registerFunction(this.isnot, this.fn, true);
      });

      after(function() {
        this.am.remove(this.is);
        this.am.remove(this.isnot);
        this.am = null;
      });

      it('should return true for resolved assets', function() {
        expect(this.am.isResolved(this.is)).to.be.true;
      });

      it('should return false for non-resolved assets', function() {
        expect(this.am.isResolved(this.isnot)).to.be.false;
      });

      it('should return false for non-existing assets', function() {
        expect(this.am.isResolved(this.invalid)).to.be.false;
      });

      it('should throw an error, when called with arguments', function() {
        expect(function() {
          this.am.isResolved();
        }.bind(this)).to.throw(errors.MustBeString);
      });

    });

  });

});
