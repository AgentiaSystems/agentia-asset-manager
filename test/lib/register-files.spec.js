'use strict';

var chai = require('chai');
var expect = chai.expect;
var path = require('path');

var AssetManager = require('../../');
var errors = require('../../lib/errors');

describe('AssetManager.registerFiles()', function() {

  describe('registering a folder (with injection disabled)', function() {

    before(function() {
      this.pattern = path.join(__dirname, '../fixtures/*.js');
      this.am = new AssetManager();
      this.am.registerFiles(this.pattern);
    });

    after(function() {
      this.am = null;
    });

    it('should register all the assets', function() {
      expect(this.am.isRegistered('testModuleA')).to.be.true;
      expect(this.am.isRegistered('testModuleB')).to.be.true;
      expect(this.am.isRegistered('testModuleC')).to.be.true;
      expect(this.am.isRegistered('testModuleD')).to.be.true;
    });

    it('should store all registered assets', function() {
      expect(this.am.resolve('testModuleA'))
        .to.equal(require('../fixtures/test-module-a'));
      expect(this.am.resolve('testModuleB'))
        .to.equal(require('../fixtures/test-module-b'));
      expect(this.am.resolve('testModuleC'))
        .to.equal(require('../fixtures/test-module-c'));
      expect(this.am.resolve('testModuleD'))
        .to.deep.equal(require('../fixtures/test-module-d'));
    });

  });

  describe('registering a folder (with injection enabled)', function() {

    before(function() {
      this.pattern = path.join(__dirname, '../fixtures/*.js');
      this.am = new AssetManager();
      this.am.registerInstance('a', 99);
      this.am.registerInstance('b', 1);
      this.am.registerFiles(this.pattern, true);
    });

    after(function() {
      this.am = null;
    });

    it('should register all the assets', function() {
      expect(this.am.isRegistered('testModuleA')).to.be.true;
      expect(this.am.isRegistered('testModuleB')).to.be.true;
      expect(this.am.isRegistered('testModuleC')).to.be.true;
      expect(this.am.isRegistered('testModuleD')).to.be.true;
    });

    it('should store all registered assets', function() {
      expect(this.am.resolve('testModuleA')).to.equal(100);
      expect(this.am.resolve('testModuleB')).to.equal(100);
      expect(this.am.resolve('testModuleC')).to.equal('this is test-module-a');
      expect(this.am.resolve('testModuleD'))
        .to.deep.equal(require('../fixtures/test-module-d'));
    });

  });

  describe('calling .registerFiles() with invalid arguments', function() {

    beforeEach(function() {
      this.am = new AssetManager();
    });

    afterEach(function() {
      this.am = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        this.am.registerFiles();
      }.bind(this)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        this.am.registerFiles(123);
      }.bind(this)).to.throw(errors.MustBeString);
    });

  });

});
