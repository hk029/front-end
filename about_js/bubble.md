## 目录
---
- [目录](#目录)
- [html冒泡和事件捕获机制](#html冒泡和事件捕获机制)
- [DOM事件流](#DOM事件流)
  - [冒泡顺序](#冒泡顺序)
  - [不触发冒泡的事件](#不触发冒泡的事件)
- [target&currentTarget](#target&currentTarget)
- [阻止冒泡](#阻止冒泡)
  - [IE](#IE)
  - [兼容写法](#兼容写法)
- [阻止冒泡应用](#阻止冒泡应用)
---

## 目录

---

- [html冒泡和事件捕获机制](#html冒泡和事件捕获机制)

- [DOM事件流](#DOM事件流)

  - [冒泡顺序](#冒泡顺序)

  - [不触发冒泡的事件](#不触发冒泡的事件)

- [target&currentTarget](#target&currentTarget)

- [阻止冒泡](#阻止冒泡)

  - [IE](#IE)

  - [兼容写法](#兼容写法)

- [阻止冒泡应用](#阻止冒泡应用)

---

## html冒泡和事件捕获机制

> 事件冒泡: 当一个元素上的事件被触发的时候，比如说鼠标点击了一个按钮，同样的事件将会在那个元素的所有祖先元素中被触发。这一过程被称为事件冒泡；这个事件从原始元素开始一直冒泡到DOM树的最上层

> 事件捕获：与冒泡刚好相反

比如一个简单的代码：

```
<body><button id="btn">点击</button></body></html>
<script>    
var btn = document.getElementById("btn");
    document.onclick = function() {
              console.log('document');    
    }
    btn.onclick = function(event) {
              console.log('button');   
   }
</script>
```

我点击按钮后，同时也触发了`document`的事件。这不是我们想要的结果

## DOM事件流

（IE8之前的不支持）

DOM2事件流规定事件流包括3个阶段：`捕获阶段`，`目标阶段`，`冒泡阶段`，可以根据第二个参数判断是否在捕获阶段。

```js
addEventListener('click',fn(),false) //冒泡阶段
addEventListener('click',fn(),true)  //捕获阶段
```

### 冒泡顺序

IE 6.0:

**div -> body-> html -> document**

其他浏览器，会冒到window

**div -> body-> html -> document -> window**

### 不触发冒泡的事件

但是并不是所有的的事件都会触发冒泡，以下事件不冒泡：`blur`、`focus`、`load`、`unload`

要实现`blur`和`focus`的代理：

`blur`和`focus`在ie下可以通过focusin和focusout事件（支持冒泡）

```js
el.onfocusin = focusHandler;
el.onfocusout = blurHandler;
```

其他的情况下，可以使用捕获实现代理

```js
el.addEventListener('focus', focusHandler, true);
el.addEventListener('blur', blurHandler, true);
```

## target&currentTarget

target在事件流的目标阶段；currentTarget在事件流的捕获，目标及冒泡阶段。只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象（一般为父级）。

## 阻止冒泡

### 正常浏览器

正常浏览器使用的是`stopPropagation`方法，

event.stopPropagation()

### IE

ie低版本的使用的是`cancelBubble` 属性

event.cancelBubble =true

### 兼容写法

```
if(event && event.stopPropagation)         
{              
event.stopPropagation();  //  w3c 标准          
}          
else          
{            
event.cancelBubble = true;  // ie 678  ie浏览器 
```

## 阻止冒泡应用

最简单的用法就是**弹出对话框点击空白处隐藏**。我们肯定会在`document`上绑定一个`onclick`事件，用来**隐藏对话框**，但是我们页面上肯定也有一个元素（比如`注册按钮`），用来**点击弹出对话框**。

这时候就有问题了，我们点击`注册按钮`本来想弹出一个对话框，但是同时响应了document的onclick事件，直接隐藏了。所以这个时候，就要对`注册按钮`进行冒泡的阻止。

```js
 login.onclick = function(event) {
        $("mask").style.display = "block";
        $("show").style.display = "block";
        document.body.style.overflow = "hidden";  // 不显示滚动条
        //取消冒泡
        var event = event || window.event;
        if(event && event.stopPropagation)
        {
            event.stopPropagation();
        }
        else
        {
            event.cancelBubble = true;
        }
    }
```

