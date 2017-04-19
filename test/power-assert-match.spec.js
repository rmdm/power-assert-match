'use strict'

import assert from '../'
const { loose, arrayOf, type } = assert.matchers

describe('power-assert-match tests', function () {

    it('README Short example', function () {
        try {
            assert.deepEqual({
                str: 'abc',
                nums: [ 1, 2, 'x' ],
            }, {
                str: 'abc',
                nums: arrayOf(type('number')),
            })
        } catch (e) {
            const msg = e.message.split('\n').slice(2, -1)
            assert.deepEqual(msg, [
                '  assert.deepEqual({ str: \'abc\', nums: [1, 2, \'x\'] }, { str: \'abc\', nums: arrayOf(type(\'number\')) })',
                '                   |                   |              |                   |       |                 ',
                '                   |                   |              |                   |       TypeMatcher{expected:"number"}',
                '                   |                   |              |                   ArrayOfMatcher{expected:#TypeMatcher#}',
                '                   |                   [1,2,"x"]      Object{str:"abc",nums:#ArrayOfMatcher#}       ',
                '                   Object{str:"abc",nums:#Array#}                                                   ',
            ])
        }
    })

})
