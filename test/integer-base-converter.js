/*jshint node:true, mocha:true */

'use strict';

require('should');

var other = require('integer-base-converter');
var fn = require('../src/');

describe('integer-base-converter', function() {
  it('yields the same results from base 60', function() {
    var b60To10 = fn(60);

    '1000'
      .should.be.exactly(other.convert('Ge', 60, 10).toString())
      .and.exactly(b60To10('Ge'));

    '1001'
      .should.be.exactly(other.convert('Gf', 60, 10).toString())
      .and.exactly(b60To10('Gf'));
  });
});
