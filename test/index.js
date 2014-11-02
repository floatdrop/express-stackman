/* global describe, it, require, beforeEach */

'use strict';

var request = require('supertest');
var expressStackman = require('..');

describe('main tests', function () {
    beforeEach(function () {
        delete require.cache[require.resolve('./app')];
        this.app = require('./app');
    });

    it('generates html', function (done) {
        this.app.use(expressStackman());
        this.app.use(function (err, req, res, next) {
            res.statusCode = 500;
            res.end(err.stack);
            next();
        });
        request(this.app)
            .get('/error')
            .expect(/<html/g)
            .expect(/SECRETLINE/, done);
    });
});
