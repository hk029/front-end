## let & const

let和const注意：只有在`{}`中才有作用域（if单语句不加{}  不能用let）

```javascript
if(1) let i = 1
Uncaught SyntaxError: Unexpected identifier
```

const表示常量必须在**定义的时候赋值**，且**不能修改**，否则报错

### 重复定义会报错
- let定义后，不能再用let,var,const重复定义
- 先var再let可以
- 传的参数名默认也是let定义的


```javascript
// 报错
function () {
  let a = 10;
  var a = 1;
}

function () {
  var a = 10;
  let a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;
}

function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```



### for的特殊性

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function(){console.log(i)},0)
}
//3 3 3 

for (let i = 0; i < 3; i++) {
  setTimeout(function(){console.log(i)},0)
}
//0 1 2 
```

`for`循环还有一个特别之处，**就是循环语句部分是一个父作用域**，而循环体内部是一个单独的子作用域。

```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
```

### 无变量提升

`let`命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

### ！暂时性死区（temporal dead zone，简称 TDZ）

只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}

if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

### typeof不再绝对安全

在没有`let`之前，`typeof`运算符是百分之百安全的，永远不会报错。现在这一点不成立了。如果一个变量用let申明，但是在typeof之后，typeof`运行时就会抛出一个`ReferenceError`。**参考暂时性死区**



### 立即执行函数不必要

块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。

```javascript
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

### 不属于顶层对象

`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。

```javascript
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```



### !const本质

`const`实际上保证的，并不是变量的值不得改动，**而是变量指向的那个内存地址不得改动**。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。

但对于引用类型（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，`const`只能保证这个指针是固定的，**至于它指向的数据结构是不是可变的，就完全不能控制了**。因此，**将一个对象声明为常量必须非常小心**。
- 赋值操作不被运行
- 修改对象操作可以进行！！

```javascript
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

上面代码中，常量`foo`储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把`foo`指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

下面是另一个例子。

```javascript
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

上面代码中，常量`a`是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给`a`，就会报错。

如果真的想将对象冻结，应该使用`Object.freeze`方法。

```javascript
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

上面代码中，常量`foo`指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

```javascript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```


## 参考文章
[ECMAScript 6 入门](http://es6.ruanyifeng.com/)