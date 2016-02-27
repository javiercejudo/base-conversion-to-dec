/*jshint node:true */

'use strict';

var posNotation = require('positional-notation');

var R = require('./R');

module.exports = R.curryN(4, function(big, base, val, index) {
  return posNotation.raw(big, base, [-index - 1, val]);
});
