/*jshint node:true */

'use strict';

var R = require('./R');
var U = require('./U');

module.exports = R.memoize(function(defaultSymbols, symbols) {
  return R.identical(symbols, defaultSymbols) ?
    R.identity :
    R.pipe(
      R.map(U.nthSymbol(symbols)),
      U.joinWithoutSep,
      U.toString
    );
});
