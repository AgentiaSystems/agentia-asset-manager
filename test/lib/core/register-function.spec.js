'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../../');
var errors = require('../../../lib/errors');

describe('AssetManager.registerFunction()', function() {

  describe('registering a function asset (injectable)', function() {

    before(function() {
      this.data = 21;
      this.id = 'id';
      this.fn = function(age) {
        return age;
      };
      this.am = new AssetManager();
      this.am.registerInstance('age', this.data);
      this.am.registerFunction(this.id, this.fn, true);
    });

    after(function() {
      this.am = null;
    });

    it('should register the asset', function() {
      expect(this.am.isRegistered(this.id)).to.be.true;
    });

    it('should allow asset resolution', function() {
      expect(this.am.resolve(this.id)).to.equal(this.data);
    });

  });

  describe('registering a function asset (non-injectable)', function () {

    before(function() {
      this.id = 'id';
      this.fn = function(age) {
        return age;
      };
      this.am = new AssetManager();
      this.am.registerFunction(this.id, this.fn);
    });

    after(function() {
      this.am = null;
    });

    it('should register the asset', function() {
      expect(this.am.isRegistered(this.id)).to.be.true;
    });

    it('should allow asset resolution', function() {
      expect(this.am.resolve(this.id)).to.equal(this.fn);
    });

  });

  describe('calling .registerFunction() with invalid arguments', function() {
    beforeEach(function() {
      this.am = new AssetManager();
    });

    afterEach(function() {
      this.am = null;
    });

    it('should throw an error, when missing arguments', function() {
      expect(function() {
        this.am.registerFunction();
      }.bind(this)).to.throw(errors.InvalidArguments);

      expect(function() {
        this.am.registerFunction('id');
      }.bind(this)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when id argument not a string', function() {
      var fn = function() {};
      expect(function() {
        this.am.registerFunction(123, fn);
      }.bind(this)).to.throw(errors.MustBeString);
    });

    it('should throw an error, when fn argument not a function', function() {
      expect(function() {
        this.am.registerFunction('id', 'fn');
      }.bind(this)).to.throw(errors.MustBeFunction);
    });

  });
});
