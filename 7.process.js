// Argumentos de entrada
console.log(process.argv)

// Control del proceso y su salida
// 0 --> todo bien, 1 --> error
//process.exit(0)

// Eventos
process.on('exit', () => {
    // Limpiar recursos...
})

// Directorio desde donde se ejecuta el proceso
console.log(process.cwd())

// Plataforma
console.log(process.env.NODE_ENV)