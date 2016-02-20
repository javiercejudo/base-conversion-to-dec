/*jshint node:true, mocha:true */

'use strict';

require('should');

var Big = require('arbitrary-precision')(require('bigjs-adapter'));
var toBigFactory = require('to-decimal-arbitrary-precision');
var d = toBigFactory(Big);

Big.Impl.E_POS = 40;

var symbols85 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~';

var other = require('bigint-base-converter');
var fn = require('../src/');

describe('bigint-base-converter', function() {
  it('yields the same results from 85 to 10', function() {
    '21932261930451111902915077091070067066'
      .should.be.exactly(other('4)+k&C#VzJ4br>0wv%Yp', symbols85, '0123456789'))
      .and.exactly(fn.raw(d, symbols85, 85, '4)+k&C#VzJ4br>0wv%Yp'));
  });
});
