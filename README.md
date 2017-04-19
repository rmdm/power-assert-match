[![Build Status](https://travis-ci.org/rmdm/power-assert-match.svg?branch=master)](https://travis-ci.org/rmdm/power-assert-match)

power-assert-match
==================

[assert-match](https://github.com/rmdm/assert-match) empowered.

Short example
=============

```javascript
import assert from 'power-assert-match'
const { arrayOf, type } = assert.matchers

assert.deepEqual({
    str: 'abc',
    nums: [ 1, 2, 'x' ],
}, {
    str: 'abc',
    nums: arrayOf(type('number')),
})

// AssertionError:   # test/power-assert-match.spec.js:9
//
//   assert.deepEqual({ str: 'abc', nums: [1, 2, 'x'] }, { str: 'abc', nums: arrayOf(type('number')) })
//                    |                   |              |                   |       |
//                    |                   |              |                   |       TypeMatcher{expected:"number"}
//                    |                   |              |                   ArrayOfMatcher{expected:#TypeMatcher#}
//                    |                   [1,2,"x"]      Object{str:"abc",nums:#ArrayOfMatcher#}
//                    Object{str:"abc",nums:#Array#}
//
//       + expected - actual
//
//        {
//          "nums": [
//            1
//            2
//       -    "x"
//       +    {
//       +      "[typeof]": "number"
//       +    }
//          ]
//          "str": "abc"
//        }
```
