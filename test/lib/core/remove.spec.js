'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../../');
var errors = require('../../../lib/errors');

describe('AssetManager.remove()', function() {

  describe('removing a factory asset', function() {
    before(function() {
      this.id = 'id';
      this.value = function() {};

      this.am = AssetManager.create();
      this.am.registerFunction(this.id, this.value, true);
    });

    after(function() {
      this.am = null;
    });

    it('should no longer be registered', function() {
      this.am.remove(this.id);
      expect(this.am.isRegistered(this.id)).to.be.false;
    });

  });

  describe('removing a non-factory asset', function() {
    before(function() {
      this.id = 'id';
      this.value = 'value';

      this.am = AssetManager.create();
      this.am.registerInstance(this.id, this.value);
    });

    after(function() {
      this.am = null;
    });

    it('should no longer be registered', function() {
      this.am.remove(this.id);
      expect(this.am.isRegistered(this.id)).to.be.false;
    });

  });

  describe('removing an non-existing asset', function() {

    before(function() {
      this.id = 'notfound';
      this.am = AssetManager.create();
    });

    after(function() {
      this.am = null;
    });

    it('should return silently', function() {
      expect(this.am.remove(this.id)).to.not.throw;
    });

  });

  describe('calling .remove() with invalid arguments', function() {

    beforeEach(function() {
      this.am = AssetManager.create();
    });

    afterEach(function() {
      this.am = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        this.am.remove();
      }.bind(this)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when id not a string', function() {
      expect(function() {
        this.am.remove(this.am, 123);
      }.bind(this)).to.throw(errors.MustBeString);
    });

  });

});
