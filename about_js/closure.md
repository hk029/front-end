## 目录
---
- [闭包的原理](#闭包的原理)
- [闭包的使用场景](#闭包的使用场景)
  - [防止全局变量污染](#防止全局变量污染)
  - [在函数执行之前为要执行的函数提供具体参数](#在函数执行之前为要执行的函数提供具体参数)
- [参考文章](#参考文章)
---

## 闭包的原理

闭包的原理就是js只有函数作用域，函数外部无法访问函数内部的变量，然后函数内部可以访问函数外部的变量（作用域链），具体的可以参看[执行环境和作用域链](/about_js/context.md)。

>有权访问另一个函数作用域内变量的函数都是闭包。

其实所有的函数都可以看作闭包，但是闭包一般来说，闭包会维持一些变量。

通过访问外部变量，一个闭包可以维持（keep alive）这些变量。在内部函数和外部函数的例子中，外部函数可以创建局部变量，并且最终退出；**但是，如果任何一个或多个内部函数在它退出后却没有退出，那么内部函数就维持了外部函数的局部数据**。

闭包经常用于创建含有隐藏数据的函数（但并不总是这样）。

## 闭包的使用场景

### 延长生命周期

维持一个值在内存中不被消毁（记数器）

```js
function counter(){
    var i = 0;
    return function(){
        return i++;
    }
}
```

### 防止全局变量污染

```js
(function(){
var test2=222;
function test(){
    alert(test2);
}
test(); //测试闭包：222
)(); 
test2 //undefined
```

### 在函数执行之前为要执行的函数提供具体参数

```js
// setTimeOut 
// setInterval
// Ajax callbacks
// event handler[el.onclick=func 、 el.attachEvent("onclick",func)]
//无法传参的情况

var parm=222

function f1(){alert(111)}

function f2(obj){alert(obj)}

setTimeout(f1,500);//正确,无参数

var test1=f2(parm);//执行一次f2函数

setTimeout(f2,500);//undefined，传参失败

setTimeout(f2(parm),500);//参数无效，传参失败

setTimeout(function(parm){alert(parm)},500);//undefined，传参失败

document.getElementById("hello").onclick=f1;//正确

document.getElementById("hello").attachEvent("onclick",f1);//正确
```

setTimeout在非低版本ie下支持第3个以后的参数，可以作参数传入。

```js
//正确做法，使用闭包
function f3(obj){return function(){alert(obj)}}
var test2=f3(parm);//返回f3的内部函数的引用

setTimeout(test2,500);//正确,222

setTimeout(function(parm){alert(parm)},500,parm);//正确,222


document.getElementById("hello").onclick=test2;//正确,222

document.getElementById("hello").attachEvent("onclick",test2);//正确,222

//节点循环绑定事件
var lis = document.querySelectorAll('li');
for(var i = 0;i < lis.length;i++)
    lis[i].index = i;  //方法一
    lis[i].addEventListener('click',(function(i){
        return function(){   //方法二用闭包
            console.log(i);
                console.log(this.innerText);
        }
    })(i))
}
```

## 参考文章

[带你一分钟理解闭包--js面向对象编程](http://www.cnblogs.com/qieguo/p/5457040.html)

[Javascript闭包——懂不懂由你，反正我是懂了](http://kb.cnblogs.com/page/110782/)

