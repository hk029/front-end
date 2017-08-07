## 目录
---
- [遍历DOM节点](#遍历DOM节点)
---

## 遍历DOM节点

主要递归，查看有没有children，如果有就继续查找。

```js
var getNode = function (node) {
    var tmp = {};
    tmp.id = node.id;
    tmp.name = node.name;
    tmp.class = node.class;
    tmp.value = node.value;
    tmp.tag = node.tagName;
    tmp.children = [];
    return tmp;
}
var traverse = function (node) {
  var newNode = getNode(node); 
  var children = node.children;
  [].forEach.call(children,function (ele) {
      newNode.children.push(traverse(ele));
  })
  return newNode;
}
```

用原生自带的遍历器

```js
//原生自带的遍历器，只有nextNode和previousNode两个方法
var it = document.createNodeIterator(document,NodeFilter.SHOW_ELEMENT,null,false);
var node = it.nextNode();
while(node !== null){
  console.log(node.tagName);
  node = it.nextNode();
}
//升级版遍历器，有parentNode，firstChild，lastChild，nextSibing，previousSibing等方法
//参数和这个类似
var walker = document.createTreeWalker(document,NodeFilter.SHOW_ELEMENT,null,false);
var node = walker.nextNode();
while(node !== null){
  console.log(node.tagName);
  node = walker.nextNode();
}
```

