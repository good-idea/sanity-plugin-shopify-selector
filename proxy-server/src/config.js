// @flow

const { resolve } = require('path')
const result = require('dotenv').config({ path: resolve(__dirname, '.env') })

module.exports = result.parsed
