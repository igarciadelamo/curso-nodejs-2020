const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type':'application/html'})
    response.write('<h1>One page from node</h1>')
    response.end()
})

server.listen(2000);
console.log("Server started in 2000...")