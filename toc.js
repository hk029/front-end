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
var reg = /^(#+.*)/gm;
var match;
var toc = '目录\n';
var firstLevel = 0;

while((match = reg.exec(data)) != null){
  let reg2 = /^(#+)/g
  var title = match[1];
  var level = reg2.exec(title)[1].length; 
  if(!firstLevel){
    firstLevel = level;
  }
  // console.log(title,level);
  var url = title.replace(/#+\s/g,'');
  title ='  '.repeat(level-firstLevel) + `- [${url}](#${url})`;
  toc += title + '\n';
}
console.log(toc);
data  = toc + data;

// fs.writeFileSync('./test.md',data);