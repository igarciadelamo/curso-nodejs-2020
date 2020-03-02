const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = express.Router();
const { check, validationResult } = require('express-validator');


router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users)
});

router.post('/', [
    check('email').isEmail(),
    check('name').isLength({min: 2}),
    check('password').isLength({min: 2})
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({message: error.msg, code: error.param});
    }

    let user = await User.findOne({email: req.body.email})
    if (user) {
        return res.status(409).json({message: 'User already exists', code: req.body.email});
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    user = new User({
        email: req.body.email,
        name: req.body.name, 
        password: hash,
        isCustomer: false
    })
    
    const result = await user.save()

    const token = user.generateToken()

    res.status(201).header('Authorization',token).send({
        _id: user.id,
        email: user.email,
        name: user.name
    })
});

router.put('/:id', [
    check('email').isEmail(),
    check('name').isLength({min: 2}),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({message: error.msg, code: error.param});
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        name: req.body.name
    }, { new : true});
    if (!user) {
        send404(res, 'Not user found', req.params.id);
    } else {
        res.status(200).send(user)
    }    
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        send404(res, 'Not user found', req.params.id);
    } else {
        res.send(user)
    }
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        send404(res, 'Not user found', req.params.id);
    } else {
        res.status(204).send()
    }
});
   
const send404 = (res, msg, code) => {
    const body = {message: msg, code: code}
    res.status(404).send(body)
}



module.exports = router;