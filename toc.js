var fs = require('fs')
var process = require('process')
var readDir = require('./readDir.js')


// readDir(process.cwd(), function (file) {
//   var data = fs.readFileSync(file);
//   console.log(data);
// },{
//   filters: [/\.git/g]
// })
var data = fs.readFileSync('./test.md');
var reg = /^(#+.*)/gm
var match;
var toc = '目录\n';
while((match = reg.exec(data)) != null){
  var title = match[1];
  var url = title.replace(/#+\s/g,'');
  title = title.replace(url,`[${url}](#${url})`);
  toc += title + '\n';
}
data  = toc + data;

fs.writeFileSync('./test.md',data);