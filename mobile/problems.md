## 目录
---
- [移动端开发的坑](#移动端开发的坑)
  - [1px问题](#1px问题)
  - [禁止用户选中文字](#禁止用户选中文字)
  - [click 300ms延迟问题](#click-300ms延迟问题)
  - [click点击区域](#click点击区域)
  - [消除transition闪屏](#消除transition闪屏)
  - [ 忽略将页面中的数字识别为电话号码](#-忽略将页面中的数字识别为电话号码)
  - [忽略Android平台中对邮箱地址的识别](#忽略Android平台中对邮箱地址的识别)
  - [虚拟键盘导致 fixed 元素错位](#虚拟键盘导致-fixed-元素错位)
---

## 移动端开发的坑

### 点击穿越

### 1px问题

### 设计高性能CSS3动画的几个要素

尽可能地使用合成属性transform和opacity来设计CSS3动画，不使用position的left和top来定位

利用translate3D开启GPU加速

### 禁止用户选中文字

禁止ios和android用户选中文字

.css{-webkit-user-select:none}

### click 300ms延迟问题

`ontouchstart -> ontouchmove -> ontouchend -> onclick`

- 我用ontouchstart，然后加上自己的判断

### click点击区域

- 使用click会出现绑定点击区域闪一下的情况，华为等手机上有非常丑的黄框，

  解决：给该元素一个样式如下

  `-webkit-tap-highlight-color: rgba(0,0,0,0);`

### 消除transition闪屏

两个方法：使用css3动画的时尽量利用3D加速，从而使得动画变得流畅。

动画过程中的动画闪白可以通过 backface-visibility 隐藏。

```js
-webkit-transform-style: preserve-3d;
/*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
-webkit-backface-visibility: hidden;
/*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/
```

###  忽略将页面中的数字识别为电话号码

`<meta name="format-detection" content="telephone=no" />`

### 忽略Android平台中对邮箱地址的识别

`<meta name="format-detection" content="email=no" />`

### 虚拟键盘导致 fixed 元素错位

fixed元素一定会伴随虚拟键盘的出现，但是虚拟键盘只是“贴”在了viewport上，表面上不会对dom产生“任何”影响，但是这个时候fixed元素表现却变得怪异起来，会错位。

解决原理：**虚拟键盘弹出时将fixed元素设置为static，虚拟键盘消失时候设置回来。**

不使用fixed，页面内部滚动

解决方案：**由于虚拟键盘出现并未抛出事件，而检测scroll或者resize事件，皆会有一定延迟，会出现闪烁现象。则当前获取焦点元素为文本元素，就将fixed元素设置为static。**

