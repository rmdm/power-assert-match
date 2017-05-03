[![Build Status](https://travis-ci.org/rmdm/power-assert-match.svg?branch=master)](https://travis-ci.org/rmdm/power-assert-match)

power-assert-match
==================

[assert-match](https://github.com/rmdm/assert-match) empowered.

Short example
=============

```javascript
import assert from 'power-assert-match'
const { arrayOf, type } = assert.matchers

const nums = [ 1, 2, 'x' ]
const expectedType = 'number'

assert.deepEqual({ nums: nums }, { nums: arrayOf(type(expectedType)) })

//      AssertionError:   # test/power-assert-match.spec.js:30
//
//  assert.deepEqual({ nums: nums }, { nums: arrayOf(type(expectedType)) })
//                   |       |       |       |       |    |
//                   |       |       |       |       |    "number"
//                   |       |       |       |       TypeMatcher{expected:"number"}
//                   |       |       |       ArrayOfMatcher{expected:#TypeMatcher#}
//                   |       |       Object{nums:#ArrayOfMatcher#}
//                   |       [1,2,"x"]
//                   Object{nums:#Array#}
//
//      + expected - actual
//
//       {
//         "nums": [
//           1
//           2
//      -    "x"
//      +    {
//      +      "[typeof]": "number"
//      +    }
//         ]
//       }
```

Installation
============

```sh
    npm install power-assert-match
```

Usage
=====

Usage of `power-assert-match` is quite similar to that of
[`power-assert`](https://github.com/power-assert-js/power-assert):

1. require `power-assert-match`
```javascript
const assert = require('power-assert-match')
```
2. use it
``` javascript
const { loose } = assert.matchers

const actual = { a: 1, b: 2 }
const expected = { a: 10 }

assert.deepEqual(actual, loose(expected))
```
3. to get descriptive messages like one in the example above you need to
transform your code using one of `power-assert` [instrumentors](https://github.com/power-assert-js/power-assert#be-sure-to-transform-test-code):

 - [espower-loader](https://github.com/power-assert-js/espower-loader) (with [intelli-espower-loader](https://github.com/power-assert-js/intelli-espower-loader))
 - [babel-preset-power-assert](https://github.com/power-assert-js/babel-preset-power-assert)
 - [babel-plugin-espower](https://github.com/power-assert-js/babel-plugin-espower)
 - [espowerify](https://github.com/power-assert-js/espowerify)
 - [webpack-espower-loader](https://github.com/power-assert-js/webpack-espower-loader).
 - [espower-cli](https://github.com/power-assert-js/espower-cli)
 - [grunt-espower](https://github.com/power-assert-js/grunt-espower)
 - [gulp-espower](https://github.com/power-assert-js/gulp-espower)
 - [karma-espower-preprocessor](https://github.com/power-assert-js/karma-espower-preprocessor)
 - [espower-coffee](https://github.com/power-assert-js/espower-coffee)
 - [espower-typescript](https://github.com/power-assert-js/espower-typescript)
 - [espower-traceur](https://github.com/power-assert-js/espower-traceur)

**Note**, that unlike for `power-assert`, where `require('assert')` calls are
substituted by the instrumentors with `require('power-assert')`, to use
`power-assert-match` you need to require it directly.

After applying transform you get the following output:

```javascript
assert.deepEqual(actual, loose(expected))
                 |       |     |
                 |       |     Object{a:10}
                 |       LooseMatcher{expected:#Object#}
                 Object{a:1,b:2}
```


More output examples
====================

```javascript
assert.deepEqual(val, not(val))
                 |    |   |
                 |    |   5
                 5    NotMatcher{expected:5}


assert.deepEqual(number, regex(numRegex))
                 |       |     |
                 |       |     /^\d+$/
                 "555f"  RegexMatcher{expected:/^\d+$/}


assert.deepEqual({ val: a }, { val: every([gt(b), lt(c)]) })
                 |      |    |      |     ||  |   |  |
                 |      |    |      |     ||  |   |  10
                 |      |    |      |     ||  5   LtMatcher{expected:10}
                 |      |    |      |     |GtMatcher{expected:5}
                 |      |    |      |     [#GtMatcher#,#LtMatcher#]
                 |      |    |      EveryMatcher{expected:#Array#}
                 |      15   Object{val:#EveryMatcher#}
                 Object{val:15}


assert.deepEqual(actual, loose(expected))
                 |       |     |
                 |       |     Object{b:5}
                 |       LooseMatcher{expected:#Object#}
                 Object{a:1,b:2,c:3}


assert.deepEqual(array, contains(val))
                 |      |        |
                 |      |        5
                 |      ContainsMatcher{expected:5}
                 [1,2,3]


assert.deepEqual(obj, primitive(prim))
                 |    |         |
                 |    |         "[object Arguments]"
                 |    PrimitiveMatcher{expected:"[object Arguments]"}
                 Object{}


assert.deepEqual(actual, expected)
                 |       |
                 |       Object{a:1,b:3,c:5}
                 Object{a:1,b:2,c:3}
```

Related projects
================

- [assert-match](https://github.com/rmdm/assert-match)
