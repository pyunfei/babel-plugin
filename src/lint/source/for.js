const fs = require('fs');
const path = require('path');
const { transformFromAstSync } = require('@babel/core');
const parser = require('@babel/parser');

const forDirectionLintPlugin = require('../plugin/for');


// for
const sourceCode = `
for (var i = 0; i < 10; i++) {
}

for (var i = 10; i >= 0; i--) {
}
for (var i = 0; i < 10; i--) {
    }


for (var i = 10; i >= 0; i++) {
  console.log('===')
      }
`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
});

const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [forDirectionLintPlugin],
    filename: 'filename.js'
});
