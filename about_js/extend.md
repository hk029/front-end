## 目录
---
- [对象的构造](#对象的构造)
- [继承](#继承)
- [es6的class](#es6的class)
- [create实现方法](#create实现方法)
- [参考文章](#参考文章)
---

## 对象的构造
根据红宝书上的介绍，一共有7种方法
- 工厂模式
- 构造函数模式
- 组合模式
- 动态原型模式
- 寄生构造函数模式
- 稳妥构造函数模式
```js
/*
         构造对象的方法
*/
//////////////// 工厂模式
function createA(name){
    var a = new A();
    a.name = name;
    a.say = function(){
        console.log(this.name);
    }
    return a;
}

//////////////// 一般是组合使用构造函数和原型模式
//构造函数式 
// -没有显式构造
// -可以实现对象检测
// -可以初始化变量
// 属性没有存在原型上，只跟自己有关不共享

function A(name) {
    this.name = name;
    this.haha = 'haha';
}

//原型模式（用于构造函数，防止多次实例化函数）
// 原型对象属性都是共享的，所以用来定义属性不合适（特别是引用类型）
A.prototype.say = function(){
    console.log(this.name);
}
// or
A.prototype = {
    constructor:A,   //如果constructor真的很重要的话（不过这样会导致constructor是enumerable）
    sayName:function(){
        console.log(this.name);
    }
}

//////////////// 动态模式（把原型放在构造函数内部，加判断只第一次使用的时候执行）
function A(name) {
    this.name = name;
    if(typeof this.sayName != "function"){   //只是判断原型是否初始化创建了这些方法
        A.prototype.sayName = function(){
            console.log(this.name);
        }
        A.prototype.……
    }
}

////////////////  寄生模式，类似工厂模式，只是返回了值
function SpecialArray(){
    var value = new Array();
    value.push.apply(value,arguments);
    value.newMethod = function(){};
    return value;
}

```
## 继承
红宝书提到的继承方式有以下几种
- 原型链
- 借用构造函数
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

es6之后可以用class继承
```js
/*
         继承的方法
*/
// 组合继承（问题是两次调用父类的构造函数）

// 1. 借用构造函数   首先把A的属性继承过来（解决超类引用类型变量被共享问题，解决无法向超类传递参数问题）
function B(name,age){
    A.call(this,name);
    this.age = age;
}

//修改B的原型，指向A,继承A的方法
B.prototype = new A();

//修改B原型的constructor   
B.prototype.constructor = B;

//定义B自己的方法
B.prototype.sayhi = function(){
    console.log('hi');
}

// 寄生组合式继承（圣杯继承）  最优方式！！！

// 1. 借用构造函数 
function B(name,age){
    A.call(this,name);
    this.age = age;
}
// 2. 调用寄生继承
inherit(B,A);
//定义B自己的方法
B.prototype.sayhi = function(){
    console.log('hi');
}

function inherit(subType,superType){
    var prototype = Object.create(superType.prototype);  //专门有个中间函数来传递原型链（不损坏super原型，又能添加方法）
    prototype.constructor = subType;
    subType.prototype = prototype;
}
```
## es6的class

利用class实现继承

下面利用ES6引入的新语法糖，class、extends关键字对上述实现继承的代码进行改写：

```js
class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    sayName () {
        console.log('my name is ' + this.name);
    }
class Student extends Person {
    constructor (name, age, school) {
        super(name, age);
        this.school = school;
    }
    saySchool () {
        console.log('my school is ' + this.school);
    }
```
class里的constructor 对应原来的构造函数
class里面的其他方法都是写在原来构造函数的prototype中的
子类直接通过extends 关键字进行继承
子类中可以通过super来调用父类中的方法
## create实现方法
```js
// create实现方法
function create(A){
    function F(){};
    F.prototype = A;
    return new F();
var a = new A('a');
var b = new B('b');
```
## 参考文章
《javascript高级程序设计》
[彻底理解Javascript中的原型链与继承](https://segmentfault.com/a/1190000007906832)
[白话解释 Javascript 原型继承(prototype inheritance)](https://segmentfault.com/a/1190000008226777)
