'use strict'

import assert from '../src'
const {
    strict,
    loose,
    any,
    not,
    type,
    primitive,
    arrayOf,
    every,
    some,
    regex,
    custom,
    gt,
    gte,
    lt,
    lte,
    contains
} = assert.matchers

describe('power-assert-match tests', function () {

    it('README Short example', function () {

        assertThrowsWithMessage(function () {
            const nums = [ 1, 2, 'x' ]
            const expectedType = 'number'
            assert.deepEqual({ nums: nums }, { nums: arrayOf(type(expectedType)) })
        }, [
            '  assert.deepEqual({ nums: nums }, { nums: arrayOf(type(expectedType)) })',
            '                   |       |       |       |       |    |                ',
            '                   |       |       |       |       |    "number"         ',
            '                   |       |       |       |       TypeMatcher{expected:"number"}',
            '                   |       |       |       ArrayOfMatcher{expected:#TypeMatcher#}',
            '                   |       |       Object{nums:#ArrayOfMatcher#}         ',
            '                   |       [1,2,"x"]                                     ',
            '                   Object{nums:#Array#}                                  ',
        ])
    })

    it('Usage example', function () {
        assertThrowsWithMessage(function () {
            const actual = { a: 1, b: 2 }
            const expected = { a: 10 }
            assert.deepEqual(actual, loose(expected))
        }, [
            '  assert.deepEqual(actual, loose(expected))',
            '                   |       |     |         ',
            '                   |       |     Object{a:10}',
            '                   |       LooseMatcher{expected:#Object#}',
            '                   Object{a:1,b:2}         ',
        ])
    })

    it('README More examples', function () {

        assertThrowsWithMessage(function () {
            const number = '555f'
            const numRegex = /^\d+$/
            assert.deepEqual(number, regex(numRegex))
        }, [
            '  assert.deepEqual(number, regex(numRegex))',
            '                   |       |     |         ',
            '                   |       |     /^\\d+$/   ',
            '                   "555f"  RegexMatcher{expected:/^\\d+$/}',
        ])

        assertThrowsWithMessage(function () {
            const a = 15, b = 5, c = 10
            assert.deepEqual({ val: a }, { val: every([ gt(b), lt(c) ]) })
        }, [
            '  assert.deepEqual({ val: a }, { val: every([gt(b), lt(c)]) })',
            '                   |      |    |      |     ||  |   |  |      ',
            '                   |      |    |      |     ||  |   |  10     ',
            '                   |      |    |      |     ||  5   LtMatcher{expected:10}',
            '                   |      |    |      |     |GtMatcher{expected:5}',
            '                   |      |    |      |     [#GtMatcher#,#LtMatcher#]',
            '                   |      |    |      EveryMatcher{expected:#Array#}',
            '                   |      15   Object{val:#EveryMatcher#}     ',
            '                   Object{val:15}                             ',
        ])

        assertThrowsWithMessage(function () {
            const actual = { a: 1, b: 2, c: 3 }
            const expected = { b: 5 }
            assert.deepEqual(actual, loose(expected))
        }, [
            '  assert.deepEqual(actual, loose(expected))',
            '                   |       |     |         ',
            '                   |       |     Object{b:5}',
            '                   |       LooseMatcher{expected:#Object#}',
            '                   Object{a:1,b:2,c:3}     ',
        ])

        assertThrowsWithMessage(function () {
            const array = [ 1, 2, 3 ]
            const val = 5
            assert.deepEqual(array, contains(val))
        }, [
            '  assert.deepEqual(array, contains(val))',
            '                   |      |        |    ',
            '                   |      |        5    ',
            '                   |      ContainsMatcher{expected:5}',
            '                   [1,2,3]              ',
        ])

        assertThrowsWithMessage(function () {
            const obj = {}
            const prim = '[object Arguments]'
            assert.deepEqual(obj, primitive(prim))
        }, [
            '  assert.deepEqual(obj, primitive(prim))',
            '                   |    |         |     ',
            '                   |    |         "[object Arguments]"',
            '                   |    PrimitiveMatcher{expected:"[object Arguments]"}',
            '                   Object{}             ',
        ])

        assertThrowsWithMessage(function () {
            const val = 5
            assert.deepEqual(val, not(val))
        }, [
            '  assert.deepEqual(val, not(val))',
            '                   |    |   |    ',
            '                   |    |   5    ',
            '                   5    NotMatcher{expected:5}',
        ])

        assertThrowsWithMessage(function () {
            const actual = { a: 1, b: 2, c: 3 }
            const expected = { a: 1, b: 3, c: 5 }
            assert.deepEqual(actual, expected)
        }, [
            '  assert.deepEqual(actual, expected)',
            '                   |       |        ',
            '                   |       Object{a:1,b:3,c:5}',
            '                   Object{a:1,b:2,c:3}',
        ])
    })

})

function assertThrowsWithMessage (thrower, message) {
    try {
        thrower()
        throw new Error('Expected to throw')
    } catch (e) {
        const msg = e.message.split('\n').slice(2, -1)
        assert.deepEqual(msg, message)
    }
}
