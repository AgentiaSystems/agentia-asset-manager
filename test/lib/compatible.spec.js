'use strict';

var path = require('path');

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var AssetManager = require('../../');
var errors = require('../../lib/errors');

describe('AssetManager() compatibility methods ', function() {

  describe('.get()', function() {

    before(function() {
      this.id = 'name';

      this.am = new AssetManager();
      sinon.stub(this.am, 'resolve');
      this.am.register(this.id, 'value');
      this.am.get(this.id);
    });

    after(function() {
      this.am.resolve.restore();
      this.am = null;
    });

    it('should call .resolve() once', function() {
      expect(this.am.resolve).to.be.have.been.calledOnce;
    });

    it('should call .resolve() with module id', function() {
      expect(this.am.resolve)
        .to.be.have.been.calledWith(this.id);
    });

    it('should throw an error, when missing arguments', function() {
      expect(this.am.get).to.throw(errors.InvalidArguments);
    });

  });

  describe('.load()', function() {

    describe('loading a module', function() {

      before(function() {
        this.id = require.resolve('../fixtures/test-module-a');
        this.am = new AssetManager();
        sinon.stub(this.am, 'registerModule');
        this.am.load(this.id);
      });

      after(function() {
        this.am.registerModule.restore();
        this.am = null;
      });

      it('should call .registerModule() once', function() {
        expect(this.am.registerModule).to.be.have.been.calledOnce;
      });

      it('should call .registerModule() with module id', function() {
        expect(this.am.registerModule)
          .to.be.have.been.calledWithExactly(this.id, true);
      });

    });

    describe('loading a folder', function() {

      before(function() {
        this.id = path.join(__dirname, '../fixtures');
        this.am = new AssetManager();
        sinon.stub(this.am, 'registerFiles');
        this.am.load(this.id);
      });

      after(function() {
        this.am.registerFiles.restore();
        this.am = null;
      });

      it('should call .registerFolder() once', function() {
        expect(this.am.registerFiles).to.be.have.been.calledOnce;
      });

      it('should call .registerFolder() with module id', function() {
        expect(this.am.registerFiles)
          .to.be.have.been.calledWithExactly(path.join(this.id, '*.js'), true);
      });

    });

    describe('calling .load() with invalid arguments', function() {

      beforeEach(function() {
        this.am = new AssetManager();
      });

      afterEach(function() {
        this.am = null;
      });

      it('should throw an error, when missing arguments', function() {
        expect(function() {
          this.am.load();
        }.bind(this)).to.throw(errors.InvalidArguments);
      });

      it('should throw an error, when id argument is not a string', function() {
        expect(function() {
          this.am.load(123);
        }.bind(this)).to.throw(errors.MustBeString);
      });

    });

  });

});
