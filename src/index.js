/*jshint node:true */

'use strict';

var posNotation = require('positional-notation');
var toBigFactory = require('to-decimal-arbitrary-precision');

var R = require('./R');
var U = require('./U');
var toDecimalAlg = require('./algorithm');
var fracMapper = require('./fracMapper');
var translate = require('./translate');

var defaultBig = toBigFactory(require('./Big'));
var defaultSymbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

var toDecimalRaw = R.curryN(4, function(big, symbols, base, n) {
  return R.pipe(
    U.toString,
    U.splitByDot,
    R.adjust(R.reverse, 0),
    R.adjust(toDecimalAlg(posNotation.mapper, big, symbols, base), 0),
    R.adjust(toDecimalAlg(fracMapper, big, symbols, base), 1),
    U.sum(big),
    U.toString,
    translate(defaultSymbols, symbols)
  )(n);
});

var toDecimal = toDecimalRaw(defaultBig, defaultSymbols);

toDecimal.big = toDecimalRaw(R.__, defaultSymbols);
toDecimal.symbols = toDecimalRaw(defaultBig);
toDecimal.raw = toDecimalRaw;

toDecimal.defaultSymbols = defaultSymbols;
toDecimal.defaultBig = defaultBig;

module.exports = toDecimal;
