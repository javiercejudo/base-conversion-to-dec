/*jshint node:true */

'use strict';

var posNotation = require('positional-notation');
var toBigFactory = require('to-decimal-arbitrary-precision');

var R = require('./R');

var defaultB = toBigFactory(require('./Big'));
var defaultSymbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var joinWithoutSep = R.join('');
var splitWithoutSep = R.split('');
var toString = R.invoker(0, 'toString');
var add = R.invoker(1, 'plus');

var indexOfSymbol = R.memoize(function(symbols) {
  return R.memoize(R.indexOf(R.__, symbols));
});

var nthSymbol = R.memoize(function(symbols) {
  return R.memoize(R.nth(R.__, symbols));
});

var postprocess = R.memoize(function(symbols) {
  return R.identical(symbols, defaultSymbols) ?
    R.identity :
    R.pipe(
      R.map(nthSymbol(symbols)),
      joinWithoutSep,
      toString
    );
});

var toDecimalRaw = R.curryN(4, function(b, symbols, base, n) {
  return R.pipe(
    toString,
    R.reverse,
    R.map(indexOfSymbol(symbols)),
    R.addIndex(R.map)(posNotation.mapper(b, base)),
    R.reduce(add, b(0)),
    toString,
    postprocess(symbols)
  )(n);
});

var toDecimal = toDecimalRaw(defaultB, defaultSymbols);

toDecimal.big = toDecimalRaw(R.__, defaultSymbols);
toDecimal.symbols = toDecimalRaw(defaultB);
toDecimal.raw = toDecimalRaw;

toDecimal.defaultSymbols = defaultSymbols;
toDecimal.defaultB = defaultB;

module.exports = toDecimal;
