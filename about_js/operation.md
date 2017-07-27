## 目录
---
- [js常用事件操作](#js常用事件操作)
    - [event  常见属性](#event--常见属性)
    - [pageX  clientX screenX 区别](#pageX--clientX-screenX-区别)
  - [常用事件](#常用事件)
  - [如何实现拖动](#如何实现拖动)
    - [ 防止选择拖动](#-防止选择拖动)
    - [完整代码](#完整代码)
  - [如何实现屏幕滚动检测](#如何实现屏幕滚动检测)
---

# js常用事件操作

##  事件对象

我们学过一些事件 :   onmouseover   onmouseout   onclick .....

```javascript
btn.onclick =function(event) {  语句 }
```

`event`  就是事件的对象    指向的是 事件  是  onclick  

再触发DOM上的某个事件时，会产生一个事件对象event，这个对象中包含着所有与事件有关的信息。所有浏览器都支持event对象，但支持的方式不同。

比如鼠标操作时候，会添加鼠标位置的相关信息到事件对象中。普通浏览器支持 event ， ie 678 支持 window.event

所以我们采取兼容性的写法 ： 

```js
  var event = event || window.event; 
```

### event  常见属性

| 属性          | 作用                         |

| ----------- | -------------------------- |

| data        | 返回拖拽对象的URL字符串（dragDrop）    |

| width       | 该窗口或框架的高度                  |

| height      | 该窗口或框架的高度                  |

| pageX       | 光标相对于该网页的水平位置（ie无）         |

| pageY       | 光标相对于该网页的垂直位置（ie无）         |

| screenX     | 光标相对于该屏幕的水平位置              |

| screenY     | 光标相对于该屏幕的垂直位置              |

| **target**  | **该事件被传送到的对象**             |

| **type**    | **事件的类型**                  |

| **clientX** | **光标相对于该网页的水平位置** （当前可见区域） |

| **clientY** | **光标相对于该网页的垂直位置**          |

### pageX  clientX screenX 区别

screen X  screenY   

 是以我们的电脑屏幕 为基准点   测量

pageX  pageY  

 以我们的  文档  （绝对定位）  的基准点对齐      ie678 不认识  

clientX   clientY

 以可视区域 为基准点   类似于   固定定位  

## 常用事件

### move

`onmousemove`    当鼠标移动的时候    就是说，**鼠标移动一像素就会执行的事件**

当鼠标再div 身上移动的时候，就会执行

div.onmouseover    和    div.onmousemove   区别  

     他们相同点   都是经过 div 才会触发 

     div.onmouseover    **只触发一次**

     div.onmousemove   **每移动一像素，就会触发一次**

   `onmouseup`       当鼠标弹起   

   `onmousedown`     当鼠标按下的时候  

## 如何实现拖动

### 拖动 原理

> 鼠标按下 接着 移动鼠标。 

```javascript
   bar.onmousedown =function(){
           document.onmousemove = function(){ 
            }
```

###  防止选择拖动

我们知道按下鼠标然后拖拽可以选择文字 的。

清除选中的内容

```javascript
window.getSelection? window.getSelection().removeAllRanges() : document.selection.empty();
```

### 完整代码

```js
window.onload = function  (argument) {
    function $(id){return document.getElementById(id);}
    var drag=$('drag_area'),
        move=$('box');
    DragThis(drag,move);
    function DragThis(drag_obj, move_obj)
    {
        drag_obj.onmousedown = function(event){
            var x = event.clientX - move_obj.offsetLeft - 100;  // 坐标补偿
            var y = event.clientY - move_obj.offsetTop - 100; 
            document.onmousemove = function(){
                var event = event || window.event;
                move_obj.style.left = event.clientX - x +'px';   //计算移动后的物体位置
                move_obj.style.top = event.clientY - y +'px';  
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();  //清除拖拽选中文字
            }
        }
    }
    document.onmouseup = function () { 
        document.onmousemove = null;
    }
```

## 如何实现屏幕滚动检测

