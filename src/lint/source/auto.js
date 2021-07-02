const fs = require('fs');
const path = require('path');
const { transformFromAstSync } = require('@babel/core');
const parser = require('@babel/parser');

const autoTrackPlugin = require('../plugin/auto');

// track
// const sourceCode = fs.readFileSync(path.join(__dirname, './source.js'), { encoding: 'utf-8' });
const sourceCode = `
function a () {
  console.log('aaa');
}

class B {
  bb() {
      return 'bbb';
  }
}

const c = () => 'ccc';

(async() => {
console.log('async')
})()

const d = function () {
  console.log('ddd');
}
`
const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous'
});
const { code } = transformFromAstSync(ast, sourceCode, {
  plugins: [[autoTrackPlugin, {
    trackerPath: 'tracker'
  }]]
});

console.info(code);