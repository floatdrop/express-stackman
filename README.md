# express-[stackman](https://github.com/watson/stackman) [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Dependency Status][depstat-image]][depstat-url]

Enrich Express error handler which inserts source code within stack frames.

## Usage

Install module:

`npm i express-stackman --save`

Insert middleware into your express app:

```javascript
if (process.env.NODE_ENV === 'development') {
    app.use(require('express-stackman')());
}
```

## Options

 * `context` - The lines of context to be loaded on each side of the callsite line (default: 7)

You can see instant example by doing this:

```bash
git clone https://github.com/floatdrop/node-parsetrace && cd $_
npm i && node example
```

Open [`http://localhost:3000`](http://localhost:3000) for exception example or [`http://localhost:3000/object`](http://localhost:3000/object) for object example.

![screenshot](https://github.com/floatdrop/express-error-with-sources/raw/master/img/screenshot.png)

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
