## 目录
---
---

首先介绍一下链式调用的特点和优点把：代码简洁易读，减少了多次重复使用同一个变量。

最常见的就是[jQuery](http://lib.csdn.net/base/jquery)库里面，例如$(‘#id’).show().hide().show()；这样的代码。 

如果想像上面这么调用我们需要这样做，就是先创建一个对象，然后包装此对象，把方法挂在其上,所有的方法返回this。

```js
window.$ = function(){
    return new _$(id);
function _$(id){
    this.elements = document.getElementById(id);
_$.prototype = {
    constructor:_$,
    hide:function(){
        console.log('hide');
        return this;
    },
    show:function(){
        console.log('shwo');
        return this;
    },
    getName:function(callback){
        if(callback){
            callback.call(this,this.name);
        }
        return this;
    },
    setName:function(name){
        this.name = name;
        return this;
    }
$('id').setName('xesam').getName(function(name){
    console.log(name);
}).show().hide().show().hide().show();
```

