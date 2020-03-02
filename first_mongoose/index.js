const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/cardb', {useNewUrlParser: true})
    .then(result => console.log("Connected to mongodb"))
    .catch(error => console.log("Error connecting to mongodb", error.message))

const carSchema = new mongoose.Schema({
    model: {
        type: String,
        required :true,
        trim: true,
        minlength: 2,
        maxlength: 10
    },
    manufacturer: {
        type: String,
        required :true,
        trim: true,
        minlength: 3,
        maxlength: 20
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

//createCar('AUDI', 'A4', 2008, 9000)
//createCar('BMW', 'X1', 2015, 7500)
findCars()
//findCars(1, 2)
//updateCar('5e3e909897277ad788f4bb3e')
//updateCarWithSet('5e3e909897277ad788f4bb3e')
//findCarsByManufacturer('Audi')
//countCarsByManufacturer('Audi')
//deleteCar('5e41a2d7d443ecfc9cf31cf8')
//deleteCars()

async function createCar(manufacturer, model, year, price) {
    const car = new Car({
        model: model,
        manufacturer: manufacturer, 
        year: year,
        price: price,
        sold : false,
        extras: ['Auomatic', 'Android Auto'],
    })
    const result = await car.save()
    console.log('Result saving car', result)
}


async function findCars() {
    const result = await Car.find()
                            .sort({price : 1})
                            .select({manufacturer: 1, model: 1, year: 1, price: 1, sold: 1})
    console.log('Result retrieving all cars', result)
}

async function countCarsByManufacturer(manufacturer) {
    const result = await Car.find({manufacturer: manufacturer}).count()
    console.log('Result retrieving cars by manufacturer', result)
}

async function findCarsByManufacturer(manufacturer) {
    const result = await Car.find({manufacturer: manufacturer})
                            .sort({price : 1})
                            .select({manufacturer: 1, model: 1, year: 1, price: 1, sold: 1})
    console.log('Result retrieving cars by manufacturer', result)
}

async function findCars(page, size) {
    const result = await Car.find({})
                            .skip(page * size)
                            .limit(size)
                            .sort({price : 1})
                            .select({manufacturer: 1, model: 1, year: 1, price: 1, sold: 1})
    console.log('Result retrieving cars with pagination', result)
}

async function updateCar(id) {
    const car = await Car.findById(id)
    if(!car) {
        console.log('Car not found', id);
        return
    }
    car.sold = true;
    const result = await car.save()
    console.log('Result updating cars', result)
}

async function updateCarWithSet(id) {
    const result = await Car.update({_id: id}, {$set: {sold : true}});
    console.log('Result updating cars', result)
}

async function deleteCar(id) {
    const result = await Car.deleteOne({_id: id});
    console.log('Result deleting one car', result)
}

async function deleteCars() {
    const result = await Car.deleteMany({});
    console.log('Result deleting all cars', result)
}