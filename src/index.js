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
  return R.pipe( // ①00.0① base 3.145
    U.toString, // '①00.0①'
    U.splitByDot, // [ '①00', '0①' ]
    R.adjust(R.reverse, 0), // [ '00①', '0①' ]
    R.adjust(toDecimalAlg(posNotation.mapper, big, symbols, base), 0), // [ big('9.891025'), '0①' ]
    R.adjust(toDecimalAlg(fracMapper, big, symbols, base), 1), // [ big('9.891025'), big('0.10110175639026288') ]
    U.sum(big), // big('9.992126756390263')
    U.toString, // '9.992126756390263'
    U.splitByDot, // [ '9', '992126756390263' ]
    R.map(translate(defaultSymbols, symbols)), // [ '9', '992①26756390263' ]
    U.joinWithDot // '9.992①26756390263'
  )(n);
});

var toDecimal = toDecimalRaw(defaultBig, defaultSymbols);

toDecimal.big = toDecimalRaw(R.__, defaultSymbols);
toDecimal.symbols = toDecimalRaw(defaultBig);
toDecimal.raw = toDecimalRaw;

toDecimal.defaultSymbols = defaultSymbols;
toDecimal.defaultBig = defaultBig;
toDecimal.__ = R.__;

module.exports = toDecimal;
