## 目录
---
- [如何实现sum(1,2),sum(1)(2)](#如何实现sum1,2,sum12)
- [如何实现数组去重](#如何实现数组去重)
- [如何实现深浅拷贝](#如何实现深浅拷贝)
---

## 如何实现sum(1,2),sum(1)(2)
这个函数的关键难点在与sum(1)(2),其实我们可以很容易的想到闭包，这就是很经典的闭包实现，只要返回一个函数就可以连续调用，关键是如何取得最后的总和值？这里就涉及到对toString和valueOf进行改造。

```js
var sum = function () {
  var total = 0;
  // 先初始化值
  total = [].reduce.call(arguments, (a, b) => a + b);
  function tmp() {
    //用reduce方法可以不管参数的个数，进行累加
    total += [].reduce.call(arguments, (a, b) => a + b);
    return tmp;  //一定要把自己返回出去，不然无法实现链式调用了
  }
  //因为是不断的返回函数，所以，如果需要输出或求值的时候，需要调用toString和valuOf
  tmp.toString = function () {
    return total;
  }
  tmp.valueOf = function () {
    return total;
  }
  return tmp;
console.log(sum(1,2,3));
console.log(sum(1)(2,3));
```
## 如何实现数组去重
```js
var array = [1,2,3,02,'02',true,'true',{a:1},'{a:1}',{a:1}]
var newArr = [];
```
1. 用Set
```js
[...new Set(array)]
```
2. 用Map
```js
//用map
var m = new Map();
array.forEach(e =>{
  if(!m.has(e)){
    newArr.push(e);
    m.set(e,1);
  }
})
console.log(newArr);
```
3. 用Object,需要做一些判断（object的key只能是字符串，需要区分本身是字符串和类型转换成字符串）
```js
//用Set
[...new Set(array)]
console.log([...new Set(array)]);
//用Object
newArr = [];
var tmpObj = {};
array.forEach((e,idx) =>{
  var tmpVal = e;
  switch(typeof(e)){
    case 'string' : tmpVal = 's'+e;  //保证string元素不和Number和Boolean元素一样
    break;
    case 'object' : tmpVal = 'o'+idx+e;  //保证每个ojbect元素都不一样
  }
  if(!tmpObj[tmpVal]){
    newArr.push(e);
    tmpObj[tmpVal] = 1;
  }
})
console.log(newArr);
```
## 如何实现深浅拷贝
1. 浅拷贝
父对象修改方法，会影响子对象 

**注意:** Object.assign就是浅拷贝，只拷贝一层！深层对象不拷贝
```js
function extendCopy(p) {　　　　
  var c = {};　　　　
  for (var i in p) {　　　　　　
    c[i] = p[i];　　　　
  }　　　　
  c.uber = p;　　　　
  return c;　　
```
2. 深拷贝：

比较简单的实现是直接使用JSON.stringify和parse
```js
var cloneObj = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};

```
