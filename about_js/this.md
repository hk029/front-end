[TOC]
# this与作用域

## this

### 基本认识

每个函数在调用的时候，都会自动获取两个特殊变量：`this`和`arguments`，内部函数在搜索这两个变量时，只会搜索到其活动对象为止。

所以，我们把this关键字当成一个快捷方式，或者说是引用（reference）。this关键字指向的是**当前上下文（context）** 的主体（subject），或者当前正在被执行的代码块的主体。this关键字始终指向一个对象并持有这个对象的值，尽管它可以出现在全局范围（global scope）以外的地方，但它通常出现在方法体中。

**注意：** 严格模式（strict mode）下，全局使用this关键字时，this将会指向undefined。

除去不常用with和eval情况，实际中this指向大概可以分为4类
- 对象方法调用
- 普通函数调用
- 构造器调用
- apply，call，bind调用

### 函数有所属对象时：指向所属对象
函数有所属对象时，通常通过 . 表达式调用，这时 this 自然指向所属对象。比如下面的例子：
```js
window.value = 'window'
var myObject = {value: 'myobject'};
myObject.getValue = function () {
 return this.value;
};
console.log(myObject.getValue()); 
 // 输出  myobject 
```
属于对象 myObject，并由**myOjbect 进行调用** （体会这句话的含义），因此 this 指向对象 myObject。

### (在全局)普通函数调用：指向全局对象
只要是不作为对象的属性被调用的时候，我们就称为普通函数调用，默认都是指向全局对象（浏览器中是window，node中是global）
注意：setTimeout这类函数，this都是全局
```js
window.value = 'window'
var myObject = {value: 'myobject'};
myObject.getValue = function () {
 var foo = function () {
  console.log(this);
 };
 foo(); // 输出全局对象 window
 return this.value;
};
var getValue = myObject.getValue; 
console.log(myObject.getValue()); // => myobject 
console.log(getValue()); // => window
```
在上述代码块中，foo 函数虽然定义在 getValue 的函数体内，但实际上它既不属于 getValue 也不属于 myObject。foo 并没有被绑定在任何对象上，所以当调用时，它的 this 指针指向了全局对象 global。

这也是为什么不能使用下面代码的原因
```js
var getId = document.getElementById
getId('div1')
```
因为`document.getElementById`的实现用调了this

(据说这是个设计错误。)

### 构造器中的 this：指向新对象
js 中，我们通过`new`关键词来调用构造函数，此时`this`会绑定在该新对象上。
```js
var SomeClass = function(){
 this.value = 100;
}
 
var myCreate = new SomeClass();
 
console.log(myCreate.value); // 输出100
```
顺便说一句，在 js 中，构造函数、普通函数、对象方法、闭包，这四者没有明确界线。界线都在人的心中。

### apply 和 call 调用以及 bind 绑定：指向绑定的对象
- apply(作用域，参数数组)  ： 适合在函数内直接直接把arguments传入 
- call(作用域，参数1，参数2...) ： 比较符合平时函数调用
- bind(作用域) 
如果作用域传的是null，那默认绑定全局对象

注意：call和apply都是直接执行，但是bind是返回一个绑定了上下文的函数，
```js
Function.prototype.bind = function (context) {
  var self = this;
  return function () {
    self.apply(context,arguments);
  }
}
```

```js
var myObject = {value: 100};
 
//可以轻松实现借用方法（比如借用构造函数实现继承）
var foo = function(){
 console.log(this);
};
 
foo(); // 全局变量 global
foo.apply(myObject); // { value: 100 }
foo.call(myObject); // { value: 100 }
 
var newFoo = foo.bind(myObject);
newFoo(); // { value: 100 }
```



### this关键字的核心

如果一个方法内部使用了this关键字，`当且仅当对象调用方法时this关键字才会被赋值`，而且，当方法被调用时，this的赋值又严格依赖于实际调用这个方法的对象，也就是说，`this通常会被赋予调用对象的值`。



### this使用技巧

#### 1. 作为回调函数传入其他方法

```javascript
var user = {
    name : 'zhang',
    clickHandler : function(){
        console.log(this.name);
    }
}

button.onclick = user.clickHandler; //undefined，无法读取对象的name属性
button.onclick = user.clickHandler.bind(user); 
button.onclick = function () {
  user.clickHandler.call(user); 
}
```

#### 2. 闭包中的this

内部方法不能直接使用this关键字来访问外部方法的this变量，因为this变量只能被特定的方法本身使用。所以在使用含有匿名回调函数的参数时候，要特别注意this的指向。

```javascript
var user = {
    tournament: "The Masters",
    data: [{
        name: "T. Woods",
        age: 37
    },
    {
        name: "P. Mickelson",
        age: 43
    }],
    clickHandler: function() {
        this.data.forEach(function(person) {
            console.log("What is This referring to? " + this);
            console.log(person.name + " is playing at " + this.tournament);
        })
    },
    clickHandler2: function() {
        //保存this对象
        var that = this;
        this.data.forEach(function(person) {
            console.log("What is This referring to? " + that);
            console.log(person.name + " is playing at " + that.tournament);
        })
    }
}

user.clickHandler(); // What is "this" referring to? [object Window]
user.clickHandler2(); // What is "this" referring to? [object user]
```

#### 3. 借用方法(类数组常用)
类数组里是没有数组的方法的，因此可以借用数组的方法。

```javascript
var arr = Array.prototype.slice.call(arguments,0)  //之后就可以使用数组方法了

[].forEach(arguments, function (element) {
  console.log(element)
})
```
类数组对象的实现原理

##### 万物皆对象

数组和函数的本质是对象，所有对象都可以调用对象的方法，使用点和方括号访问属性

##### 鸭子类型

如果它走起来像鸭子，叫起来像鸭子，那他就是鸭子
对比上述就是只要有length属性，就能当数组用


## 参考文章
- 《javaScript语言精粹》
- 《javascript设计模式与开发实践》
- [Understand JavaScript’s “this” With Clarity, and Master It](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it)