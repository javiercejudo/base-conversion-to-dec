/*jshint node:true, mocha:true */

'use strict';

require('should');

var other = require('base-converter');
var fn = require('../src/');

describe('base-converter', function() {
  it('yields the same results for base 4', function() {
    var b4ToDec = fn(4);

    '3'
      .should.be.exactly(other.genericToDec(3, 4).toString())
      .and.exactly(b4ToDec(3));

    '27'
      .should.be.exactly(other.genericToDec(123, 4).toString())
      .and.exactly(b4ToDec(123));

    '493'
      .should.be.exactly(other.genericToDec(13231, 4).toString())
      .and.exactly(b4ToDec(13231));
  });
});
