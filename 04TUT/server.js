const logEvents = require('./logEvents');

const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const EventEmitter = require('events');

// initialize object
const emitter = new EventEmitter();

// add listner
emitter.on('log', (msg, fileName) => logEvents(msg, fileName));

// assign a PORT
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            {'contentType': contentType}
        );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        emitter.emit('log', `${err.name}\t${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

// Create a server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    // Emit event
    emitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    // Get a file type (file extension)
    const extension = path.extname(req.url);

    let contentType;

    // Check and set contentType
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;

        case '.js':
            contentType = 'text/javascript';
            break;

        case '.json':
            contentType = 'application/json';
            break;

        case '.jpg':
            contentType = 'image/jpeg';
            break;

        case '.png':
            contentType = 'image/png';
            break;

        case '.txt':
            contentType = 'text/plain';
            break;
    
        default:
            contentType = 'text/html';
            break;
    }

    let filePath =
        // this checks req.url is exact '/', ex: '/'
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            // this checks last element of req.url is '/', ex : 'carts/'
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                // this will be html inside views/subdir
                ? path.join(__dirname, 'views', req.url, 'index.html')
                // html with any text in url
                : contentType === 'text/html'
                    // this will be html directly inside views
                    ? path.join(__dirname, 'views', req.url)
                    // this could be image, css or other than html
                    : path.join(__dirname, req.url);

    // makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/')
        filePath += '.html';
    
    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        switch(path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, {
                    'Location': 'new-page.html'
                });
                res.end();
                break;
            
            case 'www-page.html':
                res.writeHead(301, {
                    'Location': '/'
                });
                res.end();
                break;
            
            default:
                // serve a 404 response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
})

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
