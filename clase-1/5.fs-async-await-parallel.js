const { readFile } = require('node:fs/promises');

// Solo para modulos nativos que no implementan promesas
// const promisify = require('node:util')
// const readFilePromise = promisify(fs.readFile)
Promise.all([
    readFile('./archivo.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')
]).then(([text, text2]) => {
    console.log('Texto 1', text);
    console.log('Texto 2', text2);
})