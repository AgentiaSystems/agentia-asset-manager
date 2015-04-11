'use strict';

var chai = require('chai');
var expect = chai.expect;

var EventEmitter = require('events').EventEmitter;
var Asset = require('../../lib/asset');
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
    var asset = new Asset('key', 'value', { constant: true });

    it('should expose .isInjectable()', function() {
      expect(asset).to.have.property('isInjectable').that.is.a('function');
    });

    it('should expose .isConstant()', function() {
      expect(asset).to.have.property('isConstant').that.is.a('function');
    });

    it('should expose .isModule()', function() {
      expect(asset).to.have.property('isModule').that.is.a('function');
    });

    it('should expose .isFunction()', function() {
      expect(asset).to.have.property('isFunction').that.is.a('function');
    });

    it('should expose .isResolved()', function() {
      expect(asset).to.have.property('isResolved').that.is.a('function');
    });

    it('should expose .getFactory()', function() {
      expect(asset).to.have.property('getFactory').that.is.a('function');
    });

    it('should expose .getValue()', function() {
      expect(asset).to.have.property('getValue').that.is.a('function');
    });

    it('should expose .resolveTo()', function() {
      expect(asset).to.have.property('resolveTo').that.is.a('function');
    });

  });

  describe('creation of a constant asset', function() {
    var asset = new Asset('key', 'value', { constant: true });

    it('should return a constant asset', function() {
      expect(asset.isConstant()).to.be.true;
    });

    it('should return a resolved asset', function() {
      expect(asset.isResolved()).to.be.true;
    });

    it('should allow the retrieval of the asset value', function() {
      expect(asset.getValue()).to.equal('value');
    });
  });

  describe('creation of a non-injectable function asset', function() {
    var fn = function (a, b) {
      return a + b;
    };
    var asset = new Asset('key', fn);

    it('should return a function asset', function() {
      expect(asset.isFunction()).to.be.true;
    });

    it('shoud return an non-injectable asset', function() {
      expect(asset.isInjectable()).to.be.false;
    });

    it('should return a resolved asset', function() {
      expect(asset.isResolved()).to.be.true;
    });

    it('should allow the retrieval of the asset value', function() {
      expect(asset.getValue()).to.equal(fn);
    });

  });

  describe('creation of an injectable function asset', function() {
    var fn = function (a, b) {
      return a + b;
    };
    var asset = new Asset('key', fn, { injectable: true });

    it('should return a function asset', function() {
      expect(asset.isFunction()).to.be.true;
    });

    it('shoud return an injectable asset', function() {
      expect(asset.isInjectable()).to.be.true;
    });

    it('should return a non-resolved asset', function() {
      expect(asset.isResolved()).to.be.false;
    });

    it('should not allow the retrieval of the asset value', function() {
      expect(asset.getValue()).to.be.null;
    });

    it('should have a context of type EventEmitter', function() {
      expect(asset._context).to.be.an.instanceof(EventEmitter);
    });

    it('should allow the retrieval of the asset factory', function() {
      expect(asset.getFactory()).to.equal(fn);
    });

  });

  describe('creation of a non-injectable module asset', function() {
    var modulePath = require.resolve('../fixtures/test-module-a');
    var asset = new Asset('module', modulePath, {
      module: true,
      injectable: false
    });

    it('should return a function asset', function() {
      expect(asset.isFunction()).to.be.true;
    });

    it('should return a non-injectable asset', function() {
      expect(asset.isInjectable()).to.be.false;
    });

    it('should return a module asset', function () {
      expect(asset.isModule()).to.be.true;
    });

    it('should return a resolved asset', function() {
      expect(asset.isResolved()).to.be.true;
    });

    it('should allow the retrival of the asset value', function() {
      expect(asset.getValue()).to.equal(require('../fixtures/test-module-a'));
    });

  });

  describe('creation of an injectable module asset', function() {
    var modulePath = require.resolve('../fixtures/test-module-a');
    var asset = new Asset('key', modulePath, {
      module: true,
      injectable: true
    });

    it('should return a function asset', function() {
      expect(asset.isFunction()).to.be.true;
    });

    it('should return an injectable asset', function() {
      expect(asset.isInjectable()).to.be.true;
    });

    it('should return a module asset', function() {
      expect(asset.isModule()).to.be.true;
    });

    it('shoud return a non-resolved asset', function() {
      expect(asset.isResolved()).to.be.false;
    });

    it('should not allow the retrieval of the asset value', function() {
      expect(asset.getValue()).to.be.null;
    });

    it('shoud allow the retrieval of the asset factory', function() {
      expect(asset.getFactory()).to.equal(require('../fixtures/test-module-a'));
    });

  });

  describe('creating of a module asset, yielding a constant asset', function() {

    var modulePath = require.resolve('../fixtures/test-module-d');
    var asset = new Asset('key', modulePath, {
      module: true,
      injectable: true
    });

    it('should return a constant Asset', function() {
      expect(asset.isConstant()).to.be.true;
    });

    it('should return an non-injectable Asset', function() {
      expect(asset.isInjectable()).to.be.false;
    });

    it('should return a module Asset', function() {
      expect(asset.isModule()).to.be.true;
    });

    it('shoud return a resolved Asset', function() {
      expect(asset.isResolved()).to.be.true;
    });

    it('should allow the retrieval of the Asset value', function() {
      expect(asset.getValue())
        .to.deep.equal(require('../fixtures/test-module-d'));
    });

    it('shoud not have a factory', function() {
      expect(asset.getFactory()).to.be.null;
    });

  });

  describe('asset resolution', function() {
    var fn = function (a, b) {
      return a + b;
    };
    var value = 'resolved value';
    var asset = new Asset('key', fn, { injectable: true });
    asset.resolveTo(value);

    it('should set asset value', function() {
      expect(asset.getValue()).to.equal(value);
    });

    it('should set asset as resolved', function() {
      expect(asset.isResolved()).to.be.true;
    });

  });

  describe('creation with invalid arguments', function() {
    var asset;

    it('should throw an error, when missing arguments', function() {
      expect(function invalidArguments() {
        asset = new Asset();
      }).to.throw(errors.InvalidArguments);
      expect(asset).to.be.undefined;
    });

    it('should throw an error, when missing asset argument', function() {
      expect(function invalidArguments() {
        asset = new Asset('name');
      }).to.throw(errors.InvalidArguments);
      expect(asset).to.be.undefined;
    });

    it('should throw an error, when id argument is not a string', function() {
      expect(function mustBeString() {
        asset = new Asset(1234, 'value');
      }).to.throw(errors.MustBeString);
      expect(asset).to.be.undefined;
    });

  });

});
