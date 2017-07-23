## 目录
---
- [事件绑定](#事件绑定)
- [事件侦听](#事件侦听)
- [事件委托](#事件委托)
- [各类事件](#各类事件)
  - [键盘事件](#键盘事件)
  - [html事件](#html事件)
- [touch事件](#touch事件)
    - [触摸列表](#触摸列表)
- [ie和w3c不同绑定事件的区别，参数是什么，对象e参数区别](#ie和w3c不同绑定事件的区别，参数是什么，对象e参数区别)
  - [ie特色](#ie特色)
  - [绑定事件区别](#绑定事件区别)
  - [事件对象定位](#事件对象定位)
  - [鼠标当前坐标](#鼠标当前坐标)
  - [鼠标当前坐标(当前对象)](#鼠标当前坐标当前对象)
- [获取目标](#获取目标)
  - [阻止事件默认行为](#阻止事件默认行为)
  - [组织事件冒泡](#组织事件冒泡)
- [原生js实现事件代理，兼容浏览器](#原生js实现事件代理，兼容浏览器)
- [自定义事件模型](#自定义事件模型)
---

## 事件绑定

1. 元素上绑定

```
<a onclick="..."></a>
```

2. JS代码中为元素绑定(DOM0)

```
<script>
element.onclick() = function() {...}
</script>
```

3. JS中注册事件侦听器(DOM2)

```
<script>
element.addEventListener(event, function, useCapture); 
element.attachEvent(event,function);  //ie,注意IE的事件必须要加on...
</script>
```

使用事件侦听器有以下优点：

- 可以绑定多个事件

- 可以方便地解除绑定：element.removeEventListener() /  detachEvent()

- 可以指定是否使用事件捕获(useCapture)

## 事件侦听

事件侦听中的事件传递有两种方式，一种是冒泡事件流，一种是捕获事件流，一般只使用前者。

1. 冒泡事件流

当事件（鼠标点击等）在某一DOM元素上触发时，事件会沿着DOM树向父节点传递，如冒泡一样向上走，直到遇到绑定该事件处理器的节点。stopPropagation()可以中断冒泡。cancelBubble = true也可。若不中断，则事件会一直冒泡至文档根节点。

2. 捕获事件流

与冒泡相反，当事件在某一DOM元素上触发时，事件将从DOM根节点开始，向下传递至目标元素（不会被旁支捕获），目标元素的祖先节点若绑定有该事件类型监听器，且useCapture = true，则会对事件进行处理。

__注：每个事件发生时，会先从捕获事件流开始传递，至目标节点后再冒泡向上传递。这是W3C规范中规定的3个事件阶段：捕获阶段、目标阶段、冒泡阶段。__

## 事件委托

基于事件冒泡流，将事件处理器绑定在父元素上，提高JS执行效率，主要应用于以下场景：

1. 子元素是一组相似的元素，绑定同样的事件处理器

2. 子元素处于动态变化中，新增和删除都需要重新绑定或解绑事件处理器

在注册事件侦听器时，通过function的参数event.target可以获取到触发事件的元素。

## 各类事件

### 鼠标事件

- onclick 点击或者按下回车键时触发

- ondbclick 双击鼠标

- onmousedown 按下鼠标还未弹起

- onmouseup 用户释放鼠标按钮

- onmouseover 鼠标移到某个元素上方

- onmouseout 鼠标移出

- onmousemove 鼠标指针在元素上移动

### 键盘事件

- onkeydown

- onkeypress

- onkeyup

### html事件

- onload：页面完全加载后在window上面触发，

- onselect：当用户选择文本框中的一个或多个字符触发

- onchange：

- onfocus：

- onblur：

- onsubmit：

- onreset：

- onresize：

- onscroll：

## touch事件

- touchstart

- touchmove

- touchend

#### 触摸列表

- touches：当前屏幕所有触摸点的列表

- targettouches：当前对象上所有的触摸点列表

- changedtouches：涉及当前事件的触摸点的列表

## ie和w3c不同绑定事件的区别，参数是什么，对象e参数区别

### event常用属性

- type 事件名称

- target 目标节点（ie srcelement）

- preventDefault 不执行事件关联的默认动作 (ie returnValue =false)

- stopPropagation 停止传播派发事件 (ie cancelBubble=true)

- nodeName 找到当前元素的标签名

- altkey alt是否被按下 ctrlkey metakey

- button 哪个鼠标按键

- clientx 可视区域水平坐标

- screenx 屏幕区

- keyCode

### ie特色

- cancelBubble 默认为false

- srcelement 事件对象

- returnvalue 默认true  

- fromElement toElement

- offsetx 当前元素的位置

### 绑定事件区别

- addEventListener('click',function(){},false)

- attachEvent（'onclick', function(){}）

兼容事件处理

  ```javascript
  var addEvent = {
          on:function(elem, type, handler){
                  if(elem.addEventListener{
                          elem.addEventListener(type, handler, false);
                  }else if(elem.attachEvent){
                          elem.attachEvent('on'+type, handler);
                  }
          }
  }
  var elem = document.getElementById('img');
  addEvent.on(elem, 'click', function(){
          console.log('添加点击事件')
  })
  ```

### 事件对象定位

event

ie8之前window.event

### 鼠标当前坐标

- ie event.x event.y 相对于最近的父元素的位置

- ff event.pagex event.pagey 网页

- 通用 event.clientx event.clienty

### 鼠标当前坐标(当前对象)

- ie event.offsetx event.offsety

- ff event.layerx event.layery

## 获取目标

- IE：oEvent.srcElement

- DOM : oEvent.target

### 阻止事件默认行为

- IE：oEvent.returnValue = false

- DOM : oEvent.preventDefault

### 组织事件冒泡

- IE：oEvent.cancelBubble = true;

- DOM:oEvent.stopPropagation();

## 原生js实现事件代理，兼容浏览器

```javascript
function delegateEvent(interfaceEle, selector, type, fn) {
        if(interfaceEle.addEventListener()) {
                interfaceEle.addEventListener(type, eventFn);
        }
        else {
                interfaceEle.attachEvent(type, eventFn);
        }
        function eventFn(fn) {
                var e = event || window.event;
                var target = e.target || e.srcElement;
                if (matchSelector(target, selector)) {
                        if(fn) {
                                fn.call(target, e); //改变this指向
                        }
                }
        }
        function matchSelector(ele, selector)  {
                
                //if use id
                if(selector.charAt(0) === '#') {
                        return ele.id === selector.slice(1);
                }
                //if use class
                if(selector.charAt(0) === '.') {
                        return ele.className === selector.slice(1);
                }
                return ele.tagName.toLowerCase() === selector.toLowerCase();
        }
//调用
var odiv = document.getElementById('odiv');
delegateEvent(odiv,'a','click',function () {
        // body...
        alert('1');
```

## 自定义事件模型

```javascript
function Emitter() {
        this._listener = {};     //listener
//注册事件
Emitter.prototype.bind = function (eventName, callback) {
        var listener = this._listener[eventName] || [];
        listener.push(callback);
        this._listener[eventName] = listener;
Emitter.prototype.trigger = function (eventName) {
        var args = Array.prototype.slice.apply(arguments).slice;//将arguments转换为数组，并获取参数
        var listener = _listener[eventName];
        listener.forEach(function(item) {
                try {
                        item.apply(this,args);     //this调用此函数
                }catch(e) {
                        console.error(e);
                }
        })
var emmitter = new emmitter();
emmitter.bind('myevent',function(arg1){
        console.log(arg1,arg2);
emmitter.trigger('myevent','','')
```

