const mongoose = require('mongoose');
const {companySchema} = require('./company')

const carSchema = new mongoose.Schema({
    model: {
        type: String,
        required :true,
        trim: true,
        minlength: 2,
        maxlength: 10
    },
    manufacturer: {
        type: companySchema,
        required :true
    },
    sold : Boolean,
    price: {
        type: Number,
        required: function () {
            return this.sold
        }
    },
    year : {
        type: Number,
        min: 1997,
        max: 2020,
        get: y => Math.round(y)
    },
    extras: [String],
    date: {
        type: Date, 
        default: Date.now
    }
})

const Car = mongoose.model('car', carSchema);

module.exports = Car