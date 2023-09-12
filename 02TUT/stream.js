// when we want write large file, this will be efficient way
const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8'} );

const ws = fs.createWriteStream('./files/new-lorem.txt');

/*
rs.on('data', datachunk => {
    ws.write(datachunk);
}) */

rs.pipe(ws);
