const path = require('node:path')

console.log(path.sep);

const filePath = path.join('content', 'subfolder', 'text.txt')
console.log(filePath);

const base = path.basename('/tmp/content/subfolder/archivo.txt')
console.log(base);

const extension = path.extname('image.jpg')
console.log(extension);