const express = require('express')

const ditto = require('./pokemon/ditto.json')

const app = express()

const PORT = process.env.PORT ?? 1234

// Por temas de seguridad se suele eliminar esta cabecera
app.disable('x-powered-by')

// Gracias a express esta linea hace lo mismo que el bloque comentado abajo
app.use(express.json())

// Middleware --> Si no se especifica la url, por defecto se ejecuta para todas las llamadas
// app.use((req, res, next) => {
//   // Para trackear peticiones, revisar si el usuario tiene cookies, esta logeado, etc.
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()
//
//   // Middleware que procesa peticiones POST de tipo JSON
//   let body = ''
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })
//
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     // mutamos el body de la peticion
//     req.body = data
//     next()
//   })
// })

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto) // Se envia status 200 por defecto
})

app.post('/pokemon', (req, res) => {
  // Podemos devolver directamente el body porque el middleware ya lo ha procesado
  res.status(201).json(req.body)
})

// Siempre al final porque los get/post/etc van en order
app.use((req, res) => {
  res.status(404).send('<h1> 404 NOT FOUND </h1>')
})

app.listen(PORT, () => {
  console.log(`Express Server listening on port http://localhost:${PORT}`)
})
