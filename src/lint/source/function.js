const fs = require('fs');
const path = require('path');
const { transformFromAstSync } = require('@babel/core');
const parser = require('@babel/parser');

const noFuncAssignLintPlugin = require('../plugin/function');


// no function
const sourceCode = `
    function foo() {
        foo = bar;
    }
    var a = function hello() {
      hello = 123;
      console.log(hello)
    };
`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
});

const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [noFuncAssignLintPlugin],
    filename: 'filename.js'
});
