'use strict';

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/error', function () {
    // SECRETLINE
    require('./foobar');
});

module.exports = app;
