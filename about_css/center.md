## 目录
---
- [内联元素 - text-align:center](#内联元素---text-align:center)
- [块状元素 ](#块状元素-)
    - [使用定位，设置left/right](#使用定位，设置left/right)
  - [不定宽水平居中](#不定宽水平居中)
    - [使用table](#使用table)
    - [设置行内元素](#设置行内元素)
    - [【推荐】使用定位 ](#【推荐】使用定位-)
      - [css3-transform](#css3-transform)
      - [多套一层，绝对+相对定位](#多套一层，绝对+相对定位)
- [【推荐】flex大法](#【推荐】flex大法)
  - [参考文章](#参考文章)
---
# 内联元素 - text-align:center
内联元素`<a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>`是没有水平居中的概念的，因为他们不单独占一行，所以没有居中的概念，这时候，如果你想把文本，图片什么的居中，可以把它嵌入一个div中，实现相对于父容器的居中：
```css
div{
    border:1px solid red;
    margin:20px;
.txtCenter{
	text-align:center;
<div class="txtCenter">我想要在父容器中水平居中显示。</div>
```
# 块状元素 
## 定宽块元素水平居中 margin-left/right:auto
块状元素也是默认没有居中的，因为它本身就是占用的一行（设置`text-align：center`是将它内部的元素居中）
如果我想把这个块元素居中，那么必须把它设置为`定宽块元素`。
注意：此时，**必须设置左右的margin为auto就能居中**
```css
div{
       border:1px solid red;
	width:200px;
	margin:20px auto;
```                           
### 使用定位，设置left/right
```css
.div{
            position:absolute/relative;
            width:200px;
            height:200px;
            top:50%;
            left:50%;
            margin-top:-100px;
            margin-left:-100px;
            background:red; 
```
## 不定宽水平居中
很多时候，我们不知道块的宽度应该设置为多少，希望它有一定的弹性，那么这时候，可以使用以下三种方法。
1. 使用`table`
2. 设置行内元素
3. 相对定位
### 使用table
是利用table标签的`长度自适应性`---即不定义其长度也不默认父元素body的长度（table其长度根据其内文本长度决定），因此可以看做一个`定宽度块元素`，然后再利用定宽度块状居中的`margin`的方法，使其水平居中。
```css
display:table; 
margin:0 auto;   
```
`margin: 0 auto`是很常用的居中方法
### 设置行内元素
设置 display: inline 方法：与第一种类似，显示类型设为 行内元素，进行不定宽元素的属性设置
```html
<div class="container">
    <ul>
    	<li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
    </ul>
</div>
```
```css
.container{text-align:center;}
.container ul{list-style:none;margin:0;padding:0;display:inline;}
.container li{margin-right:8px;display:inline;}
```
### 【推荐】使用定位 
不定宽的元素就是不知道到底多宽，使用定位无法调整，所以有2种解决方案
#### css3-transform
设置 position:relative/absolute 和 left:50%：利用 相对定位 的方式，将元素向左偏移 50% （此时50%是自身长宽），即达到居中的目的，然后通过transform的位移translate**这个移动端用的比较多因为css3兼容好**
```css
div{
            position:absolute/relative;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            background:red; 
```
#### 多套一层，绝对+相对定位
兼容性较好，基本都兼容
```html
<div class="outer">
    <div class="inner">
         
    </div>
</div>
```
```css3
.outer{
   position:absolute/relative;
   top:50%;
   left:50%;
.inner{
  position:relative;
  margin-left:-50%;
  margin-top:-50%;
```
# 【推荐】flex大法
外面套一个flex的container，直接使用justify-conent:center就可以了
```css
.flex-center {
  display: flex;
  justify-content: center;
```
## 参考文章
[https://css-tricks.com/centering-css-complete-guide/](https://css-tricks.com/centering-css-complete-guide/)
