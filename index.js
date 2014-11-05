'use strict';

var stackman = require('stackman');
var multiline = require('multiline');
var hogan = require('hogan.js');

var context = hogan.compile(multiline(function(){/*
<li class="source">
    <pre class="prettyprint lang-javascipt linenums:{{start}}">
{{pre}}
{{line}}
{{post}}
    </pre>
</li>
*/}));

var page = hogan.compile(multiline(function(){/*
<!doctype html>
<html>
    <head>
        <title>Error</title>
        <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/floatdrop/express-stackman/master/css/index.css">
    </head>
    <body>
    <h1>Error</h1>
    <h2><i>500</i> — {{message}}</h2>
    <ul id="stacktrace">
    {{#frames}}
        <li>{{filename}}:{{line}}:{{column}}</li>
        {{{context}}}
    {{/frames}}
    </ul>
    </body>
    <script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/floatdrop/express-stackman/master/css/prettify.css">
</html>
*/}));

function getContext(frame) {
    return {
        start: frame.getLineNumber() - (frame.context.pre || []).length,
        pre: frame.context.pre.join('\n'),
        line: frame.context.line,
        post: frame.context.post.join('\n')
    };
}

function getFrame(frame) {
    return {
        filename: frame.getRelativeFileName(),
        line: frame.getLineNumber(),
        column: frame.getColumnNumber(),
        context: frame.context ? context.render(getContext(frame)) : ''
    };
}

function prepeare(stack) {
    return {
        frames: stack.frames.map(getFrame)
    };
}

module.exports = function (options) {
    var parse = stackman(options);
    return function (err, req, res, next) {
        parse(err, function (stack) {
            stack = prepeare(stack);
            stack.message = err.message || err.toString();
            res
                .status(500)
                .send(page.render(stack));
        });
    };
};
