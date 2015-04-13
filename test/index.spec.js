'use strict';

var chai = require('chai');
var expect = chai.expect;

var AssetManager = require('../');

describe('AssetManager entry point', function() {

  it('should return a reference to AssetManager', function() {
    var container = new AssetManager();

    expect(AssetManager).to.be.a('function');
    expect(container).to.be.an.instanceof(AssetManager);
  });

});
