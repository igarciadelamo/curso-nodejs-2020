const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send({message: 'Hello World', code: 200})
});

module.exports = router;