function findCar(id) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Accessing database to find car...')
            resolve({id: id, manufacturer: 'Audi', model: 'A3'})
        }, 2000);
    })
}

function findModel(model) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Accessing database to find model...')
            resolve({model: model, cv: 140, automatic: true})
        }, 2000);
    })
}

async function showModel() {
    try {
        const car = await findCar(17);
        const model = await findModel(car.model)
        console.log('Found model', model)
    } catch (err) {
        console.log('Error: ', error.message)
    }
}

showModel();

