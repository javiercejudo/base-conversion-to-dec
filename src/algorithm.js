/*jshint node:true */

'use strict';

var toBigFactory = require('to-decimal-arbitrary-precision');

var R = require('./R');
var U = require('./U');

var toDecimalRaw = R.curryN(4, function(mapper, big, base, n) {
  return R.pipe(
    R.addIndex(R.map)(mapper(big, base)),
    U.sum(big)
  )(n);
});

module.exports = toDecimalRaw;
