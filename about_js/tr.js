
var root = {};

// var nodeInfo =  {
//   name:'',
//   tagname:'',
//   id:'',
//   value:'',
//   class:'',
//   children:[

//   ]
// }
class nodeInfo {
  constructor(node){
    this.id = node.id;
    this.name = node.name;
    this.class = node.class;
    this.value = node.value;
    this.children = [];
  }

  addChild(node){
    this.children.push(new nodeInfo(node));
  }

  toString(){
    return JSON.stringify(this);
  }
}




var traverse = function (node) {
  var children = node.children();
  return 
}