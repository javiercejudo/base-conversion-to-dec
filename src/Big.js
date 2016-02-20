/*jshint node:true */

'use strict';

var coreArbitraryPrecision = require('core-arbitrary-precision');
var floatingAdapter = require('floating-adapter');
var pipe = require('ramda/src/pipe');

module.exports = pipe(
  require('plus-arbitrary-precision'),
  require('times-arbitrary-precision'),
  require('pow-arbitrary-precision')
)(coreArbitraryPrecision(floatingAdapter));
