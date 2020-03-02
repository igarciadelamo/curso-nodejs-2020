const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required :true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    country: {
        type: String
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

const Company = mongoose.model('company', companySchema);

module.exports.Company = Company
module.exports.companySchema = companySchema