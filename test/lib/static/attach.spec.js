'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var AssetManager = require('../../../');
var errors = require('../../../lib/errors');

describe('AssetManager.attach()', function() {

  before(function() {
    sinon.stub(AssetManager, 'mixin');
  });

  after(function() {
    AssetManager.mixin.restore();
  });

  it('should attach AssetManager to an object\'s prototype', function() {
    var obj = {};
    AssetManager.attach(obj);
    expect(AssetManager.mixin).to.be.called.once;
    expect(AssetManager.mixin).to.have.been.calledWith(obj.prototype);
  });

  it('should throw an error, when called with no arguments', function() {
    expect(function() {
      AssetManager.attach();
    }).to.throw(errors.InvalidArguments);
  });

  it('should throw an error, when target not an object', function() {
    expect(function() {
      AssetManager.attach('id');
    }).to.throw(errors.MustBeObject);
  });

});
