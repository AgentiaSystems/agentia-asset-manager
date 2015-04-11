'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var Modular = require('../../');
var errors = require('../../lib/errors');

describe('Modular.remove()', function() {
  var modular;

  describe('removing a factory asset', function() {
    var id = 'id';
    var value = function() {};
    var context;

    before(function() {
      modular = new Modular();
      modular.registerFunction(id, value, true);
      context = modular._assets[id]._context;
      sinon.spy(context, 'emit');
      sinon.spy(context, 'removeAllListeners');
    });

    after(function() {
      context.emit.restore();
      context.removeAllListeners.restore();
      context = null;
      modular = null;
    });

    it('should no longer be registered', function() {
      modular.remove(id);
      expect(modular.isRegistered(id)).to.be.false;
    });

    it('should emit a "remove" event', function() {
      expect(context.emit).to.have.been.calledOnce;
      expect(context.emit).to.have.been.calledWithExactly('remove');
    });

    it('should remove all event listeners', function() {
      expect(context.removeAllListeners).to.have.been.calledOnce;
      expect(context.removeAllListeners).to.have.been.calledWithExactly('remove');
    });

  });

  describe('removing a non-factory asset', function() {
    var id = 'id';
    var value = 'value';

    before(function() {
      modular = new Modular();
      modular.registerConstant(id, value);
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
      modular = new Modular();
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
      modular = new Modular();
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
