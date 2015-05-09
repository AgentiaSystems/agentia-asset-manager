'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../../');
var Asset = require('../../../lib/core/asset.js');
var errors = require('../../../lib/errors');

describe('AssetManager.resolveAsset()', function() {

  describe('resolve asset by id', function() {

    describe('without override, without context', function() {

      before(function() {
        this.id = 'id';
        this.value = 'value';
        this.am = new AssetManager();
        this.am.registerInstance(this.id, this.value);
      });

      after(function() {
        this.am.remove(this.id);
        this.am = null;
      });

      it('should resolve value', function() {
        expect(this.am.resolveAsset(this.id)).to.equal(this.value);
      });

    });

    describe('with override, without context', function() {

      before(function() {
        this.id = 'id';
        this.value = 'value';
        this.override = {
          id: 'other data'
        };
        this.am = new AssetManager();
        this.am.registerInstance(this.id, this.value);
      });

      after(function() {
        this.am.remove(this.id);
        this.am = null;
      });

      it('should resolve to overriden value', function() {
        expect(this.am.resolveAsset(this.id, this.override))
          .to.equal(this.override.id);
      });

    });

    describe('without override, with context', function() {

      before(function() {
        this.dataId = 'a';
        this.data = 1;

        this.fnId = 'fn';
        this.fn = function(a) {
          return a + this.b;
        };

        this.context = {
          b: 2
        };

        this.am = new AssetManager();
        this.am.registerInstance(this.dataId, this.data);
        this.am.registerFunction(this.fnId, this.fn, true);
      });

      after(function() {
        this.am.remove(this.dataId);
        this.am.remove(this.fnId);
        this.am = null;
      });

      it('should resolve value', function() {
        expect(this.am.resolveAsset(this.fnId, {}, this.context))
          .to.equal(this.data + this.context.b);
      });

    });

    describe('with override, with context', function() {

      before(function() {
        this.dataId = 'a';
        this.data = 1;

        this.fnId = 'fn';
        this.fn = function(a) {
          return a + this.b;
        };

        this.override = {
          a: 3
        };

        this.context = {
          b: 2
        };

        this.am = new AssetManager();
        this.am.registerInstance(this.dataId, this.data);
        this.am.registerFunction(this.fnId, this.fn, true);
      });

      after(function() {
        this.am.remove(this.dataId);
        this.am.remove(this.fnId);
        this.am = null;
      });

      it('should resolve value', function() {
        expect(this.am.resolveAsset(this.fnId, this.override, this.context))
          .to.equal(this.override.a + this.context.b);
      });

    });

  });

  describe('resolve asset instance', function() {

    describe('without override, without context', function() {

      before(function() {
        this.id = 'a';
        this.value = 1;
        this.fn = function(a) {
          return a;
        };
        this.asset = new Asset('temp', this.fn, { injectable: true });
        this.am = new AssetManager();
        this.am.registerInstance(this.id, this.value);
      });

      after(function() {
        this.am.remove(this.id);
        this.am = null;
      });

      it('should resolve value', function() {
        expect(this.am.resolveAsset(this.asset)).to.equal(this.value);
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
        this.asset = new Asset('temp', this.fn, { injectable: true });
        this.am = new AssetManager();
        this.am.registerInstance(this.id, this.value);
      });

      after(function() {
        this.am.remove(this.id);
        this.am = null;
      });

      it('should resolve value', function() {
        expect(this.am.resolveAsset(this.asset, this.override))
          .to.equal(this.override.a);
      });

    });

    describe('without override, with context', function() {

      before(function() {
        this.id = 'a';
        this.value = 1;
        this.context = {
          b: 2
        };
        this.fn = function(a) {
          return a + this.b;
        };
        this.asset = new Asset('temp', this.fn, { injectable: true });
        this.am = new AssetManager();
        this.am.registerInstance(this.id, this.value);
      });

      after(function() {
        this.am.remove(this.id);
        this.am = null;
      });

      it('should resolve value', function() {
        expect(this.am.resolveAsset(this.asset, {}, this.context))
          .to.equal(this.value + this.context.b);
      });

    });

    describe('with override, with context', function() {

      before(function() {
        this.id = 'a';
        this.value = 1;
        this.override = {
          a: 3
        };
        this.context = {
          b: 2
        };
        this.fn = function(a) {
          return a + this.b;
        };
        this.asset = new Asset('temp', this.fn, { injectable: true });
        this.am = new AssetManager();
        this.am.registerInstance(this.id, this.value);
      });

      after(function() {
        this.am.remove(this.id);
        this.am = null;
      });

      it('should resolve value', function() {
        expect(this.am.resolveAsset(this.asset, this.override, this.context))
          .to.equal(this.override.a + this.context.b);
      });

    });

  });

  describe('calling .resolveAsset() with invalid arguments', function() {

    beforeEach(function() {
      this.am = new AssetManager();
    });

    afterEach(function() {
      this.am = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        this.am.resolveAsset();
      }.bind(this)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when target not a string or a function', function() {
      expect(function() {
        this.am.resolveAsset({});
      }.bind(this)).to.throw(errors.AssetUndefined);
    });

    it('should throw an error, when target asset does not exist', function() {
      expect(function() {
        this.am.resolveAsset('notfound');
      }.bind(this)).to.throw(errors.AssetNotFound);
    });

  });

});
