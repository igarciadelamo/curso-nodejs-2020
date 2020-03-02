function interceptor_date(req, res, next) {
    console.log('Intercepting request ', new Date);
    next();
}

module.exports = interceptor_date;