const https = require('https')

module.exports = function fetch(url, options = {}) {
    if (!options.headers) options.headers = {};
    if (options.json) {
        options.headers['content-type'] = 'application/json';
        options.postData = JSON.stringify(options.json);
    };
    return new Promise(resolve => {
        const req = https.request(url, options, res => {
            const chunks = [];
            res.on('data', d => chunks.push(d));
            res.on('end', () => {
                const str = Buffer.concat(chunks).toString();
                resolve(res.headers['content-type']?.includes('application/json') ? JSON.parse(str) : str);
            })
        });
        if (options.postData) req.write(options.postData);
        req.end();
    })
};