# express-[stackman](https://github.com/watson/stackman) [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Dependency Status][depstat-image]][depstat-url]

Enrich Express error handler which inserts source code within stack frames.

## Usage

Install module:

`npm i express-stackman --save`

Insert middleware into your express application __after all routes and other middlewares__:

```javascript
var app = require('express')();

app.get('/', function () {
    throw new Error('Bang!');
});

if (process.env.NODE_ENV === 'development') {
    app.use(require('express-stackman')());
}
```

## Options

All options passed to [stackman](https://github.com/watson/stackman#api) directly.

 * `context` - The lines of context to be loaded on each side of the callsite line (default: `7`)

You can see instant example by doing this:

```bash
npm i
node example
open http://localhost:3000
```

![screen shot 2014-11-02 at 6 41 19 pm](https://cloud.githubusercontent.com/assets/365089/4875415/fa5a8d94-6295-11e4-92f0-def91d5a7b9a.png)

(If you not - write an issue, we will figure it out)

## License

MIT (c) 2014 Vsevolod Strukchinsky (floatdrop@gmail.com)

[npm-url]: https://npmjs.org/package/express-stackman
[npm-image]: http://img.shields.io/npm/v/express-stackman.svg?style=flat

[travis-url]: https://travis-ci.org/floatdrop/express-stackman
[travis-image]: http://img.shields.io/travis/floatdrop/express-stackman.svg?style=flat

[coveralls-url]: https://coveralls.io/r/floatdrop/express-stackman
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/express-stackman.svg?style=flat

[depstat-url]: https://david-dm.org/floatdrop/express-stackman
[depstat-image]: http://img.shields.io/david/floatdrop/express-stackman.svg?style=flat
