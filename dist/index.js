
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./use-grindery-login.cjs.production.min.js')
} else {
  module.exports = require('./use-grindery-login.cjs.development.js')
}
