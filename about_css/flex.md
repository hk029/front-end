## 目录
---
- [flex要素](#flex要素)
- [容器属性](#容器属性)
  - [flex-direction : row 创建主轴](#flex-direction-:-row-创建主轴)
  - [flex-wrap : nowrap单行，多行](#flex-wrap-:-nowrap单行，多行)
  - [flex-flow : direction+wrap](#flex-flow-:-direction+wrap)
  - [justify-content : flex-start 主轴对齐](#justify-content-:-flex-start-主轴对齐)
  - [align-items : stretch 侧轴对齐(单行的排列)](#align-items-:-stretch-侧轴对齐单行的排列)
  - [★align-content : stretch	多行侧轴对齐(坑)](#★align-content-:-stretch-多行侧轴对齐坑)
- [伸缩项目](#伸缩项目)
  - [flex-grow : 0 放大能力(至少设为非0)](#flex-grow-:-0-放大能力至少设为非0)
  - [★flex-shrink：1 收缩的能力（0为不收缩）](#★flex-shrink1-收缩的能力0为不收缩)
  - [flex-basis : auto 占主轴的大小(可以百分比)](#flex-basis-:-auto-占主轴的大小可以百分比)
  - [flex : flex-grow + flex-shrink + flex-basis 优先设置](#flex-:-flex-grow-+-flex-shrink-+-flex-basis-优先设置)
  - [align-self: 覆盖align-items的值](#align-self:-覆盖align-items的值)
- [用途](#用途)
  - [布局](#布局)
- [参考文章](#参考文章)
---

Flexbox布局（Flexible Box)模块旨在提供一个更加有效的方式制定、调整和分布一个容器里的项目布局，即使他们的大小是未知或者是动态的。（这里我们称为Flex）。

Flex布局主要思想是让容器有能力让其子项目能够改变其宽度、高度(甚至顺序)，以最佳方式填充可用空间（主要是为了适应所有类型的显示设备和屏幕大小）。Flex容器会使子项目（伸缩项目）扩展来填满可用空间，或缩小他们以防止溢出容器。

## flex要素

一个flex布局包含`flex容器`和`伸缩元素`

基本上，伸缩项目是沿着主轴（main axis），从主轴起点（main-start）到主轴终点（main-end）或者沿着侧轴（cross axis），从侧轴起点（cross-start）到侧轴终点（cross-end）排列。

![your text](http://o7bk1ffzo.bkt.clouddn.com/1501044556271)

根据伸缩项目排列方式不同，主轴和侧轴方向也有所变化

![your text](http://o7bk1ffzo.bkt.clouddn.com/1501044568172)

## 容器属性

### display: flex | inline-flex;

这个是用来定义伸缩容器，是内联还是块取决于设置的值。这个时候，他的所有子元素将变成flex文档流，称为伸缩项目。

```css
display: other values | flex | inline-flex;	
```

请注意：

- CSS的columns在伸缩容器上没有效果。

- float、clear和vertical-align在伸缩项目上没有效果。

### flex-direction : row 创建主轴

这个主要用来**创建主轴**，从而定义了伸缩项目放置在伸缩容器的方向。

```css
flex-direction: row | row-reverse | column | column-reverse	
```

- **row(默认值)**：在“ltr”排版方式下从左向右排列；在“rtl”排版方式下从右向左排列。

- **row-reverse：**与row排列方向相反，在“ltr”排版方式下从右向左排列；在“rtl”排版方式下从左向右排列。

- **column：**类似 于row，不过是从上到下排列

- **column-reverse：**类似于row-reverse，不过是从下到上排列。

### flex-wrap : nowrap单行，多行

这个主要用来定义伸缩容器里是单行还是多行显示，侧轴的方向决定了新行堆放的方向。

```css
flex-wrap: nowrap | wrap | wrap-reverse	
```

- **nowrap(默认值)：**伸缩容器单行显示，“ltr”排版下，伸缩项目从左到右排列；“rtl”排版上伸缩项目从右向左排列。

- **wrap：**伸缩容器多行显示，“ltr”排版下，伸缩项目从左到右排列；“rtl”排版上伸缩项目从右向左排列。

- **wrap-reverse：**伸缩容器多行显示，“ltr”排版下，伸缩项目从右向左排列；“rtl”排版下，伸缩项目从左到右排列。（和wrap相反）

  ​

### flex-flow : direction+wrap

这个是“flex-direction”和“flex-wrap”属性的缩写版本。同时定义了伸缩容器的主轴和侧轴。其默认值为“row nowrap”。

```css
flex-flow: <‘flex-direction’> || <‘flex-wrap’>	
```

### justify-content : flex-start 主轴对齐

这个是用来定义伸缩项目沿着主轴线的对齐方式。当一行上的所有伸缩项目都不能伸缩或可伸缩但是已经达到其最大长度时，这一属性才会对多余的空间进行分配。当项目溢出某一行时，这一属性也会在项目的对齐上施加一些控制。

```css
justify-content: flex-start | flex-end | center | space-between | space-around	
```

- **flex-start(默认值)：**伸缩项目向一行的起始位置靠齐。

- **flex-end：**伸缩项目向一行的结束位置靠齐。

- **center：**伸缩项目向一行的中间位置靠齐。

- **space-between：**伸缩项目会平均地分布在行里。第一个伸缩项目一行中的最开始位置，最后一个伸缩项目在一行中最终点位置。

- **space-around：**伸缩项目会平均地分布在行里，两端保留一半的空间。

![一个完整的Flexbox指南](http://www.w3cplus.com/sites/default/files/styles/print_image/public/blogs/2013/flexbox-guide-2.jpg)

### align-items : stretch 侧轴对齐(单行的排列)

这个主要用来定义伸缩项目可以在伸缩容器的当前行的侧轴上对齐方式。可以把他想像成侧轴（垂直于主轴）的“justify-content”。

```css
align-items: flex-start | flex-end | center | baseline | stretch	
```

- **flex-start：**伸缩项目在侧轴起点边的外边距紧靠住该行在侧轴起始的边。

- **flex-end：**伸缩项目在侧轴终点边的外边距靠住该行在侧轴终点的边 。

- **center：**伸缩项目的外边距盒在该行的侧轴上居中放置。

- **baseline：**伸缩项目根据他们的基线对齐。

- **stretch（默认值）：**伸缩项目拉伸填充整个伸缩容器。此值会使项目的外边距盒的尺寸在遵照「min/max-width/height」**属性的限制下尽可能接近所在行的尺寸。**

![一个完整的Flexbox指南](http://www.w3cplus.com/sites/default/files/styles/print_image/public/blogs/2013/flexbox-guide-3.jpg)

### ★align-content : stretch	多行侧轴对齐(坑)

这个属性主要用来调准伸缩行在伸缩容器里的对齐方式。类似于伸缩项目在主轴上使用“justify-content”一样。

**坑注： 请注意本属性在只有一行的伸缩容器上没有效果，会维持stretch。** 

```css
align-content: flex-start | flex-end | center | space-between | space-around | stretch	
```

![your text](http://o7bk1ffzo.bkt.clouddn.com/1501045558445)

## 伸缩项目

### order :0 控制出现顺序

默认情况下，伸缩项目是按照文档流出现先后顺序排列。然而，“order”属性可以控制伸缩项目在他们的伸缩容器出现的顺序。

**（-1可以出现在前面，1会出现在默认之后）**

```
order: <integer>	
```

### flex-grow : 0 放大能力(至少设为非0)

根据需要用来定义**在主轴**伸缩项目的扩展能力。它接受一个不带单位的值做为一个比例。主要用来决定伸缩容器剩余空间按比例应扩展多少空间。

注意：**如果设置了宽度/高度，那么最小就是这个宽度/高度，最大可以根据容器大小扩大。如果没设宽度，则会根据内容收缩**

- 如果所有伸缩项目的“flex-grow”设置了“1”，那么每个伸缩项目将设置为一个大小相等的剩余空间。

- 如果你给其中一个伸缩项目设置了“flex-grow”值为“2”，那么这个伸缩项目所占的剩余空间是其他伸缩项目所占剩余空间的两倍。

  ![your text](http://o7bk1ffzo.bkt.clouddn.com/1501046358670)

- 如果只部分元素设置了>0的数，那么其他的元素都尽可能收缩（到设置的宽度，或内容宽度），部分元素在**剩余空间内按比例排列**。

![your text](http://o7bk1ffzo.bkt.clouddn.com/1501046459655)

```
flex-grow: <number> (默认值为： 0)	
```

**负值无效（和0的功能一样）**。

### ★flex-shrink：1 收缩的能力（0为不收缩）

根据需要用来定义伸缩项目收缩的能力，同放大一样

注意：**如果元素设置了宽度/高度，那么也无法收缩**，对于没有设置宽度的，也不会收缩的小于内容宽度。

```
flex-shrink: <number> (默认值为： 1)	
```

**负值无效**

### flex-basis : auto 占主轴的大小(可以百分比)

这个用来设置伸缩基准值（就和你设置一个width/height一样），剩余的空间按比率进行伸缩。

**注：只是基准值，如果设置了flex-grow一样可以扩大。不过它会根据主轴自动设置height/width**

如果是row则设置width，如果是column则设置height。

```
flex-basis: <length> | auto (默认值为： auto)	
```

### flex : flex-grow + flex-shrink + flex-basis 优先设置

这是“flex-grow”、“flex-shrink”和“flex-basis”三个属性的缩写。其中第二个和第三个参数（flex-shrink、flex-basis）是可选参数。默认值为“0 1 auto”。

```
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]	
```

### align-self: 覆盖align-items的值

用来在**单独的伸缩项目**上覆写默认的对齐方式。

```
align-self: auto | flex-start | flex-end | center | baseline | stretch
```

## 用途

### 居中

flex实现居中不要太简单，justify-content:center, align-items:center就可以了

```html
<div class="flex-container">
  <div class="flex-item">1</div>
</div>
```

```css
.flex-container {
  height:400px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow:row wrap;
  justify-content: center;
  align-items:center;
```

![your text](http://o7bk1ffzo.bkt.clouddn.com/1501048007057)

### 布局

现在要实现任何布局都很简单了，双飞翼布局什么都是浮云。（因为有order）

- 根据排列，设置order

- 根据显示大小，设置flex（两边的侧栏主要是要设置basis）

```html
<div class="wrapper">
  <header class="header">Header</header>
  <article class="main">
    main
  </article>
  <aside class="aside aside-1">Aside 1</aside>
  <aside class="aside aside-2">Aside 2</aside>
  <footer class="footer">Footer</footer>
</div>
```

```css
.wrapper {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;  
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  font-weight: bold;
  text-align: center;
.wrapper > * {
  flex: 1 0 100%;
  height:60px;
.header {
  background: tomato;
  order:0;
.main {
  text-align: left;
  background: deepskyblue;
  order:2;
  flex: 1 0 auto;
  height:200px;
.aside-1 {
  background: gold;
  order:1;
  flex:0 0 200px;
.aside-2 {
  background: hotpink;
  order:3;
  flex:0 0 300px;
.footer {
  background: lightgreen;
  order:4;
body {
  padding: 2em; 
```

![your text](http://o7bk1ffzo.bkt.clouddn.com/1501048744424)

## 参考文章

[一个完整的Flexbox指南](http://www.w3cplus.com/css3/a-guide-to-flexbox.html)

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

