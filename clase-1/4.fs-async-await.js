const { readFile } = require('node:fs/promises');

// Solo para modulos nativos que no implementan promesas
// const promisify = require('node:util')
// const readFilePromise = promisify(fs.readFile)
(async () => {
    console.log('Leyendo el primer archivo ...');
    const text = await readFile('./archivo.txt', 'utf-8');
    console.log(text);
    console.log('Hacer cosas mientras lee el archivo...');
    
    console.log('Leyendo el segundo archivo ...');
    const text2 = await readFile('./archivo2.txt', 'utf-8');
    console.log(text2);
})()

