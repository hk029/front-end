## 目录
---
- [箭头函数](#箭头函数)
  - [返回对象](#返回对象)
  - [与解构](#与解构)
  - [简化回调都可以用箭头代替](#简化回调都可以用箭头代替)
  - [与rest结合](#与rest结合)
  - [this](#this)
  - [arguments,super,target](#arguments,super,target)
---

## 箭头函数
如果没有参数，必须要用一个括号，只有一个参数，不用写括号，返回值不用写return```javascriptvar f = v => v;//等于var f = function(v) {  return v;};var f = () => 5;var sum = (num1, num2) => num1 + num2;```### 返回对象
如果只是返回对象，必须要加一个括号，否则编译器认不出：{}的二义性```javascriptvar getTempItem = id => ({ id: id, name: "Temp" });```### 与解构
```javascriptconst full = ({ first, last }) => first + ' ' + last;// 等同于function full(person) {  return person.first + ' ' + person.last;```### 简化回调都可以用箭头代替
```javascript// 正常函数写法[1,2,3].map(function (x) {  return x * x;});// 箭头函数写法[1,2,3].map(x => x * x);// 正常函数写法var result = values.sort(function (a, b) {  return a - b;});// 箭头函数写法var result = values.sort((a, b) => a - b);```### 与rest结合
```javascriptconst numbers = (...nums) => nums;numbers(1, 2, 3, 4, 5)// [1,2,3,4,5]```### this
箭头函数有几个使用注意点。（1）函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。（2）**不可以当作构造函数**，也就是说，不可以使用`new`命令，否则会抛出一个错误。（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，**可以用Rest参数代替**。（4）不可以使用`yield`命令，因此箭头函数**不能用作Generator函数**。箭头函数可以让`this`指向固定化，这种特性很有利于封装回调函数。下面是一个例子，DOM事件的回调函数封装在一个对象里面。但是如果你需要使用函数内部的this，那只能使用function()```javascriptvar handler = {  id: '123456',  init: function() {    document.addEventListener('click',      event => this.doSomething(event.type), false);   //如果不用箭头函数那this指向document  },  doSomething: function(type) {    console.log('Handling ' + type  + ' for ' + this.id);  }};```所以，箭头函数转成ES5的代码如下。```javascript// ES6function foo() {  setTimeout(() => {    console.log('id:', this.id);  }, 100);// ES5function foo() {  var _this = this;    //这里引用了外面的this  setTimeout(function () {    console.log('id:', _this.id);  }, 100);```另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。```javascript(function() {  return [    (() => this.x).bind({ x: 'inner' })()  ];}).call({ x: 'outer' });// ['outer']```### arguments,super,target
除了`this`，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：`arguments`、`super`、`new.target`。```javascriptfunction foo() {  setTimeout(() => {    console.log('args:', arguments);  }, 100);foo(2, 4, 6, 8)// args: [2, 4, 6, 8]```