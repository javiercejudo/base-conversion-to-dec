# base-conversion-to-dec

[![Build Status](https://travis-ci.org/javiercejudo/base-conversion-to-dec.svg)](https://travis-ci.org/javiercejudo/base-conversion-to-dec)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/base-conversion-to-dec/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/base-conversion-to-dec?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/base-conversion-to-dec/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/base-conversion-to-dec)

Auto-curried converter from any base with arbitrary precision support and customisable symbols.

For the opposite behaviour, see [base-conversion-from-dec](https://github.com/javiercejudo/base-conversion-from-dec).
For any to any base conversions, see [base-conversion](https://github.com/javiercejudo/base-conversion).

## Install

    npm i base-conversion-to-dec

## Basic usage

```js
var bc = require('base-conversion-to-dec');
var hexToBin = bc(16, 2);

hexToBin('A'); //=> '1010'
hexToBin('1E'); //=> '11110'
```

See [spec](test/spec.js).

## Custom symbols

For any bases above 62, custom symbols are required.
See [tests](test/bigint-base-converter.js) for working examples.

```js
var bc = require('base-conversion-from-dec');

bc.symbols('⓿①②③④⑤⑥⑦⑧⑨ⒶⒷ', 12, '⑥①'); //=> '⑦③'
```

## Arbitrary precision

```js
var bc = require('base-conversion-to-dec');
var Big = require('arbitrary-precision')(require('bigjs-adapter'));
var toBigFactory = require('to-decimal-arbitrary-precision');

var d = toBigFactory(Big);

// avoid large numbers to go into exponential notation (adapter dependent)
Big.Impl.E_POS = 50;

bc.big(d, 9, '802531310452364303450750087576673257456135727727');
//=> '5678364565345634563456346757364563534534645745'
```

## Full raw version

```js
var bc = require('base-conversion-to-dec');
var Big = require('arbitrary-precision')(require('bigjs-adapter'));
var toBigFactory = require('to-decimal-arbitrary-precision');

var d = toBigFactory(Big);

// avoid large numbers to go into exponential notation (adapter dependent)
Big.Impl.E_POS = 50;

bc.raw(d, '01234#6789', 9, '802#313104#23643034#07#0087#766732#74#613#727727');
//=> '#678364#6#34#634#634#63467#7364#63#34#3464#74#'
```

## Defaults

The default symbols and big implementation are exposed as follows:

```js
bc.defaultSymbols; //=> '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
bc.defaultB; //=> default arbitrary precision implementation (plus, times & pow)
```
