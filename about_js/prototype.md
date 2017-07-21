## 目录
---
- [目录](#目录)
- [基本概念：](#基本概念)
- [示例：](#示例)
- [参考文章：](#参考文章)
---

## 目录
---
- [目录](#目录)
- [基本概念：](#基本概念)
- [示例：](#示例)
- [参考文章：](#参考文章)
---
## 基本概念：
JS中，Function对象中会内置一些属性，其中包括prototype, \_\_proto\_\_
- prototype 即原型对象，它记录着函数对象的一些属性和方法
- \_\_proto\_\_ 在每个对象中都存在，可以理解为构造器的原型，即 \_\_proto\_\_ === constructor.prototype
## 示例：
声明一个Paginator函数对象，定义initPaginator方法，并使用其构造对象p，然后通过p调用initPaginator方法：
```
function Paginator() {
    ...
Paginator.prototype.initPaginator = function() { ... }
var p = new Paginator();
p.initPaginator();
```
p.initPaginator在调用时需要先查找该属性，按以下顺序在对象中查找，形成一个链条，即为__原型链__
```
p -> p.__proto__ === Paginator.prototype -> Paginator.prototype.__proto__ === Object.prototype -> Object.prototype.__proto__ === null
```
对于上面这个过程，可以发现：
- Paginator.prototype是由Object构造的，而Object.prototype.\_\_proto\_\_指向null，即是每个原型链的终结
- 所以原型链其实是通过\_\_proto\_\_实现的，当在对象中找不到对应属性时，会去对象的\_\_proto\_\_指向的对象中继续找
## 参考文章：
[图解prototype和__proto__](http://www.cnblogs.com/shuiyi/p/5305435.html)
[简单粗暴地理解js原型链--js面向对象编程](http://www.cnblogs.com/qieguo/p/5451626.html)
