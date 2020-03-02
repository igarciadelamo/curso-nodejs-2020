const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

var cars = [
    {id: 1, manufacturer: 'BMW', model: 'S1', year: 2013},
    {id: 2, manufacturer: 'BMW', model: 'X1', year: 2018},
    {id: 3, manufacturer: 'Audi', model: 'A3', year: 2017},
    {id: 4, manufacturer: 'Seat', model: 'Cordoba', year: 1999}    
]

router.get('/', (req, res) => {
    res.send(cars)
});

router.post('/', [
    check('year').isNumeric(),
    check('manufacturer').isLength({min: 3}),
    check('model').isLength({min: 2}),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({message: error.msg, code: error.param});
    }
    
    var carId = cars.length + 1;
    var car = {
        id: carId,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        year: req.body.year
    }
    cars.push(car)
    res.status(201).send(car)
});

router.put('/id/:id', [
    check('year').isNumeric(),
    check('manufacturer').isLength({min: 3}),
    check('model').isLength({min: 2}),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({message: error.msg, code: error.param});
    }

    const car = cars.find(t => t.id == req.params.id);
    if (!car) {
        send404(res, 'Not model found', req.params.id);
    } else {
        car.manufacturer = req.body.manufacturer
        car.model = req.body.model
        car.year = req.body.year
        res.status(200).send(car)
    }
    
    var carId = req.params.id;
    
});

router.get('/:manufacturer', (req, res) => {
    const list = cars.filter(t => t.manufacturer == req.params.manufacturer)
    if (list.length == 0) {
        send404(res, 'Not models found', req.params.manufacturer);
    } else {
        res.send(list)
    }
});

router.get('/id/:id', (req, res) => {
    const car = cars.find(t => t.id == req.params.id);
    if (!car) {
        send404(res, 'Not model found', req.params.id);
    } else {
        res.send(car)
    }
});

router.delete('/id/:id', (req, res) => {
    const car = cars.find(t => t.id == req.params.id);
    if (!car) {
        send404(res, 'Not model found', req.params.id);
    } else {
        const index = cars.indexOf(car)
        cars.splice(index, 1)
        res.status(204).send()
    }
});
   
const send404 = (res, msg, code) => {
    const body = {message: msg, code: code}
    res.status(404).send(body)
}

module.exports = router;