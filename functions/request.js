const fetch = require('../functions/fetch')

module.exports = function request(url, options={}) {
    return fetch(url, options)
}