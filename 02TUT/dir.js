const fs = require('fs');

// Dir not exist then create
if (!fs.existsSync('./new')) {
    fs.mkdir('./new', err => {
        if (err) throw err;
        console.log('Directory created');
    })
}

// Dir is exist then remove
if (fs.existsSync('./new')) {
    fs.rmdir('./new', err => {
        if (err) throw err;
        console.log('Directory removed');
    })
}
