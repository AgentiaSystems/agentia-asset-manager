'use strict';

var chai = require('chai');
var expect = chai.expect;

var Modular = require('../../');
var errors = require('../../lib/errors');

describe('Helpers', function() {

  describe('Modular.isRegistered()', function() {
    var modular;
    var is = 'is';
    var isnot = 'isnot';

    before(function() {
      modular = new Modular();
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

  describe('Modular.isConstant()', function() {
    var modular;
    var is = 'is';
    var isnot = 'isnot';

    before(function() {
      modular = new Modular();
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

    it('should throw an error, when called with arguments', function() {
      expect(function() {
        modular.isConstant();
      }).to.throw(errors.MustBeString);
    });

  });

  describe('Modular.isModule()', function() {
    var modular;
    var is = 'is';
    var isnot = 'isnot';

    before(function() {
      modular = new Modular();
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

    it('should throw an error, when called with arguments', function() {
      expect(function() {
        modular.isModule();
      }).to.throw(errors.MustBeString);
    });

  });

  describe('Modular.isFunction()', function() {
    var modular;
    var is = 'is';
    var isnot = 'isnot';

    before(function() {
      modular = new Modular();
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

    it('should throw an error, when called with arguments', function() {
      expect(function() {
        modular.isFunction();
      }).to.throw(errors.MustBeString);
    });

  });

  describe('Modular.isInjectable()', function() {
    var modular;
    var is = 'is';
    var isnot = 'isnot';

    before(function() {
      modular = new Modular();
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

    it('should throw an error, when called with arguments', function() {
      expect(function() {
        modular.isInjectable();
      }).to.throw(errors.MustBeString);
    });

  });

});
