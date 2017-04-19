'use strict'

import assert from 'assert-match'
import empower from 'empower'
import formatter from 'power-assert-formatter'

const empowerOptions = {
    modifyMessageOnRethrow: true,
    saveContextOnRethrow: true
}

function customize (customOptions) {
    const options = customOptions || {}
    const empoweredAssert = empower(
        assert,
        formatter(options.output),
        Object.assign({}, empowerOptions, options.assertion)
    )
    empoweredAssert.customize = customize
    return empoweredAssert
}

const defaultAssert = customize()

export default defaultAssert
