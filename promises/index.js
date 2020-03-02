const promise1 = new Promise((resolve, reject) => {
    console.log("Promise executing")
    setTimeout(()=>{
        resolve({id: 1, code: 'AC01', timestamp: Date.now()})
    }, 2000);
})

const promise2 = new Promise((resolve, reject) => {
    console.log("Promise executing")
    setTimeout(()=>{
        reject(new Error('Error accessing to data in some place'))
    }, 2000);
})

promise1
    .then(result => console.log('Promise1 Result: ', result))
    .catch(error => console.log('Promise1 Error: ', error.message))

promise2
    .then(result => console.log('Promise2 Result: ', result))
    .catch(error => console.log('Promise2 Error: ', error.message))