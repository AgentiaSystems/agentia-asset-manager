'use strict';

var chai = require('chai');
var expect = chai.expect;
var path = require('path');

var AssetManager = require('../../');
var errors = require('../../lib/errors');

describe('AssetManager.registerFolder()', function() {

  describe('registering a folder (with injection disabled)', function() {
    var folder = path.resolve(__dirname, '../fixtures');
    var modular = new AssetManager();
    modular.registerFolder(folder);

    it('should register all the assets', function() {
      expect(modular.isRegistered('testModuleA')).to.be.true;
      expect(modular.isRegistered('testModuleB')).to.be.true;
      expect(modular.isRegistered('testModuleC')).to.be.true;
      expect(modular.isRegistered('testModuleD')).to.be.true;
    });

    it('should store all registered assets', function() {
      expect(modular.resolve('testModuleA'))
        .to.equal(require('../fixtures/test-module-a'));
      expect(modular.resolve('testModuleB'))
        .to.equal(require('../fixtures/test-module-b'));
      expect(modular.resolve('testModuleC'))
        .to.equal(require('../fixtures/test-module-c'));
      expect(modular.resolve('testModuleD'))
        .to.deep.equal(require('../fixtures/test-module-d'));
    });

  });

  describe('registering a folder (with injection enabled)', function() {
    var folder = path.resolve(__dirname, '../fixtures');
    var modular = new AssetManager();
    modular.registerConstant('a', 99);
    modular.registerConstant('b', 1);
    modular.registerFolder(folder, true);

    it('should register all the assets', function() {
      expect(modular.isRegistered('testModuleA')).to.be.true;
      expect(modular.isRegistered('testModuleB')).to.be.true;
      expect(modular.isRegistered('testModuleC')).to.be.true;
      expect(modular.isRegistered('testModuleD')).to.be.true;
    });

    it('should store all registered assets', function() {
      expect(modular.resolve('testModuleA')).to.equal(100);
      expect(modular.resolve('testModuleB')).to.equal(100);
      expect(modular.resolve('testModuleC')).to.equal('this is test-module-a');
      expect(modular.resolve('testModuleD'))
        .to.deep.equal(require('../fixtures/test-module-d'));
    });

  });

  describe('calling .registerFolder() with invalid arguments', function() {
    var modular;

    beforeEach(function() {
      modular = new AssetManager();
    });

    afterEach(function() {
      modular = null;
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        modular.registerFolder();
      }).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when called with no arguments', function() {
      expect(function() {
        modular.registerFolder(123);
      }).to.throw(errors.MustBeString);
    });

    it('should throw an error, when called with non-existing path', function() {
      var folder = path.join(__dirname, './path/not/found');
      expect(function() {
        modular.registerFolder(folder);
      }).to.throw(Error, /no such file or directory/);
    });

    it('should throw an error, when called with non-directory path', function() {
      var folder = path.join(__dirname, '../fixtures/test-module-a.js');
      expect(function() {
        modular.registerFolder(folder);
      }).to.throw(errors.MustBeDirectory);
    });

  });

});
