##目录
let fs = require('fs')
let path = require('path')
let process = require('process');
let readDir = require('./readDir');
let toc = require('./toc');

var files = [];
var str = '';

readDir(process.cwd(), function (file) {
  toc(file);
  // files.push(file);
  // var tmp = file.replace(process.cwd(), '');
  // str += `[](${tmp})\n`;
  // console.log(file.replace(process.cwd(), ''));
}, {
  filters: [/\.git/g]
});

// fs.writeFileSync('files.md',str);
// console.log(files);
