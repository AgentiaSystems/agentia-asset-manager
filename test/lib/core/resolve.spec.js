'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var AssetManager = require('../../../');
var errors = require('../../../lib/errors');

describe('AssetManager.resolve()', function() {

  describe('calling .resolve() with invalid arguments', function() {

    before(function() {
      this.am = AssetManager.create();
      sinon.stub(this.am, 'resolveAsset');
      sinon.stub(this.am, 'invoke');
    });

    after(function() {
      this.am.resolveAsset.restore();
      this.am.invoke.restore();
      this.am = null;
    });

    afterEach(function() {
      this.am.resolveAsset.reset();
      this.am.invoke.reset();
    });

    it('should call .resolveAsset(), when "target" is string', function() {
      this.am.resolve('id');
      expect(this.am.resolveAsset).to.have.been.calledOnce;
      expect(this.am.resolveAsset).to.have.been.calledWith('id');
    });

    it('should call .invoke(), when "target" is function', function() {
      var fn = function() {};
      this.am.resolve(fn);
      expect(this.am.invoke).to.have.been.calledOnce;
      expect(this.am.invoke).to.have.been.calledWith(fn);
    });

    it('should call with empty object as override, when not passed', function() {
      this.am.resolve('id');
      expect(this.am.resolveAsset).to.have.been.calledOnce;
      expect(this.am.resolveAsset).to.have.been.calledWith('id', {});
    });

    it('should call with override, when passed', function() {
      var override = { a: 1 };
      this.am.resolve('id', override);
      expect(this.am.resolveAsset).to.have.been.calledOnce;
      expect(this.am.resolveAsset).to.have.been.calledWith('id', override);
    });

  });

  describe('calling .resolve() with invalid arguments', function() {

    beforeEach(function() {
      this.am = AssetManager.create();
    });

    afterEach(function() {
      this.am = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        this.am.resolve();
      }.bind(this)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when target not a string or a function', function() {
      expect(function() {
        this.am.resolve(123);
      }.bind(this)).to.throw(errors.MustBeStringOrFunction);
    });

  });

});
