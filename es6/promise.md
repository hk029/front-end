## 目录
---
- [promise](#promise)
    - [特点](#特点)
    - [缺点](#缺点)
  - [promise基本写法](#promise基本写法)
  - [then](#then)
    - [链式调用then](#链式调用then)
  - [catch](#catch)
  - [all](#all)
    - [例子](#例子)
  - [race](#race)
    - [超时出错](#超时出错)
  - [resolve](#resolve)
  - [done()](#done)
  - [finally()](#finally)
  - [promise实现Ajax](#promise实现Ajax)
- [遍历器](#遍历器)
  - [模拟实现](#模拟实现)
---

# promise

## 介绍

所谓`Promise`，简单说就是一个**状态容器**，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

### 特点

`Promise`对象有以下两个特点。

- **对象的状态不受外界影响**。`Promise`对象代表一个异步操作，有三种状态：`Pending`（进行中）、`Resolved`（已完成，又称 Fulfilled）和`Rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

- **一旦状态改变，就不会再变**，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`Pending`变为`Resolved`和从`Pending`变为`Rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了`Promise`对象，就可以**将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数**。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。

### 缺点

`Promise`也有一些缺点：首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`Pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 stream 模式是比部署`Promise`更好的选择。

## promise基本写法

```javascript
var promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
//需要传参数的
var promise = function(parm){
  return new Promise(function(resolve, reject) {
    // ... some code using parm
    if (/* 异步操作成功 */){
      resolve(value);
    } else {
      reject(error);
    }
  });
```

## then

then后面其实是有两个参数的，第一个是执行成功调用的回调函数，另一个是失败时候调用的调函数

```javascript
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```

但是我们一般不使用第二个参数，而是是用catch去捕获冒泡产生的错误。

### 链式调用then

采用链式的`then`，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。

```javascript
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function funcA(comments) {
  console.log("Resolved: ", comments);
}, function funcB(err){
  console.log("Rejected: ", err);
});
```

上面代码中，第一个`then`方法指定的回调函数，返回的是另一个Promise对象。这时，第二个`then`方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为Resolved，就调用`funcA`，如果状态变为Rejected，就调用`funcB`。

如果采用箭头函数，上面的代码可以写得更简洁。

```javascript
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("Resolved: ", comments),
  err => console.log("Rejected: ", err)
);
```

## catch

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。

跟传统的`try/catch`代码块不同的是，如果没有使用`catch`方法指定错误处理的回调函数，Promise对象抛出的错误不会传递到外层代码，即不会有任何反应。

Node 有一个`unhandledRejection`事件，专门监听未捕获的`reject`错误。

```javascript
process.on('unhandledRejection', function (err, p) {
  console.error(err.stack)
});
```

需要注意的是，`catch`方法返回的还是一个 Promise 对象，因此后面还可以接着调用`then`方法。`catch`方法之中，还能再抛出错误（如果后面没有别的`catch`方法了，导致这个错误不会被捕获，也不会传递到外层）

## all

Promise.all([])的功能就是让多个promise对象打包，全部执行完再执行接下来的方法。它可以将多个Promise实例，包装成一个新的Promise实例。

```javascript
var p = Promise([p1,p2,p3]);
```

它的状态变化：

- 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值**组成一个数组**，传递给`p`的回调函数。

- 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数

### 例子

下面是一个具体的例子。

```javascript
// 生成一个Promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON("/post/" + id + ".json");
});
Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```

## race

根据名字可以知道，race的意思是竞赛，`Promise.race`方法同样是将多个Promise实例，包装成一个新的Promise实例。

```
var p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

### 超时出错

通过这个函数，我们可以实现promise的超时控制，（通过把一个超时函数包装成promise对象加入race数组）

```javascript
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);
p.then(response => console.log(response));
p.catch(error => console.log(error));
```

## resolve

有时需要将现有对象转为Promise对象，`Promise.resolve`方法就起到这个作用。

```
var jsPromise = Promise.resolve($.ajax('/whatever.json'));
```

上面代码将jQuery生成的`deferred`对象，转为一个新的Promise对象。

`Promise.resolve`等价于下面的写法。

```
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

`Promise.resolve`方法的参数分成四种情况。

**（1）参数是一个Promise实例**

如果参数是Promise实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

**（2）参数是一个thenable对象**

`thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

```javascript
let thenable = {  
  then: function(resolve, reject) {   
    resolve(42);  
  }
};
```

`Promise.resolve`方法会将这个对象转为Promise对象，然后就立即执行`thenable`对象的`then`方法。

**（3）参数不是具有then方法的对象，或根本就不是对象**

如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的Promise对象，状态为`Resolved`。`Promise.resolve`方法的参数，会同时传给回调函数。

**（4）不带有任何参数**

`Promise.resolve`方法允许调用时不带参数，直接返回一个`Resolved`状态的Promise对象。

所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用`Promise.resolve`方法。

```
var p = Promise.resolve();
p.then(function () {
  // ...
});
```

上面代码的变量`p`就是一个Promise对象。

需要注意的是，立即`resolve`的Promise对象，**是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。(在setTimeout触发之前)**

```javascript
setTimeout(function () {
  console.log('three');
}, 0);
Promise.resolve().then(function () {
  console.log('two');
});
console.log('one');
// one
// two
// three
```

## done()

Promise对象的回调链，不管以`then`方法或`catch`方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个`done`方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。

```javascript
asyncFunc()
  .then(f1)
  .catch(r1)
  .then(f2)
  .done();
```

它的实现代码相当简单。

```javascript
Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      // 抛出一个全局错误
      setTimeout(() => { throw reason }, 0);
    });
};
```

从上面代码可见，`done`方法的使用，可以像`then`方法那样用，提供`Fulfilled`和`Rejected`状态的回调函数，也可以不提供任何参数。但不管怎样，`done`都会捕捉到任何可能出现的错误，并向全局抛出。

## finally()

`finally`方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与`done`方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

下面是一个例子，服务器使用Promise处理请求，然后使用`finally`方法关掉服务器。

```javascript
server.listen(0)
  .then(function () {
    // run test
  })
  .finally(server.stop);
```

它的实现也很简单。

```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

上面代码中，不管前面的Promise是`fulfilled`还是`rejected`，都会执行回调函数`callback`。

## promise实现Ajax

```javascript
var Ajax = function(url,type='json'){
    return new Promise((resolve,reject) => {
        var client = new XMLHttpRequest();
        client.open('GET',url);
        client.onreadystatechange = handle;
        client.responseType = type;
        client.setRequestHeader('Accept',"application/json");
        client.send();
        var handle = ()=>{
            if(this.readyState !== 4)
            {
                return ;
            }
            else if(this.status === 200)
            {
                resolve(this.response);
            }else{
                reject(new Error(this.status));
            }
        };
    });
Ajax("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

# 遍历器

Iterator的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是ES6创造了一种新的遍历命令`for...of`循环，Iterator接口主要供`for...of`消费。

Iterator的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，**遍历器对象本质上，就是一个指针对象。**

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

## 模拟实现

下面是一个模拟`next`方法返回值的例子。

```javascript
var it = makeIterator(['a', 'b']);
it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {   
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
//对于遍历器对象来说，done: false和value: undefined属性都是可以省略的，因此上面的makeIterator函数可以简写成下面的形式。
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++]} :
        {done: true};
    }
  };
```

## promise 串行
在 .then() 里面返回一个 promise 对象就是一种串行。我们需要构造一个类似下面这样的 promise 对象：
```js
promise1
  .then(function() { return promise2; })
  .then(function() { return promise3; })
  .then(...);
```
将一个数组转换为一个值，使用 reduce 可以实现：
```js
[1000, 2000, 3000]
  .reduce(function(promise, timeout) {
    return promise.then(function() {
      return later(timeout);
    });
  }, Promise.resolve())  //这里第2个参数是传入初始值
  .then(function(data) {
    // data = later_3000
  })
  .catch(function(err) {
  });
```
上面代码将以下面的方式来执行：
```js
Promise.resolve()
  .then(function() { return later(1000); })
  .then(function() { return later(2000); })
  .then(function() { return later(3000) })
  .then(function(data) {
    // data = later_3000
  })
  .catch(function(err) {
  });
```
