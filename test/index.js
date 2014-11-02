/* global describe, it, require, beforeEach */

'use strict';

var request = require('supertest');
var expressStackman = require('..');

describe('main tests', function () {
    var app;
    beforeEach(function () {
        delete require.cache[require.resolve('./app')];
        app = require('./app');
    });

    it('generates html', function (done) {
        app.use(expressStackman());
        request(app)
            .get('/error')
            .expect(500)
            .expect(/SECRETLINE/, done);
    });
});
