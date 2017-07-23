## 目录
---
- [lazyman](#lazyman)
  - [代码](#代码)
---

# lazyman

lazyman是一道很经典的面试题，大概题目意思是实现链式调用。

> 实现一个LazyMan，可以按照以下方式调用:

> LazyMan(“Hank”)输出:

> Hi! This is Hank!

> LazyMan(“Hank”).sleep(10).eat(“dinner”)输出

> Hi! This is Hank!

> //等待10秒..

> Wake up after 10

> Eat dinner~

> LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出

> Hi This is Hank!

> Eat dinner~

> Eat supper~

> LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出

> //等待5秒

> Wake up after 5

> Hi This is Hank!

> Eat supper

> 以此类推。

关键是实现事件的调度，这里可以用一个队列来实现，要实现链式调用，一定要记得返回this

## 代码

```javascript
function _LazyMan(name) {
    this.tasks = [];   
    var self = this;
    var fn =(function(n){
        var name = n;
        return function(){
            console.log("Hi! This is " + name + "!");
            self.next();
        }
    })(name);
    this.tasks.push(fn);
    setTimeout(function(){
        self.next();
    }, 0); // 在下一个事件循环启动任务
/* 事件调度函数 */
_LazyMan.prototype.next = function() { 
    var fn = this.tasks.shift();
    fn && fn();
_LazyMan.prototype.eat = function(name) {
    var self = this;
    var fn =(function(name){
        return function(){
            console.log("Eat " + name + "~");
            self.next()
        }
    })(name);
    this.tasks.push(fn);
    return this; // 实现链式调用
_LazyMan.prototype.sleep = function(time) {
    var self = this;
    var fn = (function(time){
        return function() {
            setTimeout(function(){
                console.log("Wake up after " + time + "s!");
                self.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.push(fn);
   return this;
_LazyMan.prototype.sleepFirst = function(time) {
    var self = this;
    var fn = (function(time) {
        return function() {
            setTimeout(function() {
                console.log("Wake up after " + time + "s!");
                self.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.unshift(fn);
    return this;
/* 封装 */
function LazyMan(name){
    return new _LazyMan(name);
```

