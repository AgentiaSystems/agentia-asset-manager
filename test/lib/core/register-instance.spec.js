'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../../../');
var errors = require('../../../lib/errors');

describe('AssetManager.registerInstance()', function() {

  describe('registering a constant dependency (string)', function() {

    before(function() {
      this.am = new AssetManager();
      this.id = 'id';
      this.data = 'data';
      this.am.registerInstance(this.id, this.data);
    });

    after(function() {
      this.am = null;
    });

    it('should register the dependency', function() {
      expect(this.am.isRegistered(this.id)).to.be.true;
    });

    it('should register as a constant dependency', function() {
      expect(this.am.isInstance(this.id)).to.be.true;
    });

    it('should allow resolution of constant dependency', function() {
      expect(this.am.resolve(this.id)).to.equal(this.data);
    });

  });

  describe('registering a constant dependency (object)', function() {

    before(function() {
      this.am = new AssetManager();
      this.id = 'id';
      this.data = { key: 'data' };
      this.am.registerInstance(this.id, this.data);
    });

    after(function() {
      this.am = null;
    });

    it('should register the dependency', function() {
      expect(this.am.isRegistered(this.id)).to.be.true;
    });

    it('should register as a constant dependency', function() {
      expect(this.am.isInstance(this.id)).to.be.true;
    });

    it('should allow resolution of constant dependency', function() {
      expect(this.am.resolve(this.id)).to.deep.equal(this.data);
    });

  });

  describe('registering a constant dependency (array)', function() {

    before(function() {
      this.am = new AssetManager();
      this.id = 'id';
      this.data = [ 'data1', 'data2', 'data3' ];
      this.am.registerInstance(this.id, this.data);
    });

    after(function() {
      this.am = null;
    });

    it('should register the dependency', function() {
      expect(this.am.isRegistered(this.id)).to.be.true;
    });

    it('should register as a constant dependency', function() {
      expect(this.am.isInstance(this.id)).to.be.true;
    });

    it('should allow resolution of constant dependency', function() {
      expect(this.am.resolve(this.id)).to.deep.equal(this.data);
    });

  });

  describe('calling .registerInstance() with invalid arguments', function() {

    beforeEach(function() {
      this.am = new AssetManager();
    });

    afterEach(function() {
      this.am = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function () {
        this.am.registerInstance();
      }.bind(this)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when called one argument', function() {
      expect(function() {
        this.am.registerInstance('id');
      }.bind(this)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when id argument not a string', function() {
      expect(function() {
        this.am.registerInstance(123, 'id');
      }.bind(this)).to.throw(errors.MustBeString);
    });

  });

});
