## 目录
---
- [如何实现sum(1,2),sum(1)(2)](#如何实现sum1,2,sum12)
- [如何实现数组去重](#如何实现数组去重)
- [如何实现深浅拷贝](#如何实现深浅拷贝)
- [如何实现页面关闭通知后台](#如何实现页面关闭通知后台)
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
```

## 如何实现页面关闭通知后台

1. 定时发送心跳

```js
setInterval(function () {
  //send meg to server
},1000)
```

2. onbeforeunload()事件

```js
window.onbeforeunload = function(){
  //send msg to server
  return 'close'; //必须要返回，有的浏览器会用这个文字作提示，但是chrome用默认的
```

一个判断页面是否真的关闭和刷新的好方法： 

```js
window.onbeforeunload=function (){ 
alert("===onbeforeunload==="); 
if(event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey){ 
alert("你关闭了浏览器"); 
}else{ 
alert("你正在刷新页面"); 
```

![your text](http://o7bk1ffzo.bkt.clouddn.com/1500819726098)


## 如何删除数组中的多个特定元素（必须用splice）

关键是要注意splice之后，arr的长度会变化
```js
var arr = [1,2,4,4,6,7]
var target = 4;
for (var i = 0;arr[i];){  //如果i超过length，arr[i] = undefined, 或者用i < arr.length也行，length会动态变化
  if (arr[i] === target){
    arr.splice(i,1);   //此时不需要i移动，因为删除后等于i自动后移
  }else {
    i++;
  }
}

```

## 求数组中的最大，最小值
可以使用reduce或者直接用Math.max
```js
var arr = [1,2,4,4,6,7]
//用reduce
arr.reduce(function (a, b) {
  return a > b?a:b;
})
//直接使用Math.max([value1[, value2[, ...]]])
Math.max.apply(null,arr);
//扩展运算符
Math.max(...arr);

```

## 如何扁平化数组
数组的toString很神奇，可以扁平化数组
```js

var arr = [1,2,[3,[4]]];
arr.toString() // 1,2,3,4
var newArr = arr.toString().split(',').map( i => parseInt(i) );
```


我想了一个很另类的方法，用正则
```js
var arr = [1,2,[3,[4]]];
var str = '[' + JSON.stringify(arr).replace(/[\[|\]]/g,'') + ']'
var newArr = JSON.parse(str);
```

## 如何实现(2).plus(3).minus(1) //4
(2).plus，其实是调用Number的plus方法，数字通过包装对象可以使用相应的方法，所以只用把Number的原型中加入相应的方法就行了
```js
Number.prototype.plus = function(x){return this + x;}
Number.prototype.minus = function(x){return this - x;}
```

