const express = require('express');
const Sale = require('../models/sale')
const Car = require('../models/car')
const User = require('../models/user')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const mongoose = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', [auth, admin], async (req, res) => {
    const sales = await Sale.find();
    res.send(sales)
});

router.post('/', [
    check('userId').isMongoId(),
    check('carId').isMongoId(),
    auth
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({message: error.msg, code: error.param});
    }

    const user = await User.findById(req.body.userId);
    if (!user) {
        send404(res, 'Not user found', req.body.userId);
    }

    const car = await Car.findById(req.body.carId);
    if (!car) {
        send404(res, 'Not car found', req.body.carId);
    } else if (car.sold === true) {
        send400(res, 'Car already sold', req.body.carId);
    }

    const sale = new Sale({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        car: {
            _id : car.id,
            model: car.model
        },
        price : req.body.price
    })
    
    mongoose.startSession()
    .then(_session => session = _session)
    .then(() => session.startTransaction())
    .then(() => result = sale.save())
    .then(() => {
        user.isCustomer = true; 
        user.save();
    })
    .then(() => {
        car.sold = true;
        car.price = sale.price;
        car.save();
    })
    .then(() => {
        session.commitTransaction();
        session.endSession();
        res.status(201).send(result)
    })
    .catch(e => {
        session.abortTransaction();
        session.endSession();
        send500(res, 'Server error', e.message)
    })
    

    

    
});

router.get('/:id', async (req, res) => {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
        send404(res, 'Not sale found', req.params.id);
    } else {
        res.send(sale)
    }
});

router.delete('/:id', async (req, res) => {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) {
        send404(res, 'Not sale found', req.params.id);
    } else {
        res.status(204).send()
    }
});
   
const send404 = (res, msg, code) => {
    const body = {message: msg, code: code}
    res.status(404).send(body)
}

const send400 = (res, msg, code) => {
    const body = {message: msg, code: code}
    res.status(400).send(body)
}

const send500 = (res, msg, code) => {
    const body = {message: msg, code: code}
    res.status(500).send(body)
}

module.exports = router;