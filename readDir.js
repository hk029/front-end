let fs = require('fs')
let path = require('path')

var readDir = (path, fn, option) => {
  var files = fs.readdirSync(path);
  var filters = option && option.filters || [];
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

module.exports = readDir;