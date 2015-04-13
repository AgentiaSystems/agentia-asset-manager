'use strict';

var path = require('path');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var AssetManager = require('../../');
var errors = require('../../lib/errors');

describe('AssetManager.get()', function() {
  var modular;
  var dependency = 'name';

  before(function() {
    modular = new AssetManager();
    sinon.stub(modular, 'resolve');
    modular.register(dependency, 'value');
    modular.get(dependency);
  });

  after(function() {
    modular.resolve.restore();
    modular = null;
  });

  it('should call .resolve() once', function() {
    expect(modular.resolve).to.be.have.been.calledOnce;
  });

  it('should call .resolve() with module id', function() {
    expect(modular.resolve)
      .to.be.have.been.calledWith(dependency);
  });

  it('should throw an error, when missing arguments', function() {
    expect(modular.get).to.throw(errors.InvalidArguments);
  });

});

describe('AssetManager.load()', function() {

  describe('loading a module', function() {
    var modular;
    var id = require.resolve('../fixtures/test-module-a');

    before(function() {
      modular = new AssetManager();
      sinon.stub(modular, 'registerModule');
      modular.load(id);
    });

    after(function() {
      modular.registerModule.restore();
      modular = null;
    });

    it('should call .registerModule() once', function() {
      expect(modular.registerModule).to.be.have.been.calledOnce;
    });

    it('should call .registerModule() with module id', function() {
      expect(modular.registerModule)
        .to.be.have.been.calledWithExactly(id, true);
    });

  });

  describe('loading a folder', function() {
    var modular;
    var id = path.resolve(path.dirname(module.id), '../fixtures');

    before(function() {
      modular = new AssetManager();
      sinon.stub(modular, 'registerFolder');
      modular.load(id);
    });

    after(function() {
      modular.registerFolder.restore();
      modular = null;
    });

    it('should call .registerFolder() once', function() {
      expect(modular.registerFolder).to.be.have.been.calledOnce;
    });

    it('should call .registerFolder() with module id', function() {
      expect(modular.registerFolder)
        .to.be.have.been.calledWithExactly(id, true);
    });

  });

  describe('calling .load() with invalid arguments', function() {
    var modular;

    beforeEach(function() {
      modular = new AssetManager();
    });

    afterEach(function() {
      modular = null;
    });

    it('should throw an error, when missing arguments', function() {
      expect(function() {
        modular.load();
      }).to.throw(errors.InvalidArguments);
    });

    it('should throw an error, when id argument is not a string', function() {
      expect(function() {
        modular.load(123);
      }).to.throw(errors.MustBeString);
    });

  });

});
