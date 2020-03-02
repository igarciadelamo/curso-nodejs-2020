const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/', [
    check('email').isEmail(),
    check('password').isLength({min: 2})
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({message: error.msg, code: error.param});
    }

    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(401).json({message: 'User or password incorrect', code: req.body.email});
    }

    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) {
        return res.status(401).json({message: 'User or password incorrect', code: req.body.email});
    }

    const token = user.generateToken()
    res.status(200).header('Authorization',token).send({
        _id: user.id,
        email: user.email,
        name: user.name
    })
});


module.exports = router;