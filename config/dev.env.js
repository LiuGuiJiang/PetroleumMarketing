'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //本地调试
  // API_ROOT: '"http://127.0.0.1:9002"'
  API_ROOT: '"http://47.103.153.149:9002"'
})
