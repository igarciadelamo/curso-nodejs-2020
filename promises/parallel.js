const promise1 = new Promise((resolve, reject) => {
    console.log("Reading data from FB")
    setTimeout(()=>{
        resolve({likes: 200, frinds: 150})
    }, 1000);
})

const promise2 = new Promise((resolve, reject) => {
    console.log("Reading data from TW")
    setTimeout(()=>{
        resolve({likes: 100, frinds: 400})
    }, 2000);
})

const promise3 = new Promise((resolve, reject) => {
    console.log("Reading data from TW")
    setTimeout(()=>{
        reject(new Error('Error accessing to data in some place'))
    }, 500);
})

Promise.all([promise1, promise2])
    .then(result => console.log(result))
    .catch(err => console.log(err.message))

Promise.race([promise1, promise3])
    .then(result => console.log(result))
    .catch(err => console.log(err.message))