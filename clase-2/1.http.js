const http = require('node:http')

const productionPort = process.env.PORT ?? 3000

function processRequest (req, res) {
  console.log('Request Received ->', req.url)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200
    res.end(' <h1>Bienvenido a mi página de inicio! </h1>')
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.setHeader('Charset', 'utf8')
    res.end(' <h1> Contacto </h1>')
  } else {
    res.statusCode = 404
    res.end(' <h1> Not Fount 404 </h1>')
  }
}

const server = http.createServer(processRequest)

// El puerto 0 utiliza el primer puerto libre disponible

server.listen(productionPort, () => {
  console.log(`Server listening on port http://localhost:${server.address().port}`)
})
