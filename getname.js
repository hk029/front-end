let fs = require('fs')
let path = require('path')
let process = require('process');

var readDir = (path, fn, option) => {
  var files = fs.readdirSync(path);
  var filters = option.filters;
  files.forEach(file => {
    var curPath = path + '/' + file;
    var stat = fs.statSync(curPath);
    if (!filters.some(f => curPath.match(f))) {
      if (stat.isDirectory()) {
        readDir(path + '/' + file, fn, option);
      } else if (stat.isFile()) {
        fn(path + '/' + file);
      }
    }
  }, this);
}

var files = [];
var str = '';
readDir(process.cwd(), function (file) {
  files.push(file);
  var tmp = file.replace(process.cwd(), '');
  str += `[](${tmp})\n`;
  console.log(file.replace(process.cwd(), ''));
}, {
  filters: [/\.git/g]
});

fs.writeFileSync('files.md',str);
console.log(files);

