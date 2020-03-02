const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({message: 'Authentication required'})
    }

    try{
        const payload = jwt.verify(token, process.env.JWT_PASSWORD_CAR_API)
        req.user = payload
        next();

    }catch(e) {
        return res.status(401).send({message: 'Authentication invalid'})
    }
}

module.exports = auth;