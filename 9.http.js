const http = require('node:http')
const { findAvailablePort } = require('./10.free-port.js')

const productionPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Request Received')
  res.end('Hola mundo')
})

// El puerto 0 utiliza el primer puerto libre disponible

findAvailablePort(productionPort).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${server.address().port}`)
  })
})
