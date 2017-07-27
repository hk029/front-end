## 目录
---
- [目录](#目录)
- [offset家族](#offset家族)
  - [offsetWidth | Height](#offsetWidth-|-Height)
  - [ offsetLeft | Top ](#-offsetLeft-|-Top-)
  - [ offsetParent](#-offsetParent)
  - [ offsetTop和style.top的区别](#-offsetTop和styletop的区别)
- [scroll家族](#scroll家族)
  - [scrollTop    scrollLeft](#scrollTop----scrollLeft)
  - [scrollWidth | scrollHeight](#scrollWidth-|-scrollHeight)
  - [怎么得到scrollTop](#怎么得到scrollTop)
  - [scrollTo(x,y)](#scrollTox,y)
- [client家族](#client家族)
- [检测屏幕宽度 (可视区域)](#检测屏幕宽度-可视区域)
- [window.onresize 改变窗口事件  ](#windowonresize-改变窗口事件--)
---

## 目录

---

- [offset家族](#offset家族)

  - [offsetWidth | Height](#offsetWidth-|-Height)

  - [ offsetLeft | Top ](#-offsetLeft-|-Top-)

  - [ offsetParent](#-offsetParent)

  - [ offsetTop和style.top的区别](#-offsetTop和styletop的区别)

- [scroll家族](#scroll家族)

  - [scrollTop    scrollLeft](#scrollTop----scrollLeft)

  - [scrollWidth | scrollHeight](#scrollWidth-|-scrollHeight)

  - [怎么得到scrollTop](#怎么得到scrollTop)

  - [scrollTo(x,y)](#scrollTox,y)

- [client家族](#client家族)

  - [检测屏幕宽度 (可视区域)](#检测屏幕宽度-可视区域)

  - [window.onresize 改变窗口事件  ](#windowonresize-改变窗口事件--)

  - [检测屏幕宽度（分辨率）](#检测屏幕宽度分辨率)

---

## offset家族

**offset  自己的**   

目的：js中有一套方便的获取**元素尺寸的办法就是offset家族**；

![your text](http://o7bk1ffzo.bkt.clouddn.com/1490167075616)

### offsetWidth | Height

> 得到**对象的宽度和高度**(自己的，与他人无关) 

```javascript
offsetWidth=  width + border  +  padding  
div {  width:220px; border-left:2px solid red; padding:10px;}
div.offsetWidth =  220 + 2 + 20     
```

 为什么不用 `div.style.width`   因为**它只能得到行内**的数值

###  offsetLeft | Top 

> 返回距离上级盒子（**最近的带有定位**）左边的位置，如果父级都没有定位则以body 为准 ，offsetLeft 从**父级的padding 开始算** ，父亲的border 不算

这里的父级指的是所有上一级不仅仅指的是 父亲 还可以是 爷爷 曾爷爷 曾曾爷爷。。。。

 总结一下：  就是子盒子到定位的父盒子边框到边框的距离

![your text](http://o7bk1ffzo.bkt.clouddn.com/1490167148878)

###  offsetParent

> 返回改对象的父级（**带有定位**） 不一定是亲的爸爸，如果当前元素的父级元素没有进行CSS定位（position为absolute或relative），offsetParent为body。如果当前元素的父级元素中有CSS定位（position为absolute或relative），offsetParent取**最近的那个父级元素**。

```
var son = document.getElementById("son");
//alert(son.parentNode.id);
alert(son.offsetParent.tagName);  // tagName标签的名字  
```

###  offsetTop和style.top的区别

1. 最大区别在于  `offsetLeft`  可以返回**没有定位盒子的距离左侧的位置**。而 `style.top` 不可以只有定位的盒子才有 left  top right  

2.  `offsetTop` 返回的是**数字**，而 `style.top` 返回的是**字符串**，除了数字外还带有单位：px。

1. `offsetTop` 只读，而 `style.top` 可读写。

1. 如果没有给 HTML 元素指定过 top 样式，则 style.top 返回的是空字符串。

2. 最重要的区别  style.left 只能得到**行内样式**     offsetLeft 随便

## scroll家族

 Offset  自己的

 scroll   滚动的  (其实这才算偏移)

### scrollTop    scrollLeft

> 被卷去的头或左边

 它就是当你滑动滚轮浏览网页的时候网页隐藏在屏幕上方的距离

`scrollLeft` 用的少，很少屏幕横向滚动了。

### scrollWidth | scrollHeight

> 实际内容的宽度或高度

### 怎么得到scrollTop

我们学习一个事件 ：  页面滚动效果 `window.onscroll`

```javascript
window.onscroll = function() { 页面滚动语句  }
```

谷歌浏览器 和没有声明 DTD  `<DOCTYPE	> `：

```javascript
  document.body.scrollTop;  
```

火狐 和其他浏览器   

```javascript
  document.documentElement.scrollTop;
```

 ie9+  和 最新浏览器   都认识

```javascript
  window.pageXOffset;     pageYOffset  （scrollTop）
```

 兼容性写法：  

```javascript
   var scrollTop = window.pageYOffset || document.documentElement.scrollTop
          || document.body.scrollTop || 0;
```

### scrollTo(x,y)

window.scrollTo(x,y)  去往页面的  x 和  y 坐标 的位置（**一般我们只用y，x设为0就好**）

## client家族

**client  可视区域**    

- `offsetWidth`:   width +  padding  + border     （披着羊皮的狼）  

- `clientWidth`： width  +  padding     不包含border  

- `scrollWidth`:  大小是内容的大小    ![your text](http://o7bk1ffzo.bkt.clouddn.com/1490168586390)

## 检测屏幕宽度 (可视区域)

ie9及其以上的版本

```js
window.innerWidth  
```

标准模式

```js
document.documentElement.clientWidth
```

怪异模式

```js
document.body.clientWidth
```

自己封装一个返回可视区宽度和高度的函数。

> 注意：

> clientWidth   返回的是可视区 大小    浏览器内部的大小 

> window.screen.width   返回的是我们电脑的分辨率  跟浏览器没有关系

```javascript
  function client() {
        if(window.innerWidth != null)  // ie9 +  最新浏览器
        {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
        else if(document.compatMode === "CSS1Compat")  // 标准浏览器
        {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
        return {   // 怪异浏览器
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
```

## window.onresize 改变窗口事件  

> onresize 事件会在窗口或框架被调整大小时发生 

这个事件经常用来做响应式布局（css3之前），动态加载css样式表

```javascript
			function reSize() {
				var clientWidth = client().width;
				if(clientWidth > 980)
				{
					styleCss.href = "";
				}
				else if(clientWidth > 640)
				{
					styleCss.href = "css/pad.css";
				}
				else
				{
					styleCss.href = "css/mobile.css";
				}
			}
```

