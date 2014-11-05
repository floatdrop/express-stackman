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

it('should not call next middlewares', function (done) {
    var called = false;

    app.use(expressStackman())
        .use(function(req, res, next) {
            called = true;
            next();
        });

    request(app)
        .get('/error')
        .expect(500, function () {
            done(called ? new Error('Next middleware is called') : undefined);
        });
});


it('should read sources from node errors', function (done) {
    app.use(expressStackman());
    request(app)
        .get('/error')
        .expect(500)
        .expect(/SECRETLINE/, done);
});
