'use strict';

var chai = require('chai');
var expect = chai.expect;

var Asset = require('../../lib/core/asset');
var errors = require('../../lib/errors');

describe('Asset()', function() {

  it('should be a function', function() {
    expect(Asset).to.be.a('function');
  });

  it('should be a factory of Asset objects', function() {
    var asset = new Asset('key', 'value', { constant: true });
    expect(asset).to.be.an.instanceof(Asset);
  });

  describe('API', function() {

    before(function() {
      this.asset = new Asset('key', 'value', { constant: true });
    });

    it('should expose .isInjectable', function() {
      expect(this.asset).to.have.property('isInjectable');
    });

    it('should expose .isInstance', function() {
      expect(this.asset).to.have.property('isInstance');
    });

    it('should expose .isModule', function() {
      expect(this.asset).to.have.property('isModule');
    });

    it('should expose .isFunction', function() {
      expect(this.asset).to.have.property('isFunction');
    });

    it('should expose .isResolved', function() {
      expect(this.asset).to.have.property('isResolved');
    });

    it('should expose .factory', function() {
      expect(this.asset).to.have.property('factory');
    });

    it('should expose .value', function() {
      expect(this.asset).to.have.property('value');
    });

    it('should expose .resolveTo()', function() {
      expect(this.asset).to.have.property('resolveTo').that.is.a('function');
    });

  });

  describe('creation of a constant asset', function() {
    before(function() {
      this.asset = new Asset('key', 'value', { constant: true });
    });

    it('should return a constant asset', function() {
      expect(this.asset.isInstance).to.be.true;
    });

    it('should return a resolved asset', function() {
      expect(this.asset.isResolved).to.be.true;
    });

    it('should allow the retrieval of the asset value', function() {
      expect(this.asset.value).to.equal('value');
    });
  });

  describe('creation of a non-injectable function asset', function() {

    before(function() {
      this.fn = function (a, b) {
        return a + b;
      };
      this.asset = new Asset('key', this.fn);
    });

    it('should return a function asset', function() {
      expect(this.asset.isFunction).to.be.true;
    });

    it('shoud return an non-injectable asset', function() {
      expect(this.asset.isInjectable).to.be.false;
    });

    it('should return a resolved asset', function() {
      expect(this.asset.isResolved).to.be.true;
    });

    it('should allow the retrieval of the asset value', function() {
      expect(this.asset.value).to.equal(this.fn);
    });

  });

  describe('creation of an injectable function asset', function() {

    before(function() {
      this.fn = function (a, b) {
        return a + b;
      };
      this.asset = new Asset('key', this.fn, { injectable: true });
    });

    it('should return a function asset', function() {
      expect(this.asset.isFunction).to.be.true;
    });

    it('shoud return an injectable asset', function() {
      expect(this.asset.isInjectable).to.be.true;
    });

    it('should return a non-resolved asset', function() {
      expect(this.asset.isResolved).to.be.false;
    });

    it('should not allow the retrieval of the asset value', function() {
      expect(this.asset.value).to.be.null;
    });

    it('should allow the retrieval of the asset factory', function() {
      expect(this.asset.factory).to.equal(this.fn);
    });

  });

  describe('creation of a non-injectable module asset', function() {

    before(function() {
      this.modulePath = require.resolve('../fixtures/test-module-a');
      this.asset = new Asset('module', this.modulePath, {
        module: true,
        injectable: false
      });
    });

    it('should return a function asset', function() {
      expect(this.asset.isFunction).to.be.true;
    });

    it('should return a non-injectable asset', function() {
      expect(this.asset.isInjectable).to.be.false;
    });

    it('should return a module asset', function () {
      expect(this.asset.isModule).to.be.true;
    });

    it('should return a resolved asset', function() {
      expect(this.asset.isResolved).to.be.true;
    });

    it('should allow the retrival of the asset value', function() {
      expect(this.asset.value).to.equal(require('../fixtures/test-module-a'));
    });

  });

  describe('creation of an injectable module asset', function() {

    before(function() {
      this.modulePath = require.resolve('../fixtures/test-module-a');
      this.asset = new Asset('key', this.modulePath, {
        module: true,
        injectable: true
      });
    });

    it('should return a function asset', function() {
      expect(this.asset.isFunction).to.be.true;
    });

    it('should return an injectable asset', function() {
      expect(this.asset.isInjectable).to.be.true;
    });

    it('should return a module asset', function() {
      expect(this.asset.isModule).to.be.true;
    });

    it('shoud return a non-resolved asset', function() {
      expect(this.asset.isResolved).to.be.false;
    });

    it('should not allow the retrieval of the asset value', function() {
      expect(this.asset.value).to.be.null;
    });

    it('shoud allow the retrieval of the asset factory', function() {
      expect(this.asset.factory).to.equal(require('../fixtures/test-module-a'));
    });

  });

  describe('creating of a module asset, yielding a constant asset', function() {

    before(function() {
      this.modulePath = require.resolve('../fixtures/test-module-d');
      this.asset = new Asset('key', this.modulePath, {
        module: true,
        injectable: true
      });
    });

    it('should return a constant Asset', function() {
      expect(this.asset.isInstance).to.be.true;
    });

    it('should return an non-injectable Asset', function() {
      expect(this.asset.isInjectable).to.be.false;
    });

    it('should return a module Asset', function() {
      expect(this.asset.isModule).to.be.true;
    });

    it('shoud return a resolved Asset', function() {
      expect(this.asset.isResolved).to.be.true;
    });

    it('should allow the retrieval of the Asset value', function() {
      expect(this.asset.value)
        .to.deep.equal(require('../fixtures/test-module-d'));
    });

    it('shoud not have a factory', function() {
      expect(this.asset.factory).to.be.null;
    });

  });

  describe('asset resolution', function() {

    before(function() {
      this.fn = function (a, b) {
        return a + b;
      };
      this.value = 'resolved value';
      this.asset = new Asset('key', this.fn, { injectable: true });
      this.asset.resolveTo(this.value);
    });

    it('should set asset value', function() {
      expect(this.asset.value).to.equal(this.value);
    });

    it('should set asset as resolved', function() {
      expect(this.asset.isResolved).to.be.true;
    });

  });

  describe('creation with invalid arguments', function() {

    it('should throw an error, when missing arguments', function() {
      var asset;

      expect(function invalidArguments() {
        asset = new Asset();
      }).to.throw(errors.InvalidArguments);
      expect(asset).to.be.undefined;
    });

    it('should throw an error, when missing asset argument', function() {
      var asset;

      expect(function invalidArguments() {
        asset = new Asset('name');
      }).to.throw(errors.InvalidArguments);
      expect(asset).to.be.undefined;
    });

    it('should throw an error, when id argument is not a string', function() {
      var asset;

      expect(function mustBeString() {
        asset = new Asset(1234, 'value');
      }).to.throw(errors.MustBeString);
      expect(asset).to.be.undefined;
    });

  });

});
