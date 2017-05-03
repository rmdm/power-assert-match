'use strict'

import assert from 'assert-match'
import empower from 'empower'
import formatter from 'power-assert-formatter'

const empoweredAssert = empower(assert, formatter(), {
    modifyMessageOnRethrow: true,
    saveContextOnRethrow: true,
})

export default empoweredAssert
