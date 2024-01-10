const os = require('node:os');

console.log('Info del SO');
console.log('--------------------');

console.log('Nombre', os.platform());
console.log('Version', os.release());
console.log('Arquitectura', os.arch());
console.log('CPUs', os.cpus());
console.log('Memoria libre (MB)', os.freemem() / 1024 / 1024);
console.log('Memoria total (MB)', os.totalmem() / 1024 / 1024);
console.log('Uptime (dias)', os.uptime() / 3600 / 24);