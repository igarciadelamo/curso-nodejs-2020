const express = require('express');
const Car = require('../models/car')
const {Company} = require('../models/company')
const router = express.Router();
const { check, validationResult } = require('express-validator');


router.get('/', async (req, res) => {
    const cars = await Car.find();
    res.send(cars)
});

router.post('/', [
    check('year').isNumeric(),
    check('manufacturerId').isMongoId(),
    check('model').isLength({min: 2}),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({message: error.msg, code: error.param});
    }

    const company = await Company.findById(req.body.manufacturerId);
    if (!company) {
        send404(res, 'Not company found', req.body.manufacturerId);
    }

    const car = new Car({
        model: req.body.model,
        manufacturer: company, 
        year: req.body.year,
        price: req.body.price,
        sold : req.body.sold,
        extras: req.body.extras
    })
    
    const result = await car.save()
    res.status(201).send(car)
});

router.put('/:id', [
    check('year').isNumeric(),
    check('manufacturerId').isMongoId(),
    check('model').isLength({min: 2}),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({message: error.msg, code: error.param});
    }

    const company = await Company.findById(req.body.manufacturerId);
    if (!company) {
        send404(res, 'Not company found', req.body.manufacturerId);
    }

    const car = await Car.findByIdAndUpdate(req.params.id, {
        model: req.body.model,
        manufacturer: company, 
        year: req.body.year,
        price: req.body.price,
        sold : req.body.sold || false,
        extras: req.body.extras || []
    }, { new : true});
    if (!car) {
        send404(res, 'Not model found', req.params.id);
    } else {
        res.status(200).send(car)
    }    
});

router.get('/:id', async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        send404(res, 'Not model found', req.params.id);
    } else {
        res.send(car)
    }
});

router.delete('/:id', async (req, res) => {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
        send404(res, 'Not model found', req.params.id);
    } else {
        res.status(204).send()
    }
});
   
const send404 = (res, msg, code) => {
    const body = {message: msg, code: code}
    res.status(404).send(body)
}

module.exports = router;