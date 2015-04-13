'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../');
var errors = require('../../lib/errors');

describe('AssetManager.resolve()', function() {
  var modular;

  describe('resolving an existing asset', function() {

    describe('without override', function() {
      var id = 'id';
      var value = 'value';

      before(function() {
        modular = new AssetManager();
        modular.registerConstant(id, value);
      });

      after(function() {
        modular.remove(id);
        modular = null;
      });

      it('should resolve value', function() {
        expect(modular.resolve(id)).to.equal(value);
      });

    });

    describe('with override', function() {
      var id = 'id';
      var value = 'value';
      var override = {
        id: 'other data'
      };

      before(function() {
        modular = new AssetManager();
        modular.registerConstant(id, value);
      });

      after(function() {
        modular.remove(id);
        modular = null;
      });

      it('should resolve to overriden value', function() {
        expect(modular.resolve(id, override)).to.equal(override.id);
      });

    });

  });

  describe('injecting a function with assets', function() {

    describe('without override', function() {
      var id = 'id';
      var fn = function(a, b) {
        return a + b;
      };

      before(function() {
        modular = new AssetManager();
        modular.registerFunction(id, fn);
        modular.registerConstant('a', 1);
        modular.registerConstant('b', 2);
      });

      after(function() {
        modular.remove(id);
        modular.remove('a');
        modular.remove('b');
        modular = null;
      });

      it('should return the result', function() {
        expect(modular.resolve(fn)).to.equal(3);
      });

    });

    describe('with override', function() {
      var id = 'id';
      var fn = function(a, b) {
        return a + b;
      };
      var override = {
        a: 99,
        b: 1
      };

      before(function() {
        modular = new AssetManager();
        modular.registerFunction(id, fn);
        modular.registerConstant('a', 1);
        modular.registerConstant('b', 2);
      });

      after(function() {
        modular.remove(id);
        modular.remove('a');
        modular.remove('b');
        modular = null;
      });

      it('should override, then return the result', function() {
        expect(modular.resolve(fn, override)).to.equal(100);
      });

    });

    describe('with embedded assets', function () {
      var fnA = function(a, b) {
        return a + b;
      };
      var fnB = function(a, b) {
        return a * b;
      };
      var fnC = function(resultA, resultB) {
        return resultA + resultB;
      };

      before(function() {
        modular = new AssetManager();
        modular.registerFunction('resultA', fnA, true);
        modular.registerFunction('resultB', fnB, true);
        modular.registerConstant('a', 1);
        modular.registerConstant('b', 2);
      });

      after(function() {
        modular.remove('resultA');
        modular.remove('resultB');
        modular.remove('a');
        modular.remove('b');
        modular = null;
      });

      it('should return the result', function() {
        expect(modular.resolve(fnA)).to.equal(3);
        expect(modular.resolve(fnB)).to.equal(2);
        expect(modular.resolve(fnC)).to.equal(5);
      });

    });

    describe('with circular assets', function() {
      var fnA = function(resultA) {
        return resultA;
      };
      var fnB = function(resultC) {
        return resultC;
      };
      var fnC = function(resultB) {
        return resultB;
      };

      before(function() {
        modular = new AssetManager();
        modular.registerFunction('resultA', fnA, true);
        modular.registerFunction('resultB', fnB, true);
        modular.registerFunction('resultC', fnC, true);
      });

      after(function() {
        modular.remove('resultA');
        modular.remove('resultB');
        modular.remove('resultC');
        modular = null;
      });

      it('should detect self-reference and throw and error', function() {
        expect(function() {
          modular.resolve('resultA');
        }).to.throw(errors.CircularReference);
      });

      it('should circular reference and throw and error', function() {
        expect(function() {
          modular.resolve('resultB');
        }).to.throw(errors.CircularReference);
      });

    });

  });

  describe('calling .resolve() with invalid arguments', function() {

    beforeEach(function() {
      modular = new AssetManager();
    });

    afterEach(function() {
      modular = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        modular.resolve();
      }).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when target not a string or a function', function() {
      expect(function() {
        modular.resolve(123);
      }).to.throw(errors.MustBeStringOrFunction);
    });

    it('should throw an error, when target asset does not exist', function() {
      expect(function() {
        modular.resolve('notfound');
      }).to.throw(errors.AssetNotFound);
    });

  });

});
