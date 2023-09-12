// OS module provides information about the computer's operating system.
const os = require('os');

// OS Properties and Methods
console.log(os.type());
console.log(os.version());
console.log(os.homedir());

// returns current module directory
console.log(__dirname);

// return current module directory with filename
console.log(__filename);

// Path module provides a way of working with directories and file paths.
const path = require('path');

// returns current module directory
console.log(path.dirname(__filename));

// returns current filename
console.log(path.basename(__filename));

// returns file extension
console.log(path.extname(__filename));

// returns an object with values { root, dir, base, ext, name }
console.log(path.parse(__filename));

// require math file
const { add, sub, mul, div } = require('./math');

console.log(add(5, 4));
console.log(sub(5, 4));
console.log(mul(5, 4));
console.log(div(5, 4));
