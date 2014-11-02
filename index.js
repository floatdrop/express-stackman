'use strict';

var stackman = require('stackman');
var multiline = require('multiline');
var hogan = require('hogan.js');

var template = multiline(function(){/*
<!doctype html>
<html>
    <head>
        <title>Error</title>
        <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/floatdrop/express-stackman/master/css/index.css">
    </head>
    <body>
    <h1>Error</h1>
    <h2><i>{{code}}</i> — {{message}}</h2>
    <ul id="stacktrace">
    {{#frames}}
        <li>{{filename}}:{{line}}:{{column}}</li>
        <li class="source">
            <pre class="prettyprint lang-javascipt linenums:{{start}}">
{{#context.pre}}
{{.}}
{{/context.pre}}
{{context.line}}
{{#context.post}}
{{.}}
{{/context.post}}
            </pre>
        </li>
    {{/frames}}
    </ul>
    </body>
    <script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/floatdrop/express-stackman/master/css/prettify.css">
</html>
*/});

var page = hogan.compile(template);

function getFrame(frame) {
    return {
        filename: frame.getFileName(),
        line: frame.getLineNumber(),
        start: frame.getLineNumber() - frame.context.pre.length,
        context: frame.context
    };
}

function prepeare(stack) {
    return {
        frames: stack.frames.map(getFrame)
    };
}

module.exports = function (options) {
    return function (err, req, res, next) {
        var code = err.code || 500;

        stackman(options)(err, function (stack) {
            stack = prepeare(stack);
            stack.code = code;
            stack.message = err.message || err.toString();

            res
                .status(code)
                .send(page.render(stack));

            next();
        });
    };
};
