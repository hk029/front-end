## 目录
---
- [变量解构](#变量解构)
    - [右边可以是字符串](#右边可以是字符串)
    - [右边不可遍历，出错](#右边不可遍历，出错)
    - [解构允许默认值](#解构允许默认值)
  - [对象型](#对象型)
    - [不在声明使用需要加括号](#不在声明使用需要加括号)
    - [嵌套对象](#嵌套对象)
    - [允许默认值](#允许默认值)
    - [类数组](#类数组)
    - [数字,布尔转换成对象](#数字,布尔转换成对象)
  - [用途](#用途)
    - [从函数返回多个值](#从函数返回多个值)
    - [函数参数的定义](#函数参数的定义)
    - [提取JSON数据](#提取JSON数据)
    - [参数默认值](#参数默认值)
    - [遍历Map结构(for..of)](#遍历Map结构forof)
  - [参考文章](#参考文章)
---

# 变量解构

## 数组型

只要**形式一样就能结构成功**，右边多没事，右边少就会有`undefined`

```javascript

let [foo, [[bar], baz]] = [1, [[2], 3]];

let [ , , third] = ["foo", "bar", "baz"];  //third  "baz"

let [head, ...tail] = [1, 2, 3, 4]; //head  1 //tail [2, 3, 4]

let [x, y, ...z] = ['a']; //x  "a"  // y  undefined // z []

```

`...`表示rest元素数组。

### 右边可以是字符串

因为字符串是一个类数组(array-like)，有length

```javascript

const [a, b, c, d, e] = 'hello'; //a  "h"// b "e"

```

### 右边不可遍历，出错

如果等号的右边不是数组（或者严格地说，**不是可遍历的结构**，参见《Iterator》一章），那么将会报错。

```javascript

// 报错

let [foo] = 1;

let [foo] = false;

let [foo] = NaN;

let [foo] = undefined;

let [foo] = null;

let [foo] = {};

```

事实上，只要某种数**据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。**Generator是原生具有iterator接口的

```javascript

function* fibs() {

  let a = 0;

  let b = 1;

  while (true) {

    yield a;

    [a, b] = [b, a + b];

  }

let [first, second, third, fourth, fifth, sixth] = fibs();

sixth // 5

```

### 解构允许默认值

ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，如果一个数组成员**不严格**等于`undefined`，默认值是不会生效的。(**比如null**)

```javascript

let [foo = true] = []; // foo  true

let [x, y = 'b'] = ['a']; // x='a', y='b'

let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

let [x = 1] = [null]; //x null

```

## 对象型

对象解构看**属性名**！如果变量名和属性名一致可以直接使用属性名，否则要用`属性名:变量名`取值（注意变量名放后面）

> 其实可以看作通过属性名把值取出来，然后值解构到对应的变量上

> 所以属性名只是模式

```javascript

let { bar, foo } = { foo: "aaa", bar: "bbb" };

= let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };

let { baz } = { foo: "aaa", bar: "bbb" }; //baz  undefine

var { foo: baz } = { foo: 'aaa', bar: 'bbb' }; //baz "aaa"

let obj = { first: 'hello', last: 'world' };

let { first: f, last: l } = obj; //f 'hello'

```

### 不在声明使用需要加括号

由于`{}`的二义性，所以在`{}`开头的特殊语句，需要加上`()`

```javascript

let foo;

{foo} = {foo: 1};  //报错

({foo} = {foo: 1}); // 成功

```

### 嵌套对象

和数组一样，解构也可以用于嵌套结构的对象。

```

let obj = {

  p: [

    'Hello',

    { y: 'World' }

  ]

};

let { p: [x, { y }] } = obj;

```

注意，这时`p`是**模式**，不是变量，因此不会被赋值。

### 允许默认值

```javascript

var {x = 3} = {};

x // 3

var {x, y = 5} = {x: 1};

x // 1

y // 5

```

### 类数组

类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

```javascript

let {length : len} = 'hello';

len // 5

let arr = [1, 2, 3];

let {0 : first, [arr.length - 1] : last} = arr;

first // 1

last // 3

```

### 数字,布尔转换成对象

解构赋值时，如果等号右边是数值和布尔值，**则会先转为对象。**

```javascript

let {toString: s} = 123;

s === Number.prototype.toString // true

let {toString: s} = true;

s === Boolean.prototype.toString // true

```

上面代码中，数值和布尔值的包装对象都有`toString`属性，因此变量`s`都能取到值。

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。

```javascript

let { prop: x } = undefined; // TypeError

let { prop: y } = null; // TypeError

```

## 用途

### 交换变量

写法不仅简洁，而且易读，语义非常清晰。

```javascript

let x = 1;

let y = 2;

[x, y] = [y, x];

```

### 从函数返回多个值

```javascript

// 返回一个数组

function example() {

  return [1, 2, 3];

let [a, b, c] = example();

// 返回一个对象

function example() {

  return {

    foo: 1,

    bar: 2

  };

let { foo, bar } = example();

```

### 函数参数的定义

解构赋值可以方便地将一组参数与变量名对应起来。

```javascript

// 参数是一组有次序的值

function f([x, y, z]) { ... }

f([1, 2, 3]);

// 参数是一组无次序的值

function f({x, y, z}) { ... }

f({z: 3, y: 2, x: 1});

```

### 提取JSON数据

解构赋值对提取JSON对象中的数据，尤其有用。

```javascript

let jsonData = {

  id: 42,

  status: "OK",

  data: [867, 5309]

};

let { id, status, data: number } = jsonData;

console.log(id, status, number);

// 42, "OK", [867, 5309]

```

### 参数默认值

```javascript

jQuery.ajax = function (url, {

  async = true,

  beforeSend = function () {},

  cache = true,

  complete = function () {},

  crossDomain = false,

  global = true,

  // ... more config

}) {

  // ... do stuff

};

```

指定参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句。

### 遍历Map结构(for..of)

任何部署了Iterator接口的对象，都可以用`for...of`循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。

```javascript

var map = new Map();

map.set('first', 'hello');

map.set('second', 'world');

for (let [key, value] of map) {

  console.log(key + " is " + value);

// first is hello

// second is world

```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```javascript

// 获取键名

for (let [key] of map) {

  // ...

// 获取键值

for (let [,value] of map) {

  // ...

```

## 参考文章

[ECMAScript 6 入门](http://es6.ruanyifeng.com/)

