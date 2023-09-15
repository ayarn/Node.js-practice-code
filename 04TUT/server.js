const express = require('express');
const app = express();

const path = require('path');

// assign a PORT
const PORT = process.env.PORT || 3500;

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
app.get('/*', (req, res) => {    
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
