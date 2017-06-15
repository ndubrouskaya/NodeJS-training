const fs = require('fs');
const zlib = require('zlib');
const { Transform } = require('stream');

const transformToUpperCase = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

let promise = new Promise((resolve) => {
    fs.createReadStream('test.txt')
        .pipe(transformToUpperCase)
        .pipe(fs.createWriteStream('testUp.txt'))
        .on('finish', resolve);
});
promise.then(() => {
    fs.createReadStream('testUp.txt')
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream('testUp.gz'))
        .on('finish', () => console.log('Done'))
});


