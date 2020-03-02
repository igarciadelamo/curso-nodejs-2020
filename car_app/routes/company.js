const express = require('express');
const {Company} = require('../models/company')
const router = express.Router();
const { check, validationResult } = require('express-validator');


router.get('/', async (req, res) => {
    const companies = await Company.find();
    res.send(companies)
});

router.post('/', [
    check('name').isLength({min: 3}),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({message: error.msg, code: error.param});
    }

    const company = new Company({
        country: req.body.country,
        name: req.body.name
    })
    
    const result = await company.save()
    res.status(201).send(company)
});

router.put('/:id', [
    check('name').isLength({min: 3}),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({message: error.msg, code: error.param});
    }

    const company = await Company.findByIdAndUpdate(req.params.id, {
        country: req.body.country,
        name: req.body.name
    }, { new : true});
    if (!company) {
        send404(res, 'Not company found', req.params.id);
    } else {
        res.status(200).send(company)
    }    
});

router.get('/:id', async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        send404(res, 'Not company found', req.params.id);
    } else {
        res.send(company)
    }
});

router.delete('/:id', async (req, res) => {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
        send404(res, 'Not company found', req.params.id);
    } else {
        res.status(204).send()
    }
});
   
const send404 = (res, msg, code) => {
    const body = {message: msg, code: code}
    res.status(404).send(body)
}

module.exports = router;