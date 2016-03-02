/*jshint node:true */

'use strict';

var R = require('./R');

var add = R.invoker(1, 'plus');

module.exports = Object.freeze({
  add: add,

  indexOfSymbol: R.memoize(function(symbols) {
    return R.memoize(R.indexOf(R.__, symbols));
  }),

  splitByDot: R.split('.'),

  sum: function(big) {
    return R.reduce(add, big('0'));
  },

  toString: R.invoker(0, 'toString')
});
