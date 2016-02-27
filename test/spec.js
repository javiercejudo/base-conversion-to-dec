/*jshint node:true, mocha:true */

'use strict';

require('should');

var Big = require('arbitrary-precision')(require('bigjs-adapter'));
var toBigFactory = require('to-decimal-arbitrary-precision');

var fn = require('../src/');

describe('base conversion', function() {
  it('should support base 62 to decimal', function() {
    var decTo62 = fn(62);

    decTo62('y').should.be.exactly('60');
    decTo62('11').should.be.exactly('63');
  });

  it('should support large base 9 to decimal', function() {
    var d = toBigFactory(Big);

    Big.Impl.E_POS = 50;

    fn.big(d, 9, '802531310452364303450750087576673257456135727727')
      .should.be.exactly('5678364565345634563456346757364563534534645745');
  });

  it('should support custom symbols', function() {
    fn.symbols('⓿①②③④⑤⑥⑦⑧⑨ⒶⒷ', 12, '⑦Ⓐ').should.be.exactly('⑨④');
  });

  it('should expose the raw converter', function() {
    var d = toBigFactory(Big);

    Big.Impl.E_POS = 50;

    fn.raw(d, '01234#6789', 9, '802#313104#23643034#07#0087#766732#74#613#727727')
      .should.be.exactly('#678364#6#34#634#634#63467#7364#63#34#3464#74#');
  });

  it('should supportnon-integer from binary', function() {
    fn.symbols('⓿①②③④⑤⑥⑦⑧⑨', 2, '①⓿⓿①.①⓿①')
      .should.be.exactly('⑨.⑥②⑤');
  });

  it('should support non-integer from base 60', function() {
    fn(60, '3.8ThQO')
      .should.be.exactly('3.14159');
  });

  it('should support non-integer from base 9', function() {
    fn(9, '11.08')
      .should.be.exactly('10.098765432098766');
  });

  it('should support non-integer from non-integer base 3.145', function() {
    fn(3.145, '100.01')
      .should.be.exactly('9.992126756390263');
  });
});
