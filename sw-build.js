var fs = require('fs');


var t = new Date().getTime();

var file = 'www/service-worker.js';
var data = fs.readFileSync(file); //read existing contents into data
var fd = fs.openSync(file, 'w+');
var buffer = new Buffer("const CACHE_VERSION = '"+t+"';");

var ws = fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
fs.appendFile(fd, data);
fs.close(fd);

console.log('ws');
console.log(ws);
