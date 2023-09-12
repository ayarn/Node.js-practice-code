// fs module allows you to work with the file system on your computer.
const path = require('path');

/*
const fs = require('fs');

// used to read files
fs.readFile(path.join(__dirname, 'files','starter.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
})

// replaces the specified file and content if it exists.
// If the file does not exist, a new file will be created and contain the specified content
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you', err => {
    if (err) throw err;
    console.log('Write completed');
})

// appends the specified content at the end of the specified file
fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '..This is extra text', err => {
    if (err) throw err;
    console.log('Append Complete');
})

// rename filename
fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), err => {
    if (err) throw err;
    console.log('Rename Complete');
})

*/


// A better way to do this operations :

// fs.promises API provides an alternative set of asynchronous file system methods
// that return Promise objects rather than using callbacks.
const fsPromises = require('fs').promises;

const fileOperations = async () => {
    try {
        // Reading
        const data = await fsPromises.readFile(path.join(__dirname, 'files','starter.txt'), 'utf8');
        console.log(data);

        // Unlinking - delete the file
        await fsPromises.unlink(path.join(__dirname, 'files','starter.txt'));

        // Writing
        await fsPromises.writeFile(path.join(__dirname, 'files','promiseWrite.txt'), data);

        // Appending
        await fsPromises.appendFile(path.join(__dirname, 'files','promiseWrite.txt'), '\nNice to meet you.');

        // Renaming
        await fsPromises.rename(path.join(__dirname, 'files','promiseWrite.txt'), path.join(__dirname, 'files','promiseComplete.txt'));

        // Reading new file
        const newData = await fsPromises.readFile(path.join(__dirname, 'files','promiseComplete.txt'), 'utf8');
        console.log(newData);
    } catch (err) {
        console.log(err);
    }
}

fileOperations();

// process object is a global object and can be accessed from anywhere
process.on('uncaughtException', err => {
    console.log(`There was an uncaught error: ${err}`);
    process.exit(1);
})
