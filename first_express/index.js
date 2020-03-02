const express = require('express');
const app = express();

const intercept_date = require('./intercept_date')
const intercept_headers = require('./intercept_headers')
var morgan = require('morgan')

const port = process.env.PORT || 3000;

const cars = require('./routes/cars')
const hello = require('./routes/hello')

app.use(express.json())
app.use(intercept_date);
app.use(intercept_headers)
app.use(morgan('tiny'))

app.use('/', hello)
app.use('/api/cars/', cars)


app.listen(port, () => console.log('Starting server in port ' + port))