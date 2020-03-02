function intercept_headers(req, res, next) {
    console.log('Intercepting request ', req.headers);
    next();
}

module.exports = intercept_headers;