const express = require('express');
const app = express();
const cors = require('cors');

const path = require('path');
const logEvents = require('./middleware/logEvents');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

// assign a PORT
const PORT = process.env.PORT || 3500;

// custom middleware Logger
app.use(logger);

// Cross Origin Resource Sharing
const whiteList = ['http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));

// HTTP Method
app.get('^/$|index(.html)?', (req, res) => {
    // res.send("GET request to homepage");
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {    
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

// Redirect to particular page
app.get('/old-page(.html)?', (req, res) => {    
    res.redirect(301, '/new-page.html');
});

// Chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res, next) => {
    console.log('three');
    res.send('Finished')
}

app.get('/chain(.html)?', [one, two, three]);

// Custom 404 handle
app.all('*', (req, res) => {    
    res.status(404);

    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
