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
  title = title.replace(/#+\s/g,'');
  //github上的锚点规则，会把以下符号替换掉，并且把空格替换成-
  var url = title.replace(/[()（）：.]/g,'').replace(/\s/g,'-');
  title ='  '.repeat(level-firstLevel) + `- [${title}](#${url})`;

  toc += title + '\n';
}
console.log(toc);
data  = toc + data;

fs.writeFileSync('./test.md',data);