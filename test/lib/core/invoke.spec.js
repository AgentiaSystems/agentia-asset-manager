'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../../');
var errors = require('../../../lib/errors');

describe('AssetManager.invoke()', function() {

  describe('invokeing assets into a function', function() {

    describe('without override, without context', function() {

      before(function() {
        this.id = 'a';
        this.value = 1;
        this.fn = function(a) {
          return a;
        };

        this.am = new AssetManager();
        this.am.registerInstance(this.id, this.value);
      });

      after(function() {
        this.am.remove(this.id);
        this.am = null;
      });

      it('should resolve value', function() {
        expect(this.am.invoke(this.fn)).to.equal(this.value);
      });

    });

    describe('with override, without context', function() {

      before(function() {
        this.id = 'a';
        this.value = 1;
        this.override = {
          a: 2
        };
        this.fn = function(a) {
          return a;
        };

        this.am = new AssetManager();
        this.am.registerInstance(this.id, this.value);
      });

      after(function() {
        this.am.remove(this.id);
        this.am = null;
      });

      it('should resolve value', function() {
        expect(this.am.invoke(this.fn, this.override))
          .to.equal(this.override.a);
      });

    });

    describe('without override, without context', function() {

      before(function() {
        this.id = 'a';
        this.value = 1;
        this.context = {
          b: 2
        };
        this.fn = function(a) {
          return a + this.b;
        };

        this.am = new AssetManager();
        this.am.registerInstance(this.id, this.value);
      });

      after(function() {
        this.am.remove(this.id);
        this.am = null;
      });

      it('should resolve value', function() {
        expect(this.am.invoke(this.fn, {}, this.context))
          .to.equal(this.value + this.context.b);
      });

    });

    describe('with override, with context', function() {

      before(function() {
        this.id = 'a';
        this.value = 1;
        this.override = {
          a: 2
        };
        this.context = {
          b: 3
        };
        this.fn = function(a) {
          return a + this.b;
        };

        this.am = new AssetManager();
        this.am.registerInstance(this.id, this.value);
      });

      after(function() {
        this.am.remove(this.id);
        this.am = null;
      });

      it('should resolve value', function() {
        expect(this.am.invoke(this.fn, this.override, this.context))
          .to.equal(this.override.a + this.context.b);
      });

    });

    describe('with embedded assets', function () {

      before(function() {
        this.fnA = function(a, b) {
          return a + b;
        };
        this.fnB = function(a, b) {
          return a * b;
        };
        this.fnC = function(resultA, resultB) {
          return resultA + resultB;
        };
        this.am = new AssetManager();
        this.am.registerFunction('resultA', this.fnA, true);
        this.am.registerFunction('resultB', this.fnB, true);
        this.am.registerInstance('a', 1);
        this.am.registerInstance('b', 2);
      });

      after(function() {
        this.am.remove('resultA');
        this.am.remove('resultB');
        this.am.remove('a');
        this.am.remove('b');
        this.am = null;
      });

      it('should return the result', function() {
        expect(this.am.invoke(this.fnA)).to.equal(3);
        expect(this.am.invoke(this.fnB)).to.equal(2);
        expect(this.am.invoke(this.fnC)).to.equal(5);
      });

    });

    describe('with circular assets', function() {

      before(function() {
        this.fnA = function(resultA) {
          return resultA;
        };
        this.fnB = function(resultC) {
          return resultC;
        };
        this.fnC = function(resultB) {
          return resultB;
        };
        this.am = new AssetManager();
        this.am.registerFunction('resultA', this.fnA, true);
        this.am.registerFunction('resultB', this.fnB, true);
        this.am.registerFunction('resultC', this.fnC, true);
      });

      after(function() {
        this.am.remove('resultA');
        this.am.remove('resultB');
        this.am.remove('resultC');
        this.am = null;
      });

      it('should detect self-reference and throw and error', function() {
        expect(function() {
          this.am.invoke(this.fnA);
        }.bind(this)).to.throw(errors.CircularReference);
      });

      it('should circular reference and throw and error', function() {
        expect(function() {
          this.am.invoke(this.fnB);
        }.bind(this)).to.throw(errors.CircularReference);
      });

    });

  });

  describe('calling .invoke() with invalid arguments', function() {

    beforeEach(function() {
      this.am = new AssetManager();
    });

    afterEach(function() {
      this.am = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        this.am.invoke();
      }.bind(this)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when target not a string or a function', function() {
      expect(function() {
        this.am.invoke('id');
      }.bind(this)).to.throw(errors.MustBeFunction);
    });

  });

});
