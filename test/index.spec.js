'use strict';

var chai = require('chai');
var expect = chai.expect;

var Modular = require('../');

describe('Modular entry point', function() {

  it('should return a reference to Modular', function() {
    var container = new Modular();

    expect(Modular).to.be.a('function');
    expect(container).to.be.an.instanceof(Modular);
  });

});
