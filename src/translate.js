/*jshint node:true */

'use strict';

var tr = require('string-translate');

var R = require('./R');

module.exports = R.memoize(function(defaultSymbols, symbols) {
  return R.identical(defaultSymbols, symbols) ? R.identity : tr(defaultSymbols, symbols);
});
