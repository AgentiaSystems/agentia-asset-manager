'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../');
var errors = require('../../lib/errors');

describe('AssetManager.remove()', function() {
  var modular;

  describe('removing a factory asset', function() {
    var id = 'id';
    var value = function() {};

    before(function() {
      modular = new AssetManager();
      modular.registerFunction(id, value, true);
    });

    after(function() {
      modular = null;
    });

    it('should no longer be registered', function() {
      modular.remove(id);
      expect(modular.isRegistered(id)).to.be.false;
    });

  });

  describe('removing a non-factory asset', function() {
    var id = 'id';
    var value = 'value';

    before(function() {
      modular = new AssetManager();
      modular.registerInstance(id, value);
    });

    after(function() {
      modular = null;
    });

    it('should no longer be registered', function() {
      modular.remove(id);
      expect(modular.isRegistered(id)).to.be.false;
    });

  });

  describe('removing an non-existing asset', function() {
    var id = 'notfound';

    before(function() {
      modular = new AssetManager();
    });

    after(function() {
      modular = null;
    });

    it('should return silently', function() {
      expect(modular.remove(id)).to.not.throw;
    });

  });

  describe('calling .remove() with invalid arguments', function() {

    beforeEach(function() {
      modular = new AssetManager();
    });

    afterEach(function() {
      modular = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        modular.remove();
      }).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when id not a string', function() {
      expect(function() {
        modular.remove(modular, 123);
      }).to.throw(errors.MustBeString);
    });

  });

});
