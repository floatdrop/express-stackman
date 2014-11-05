/* global it, beforeEach */

'use strict';

var request = require('supertest');
var expressStackman = require('..');

var app;
beforeEach(function () {
    delete require.cache[require.resolve('./app')];
    app = require('./app');
});

it('should not break app', function (done) {
    app.use(expressStackman());
    request(app)
        .get('/')
        .expect(200)
        .expect(/Hello World/, done);
});

it('should read sources from node errors', function (done) {
    app.use(expressStackman());
    request(app)
        .get('/error')
        .expect(500)
        .expect(/SECRETLINE/, done);
});
