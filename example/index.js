'use strict';

var express = require('express');
var app = express();

app.get('/', function () {
    throw new Error('Bang! Bang!');
});

app.get('/object', function () {
    throw process;
});

app.use(require('..')());

console.log('Server started on http://localhost:3000');
app.listen(3000);
