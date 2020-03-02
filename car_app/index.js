const mongoose = require('mongoose')
const express = require('express');
const app = express();

var morgan = require('morgan')

const port = process.env.PORT || 3000;

const car = require('./routes/car')
const user = require('./routes/user')
const company = require('./routes/company')
const sale = require('./routes/sale')
const auth = require('./routes/auth')
const hello = require('./routes/hello')

app.use(express.json())
app.use(morgan('tiny'))

app.use('/', hello)
app.use('/api/car/', car)
app.use('/api/user/', user)
app.use('/api/company/', company)
app.use('/api/sale/', sale)
app.use('/api/auth/', auth)

app.listen(port, () => console.log('Starting server in port ' + port))

mongoose.connect('mongodb://localhost/cardb', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(result => console.log("Connected to mongodb"))
    .catch(error => console.log("Error connecting to mongodb", error.message))