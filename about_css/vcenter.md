## 目录
---
- [垂直居中](#垂直居中)
  - [单行文字——使用line-height](#单行文字——使用line-height)
  - [table大法](#table大法)
  - [神奇的伪类居中](#神奇的伪类居中)
  - [flex大法](#flex大法)
  - [参考文章](#参考文章)
---

# 垂直居中

## padding

有时候居中仅仅是因为上下的padding一样而已。

<iframe height='265' scrolling='no' title='Centering text (kinda) with Padding' src='//codepen.io/voidsky/embed/wJzMKj/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/voidsky/pen/wJzMKj/'>Centering text (kinda) with Padding</a> by HuangKai (<a href='http://codepen.io/voidsky'>@voidsky</a>) on <a href='http://codepen.io'>CodePen</a>.

</iframe>

## 单行文字——使用line-height

如果只有单行文字，并且你知道不会断行，有一个，把line-height设置成和外框一样高度就可以实现文字垂直居中

```css

.center-text-trick {

  height: 100px;

  line-height: 100px;

  white-space: nowrap;

```

<iframe height='265' scrolling='no' title='Centering a line with line-height' src='//codepen.io/voidsky/embed/jBMWWQ/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/voidsky/pen/jBMWWQ/'>Centering a line with line-height</a> by HuangKai (<a href='http://codepen.io/voidsky'>@voidsky</a>) on <a href='http://codepen.io'>CodePen</a>.

</iframe>

**注意：**只能用于你确定不会超过一行的文字内容，否则！就会出现很尴尬的情况！！

## table大法

table里面有一个`vertical-align：middle` 的属性可以实现居中，你只要模拟一个table出来就行了，即外面套一个`table`里面套一个`table-cell`

<iframe height='265' scrolling='no' title='Centering text (kinda) with Padding' src='//codepen.io/voidsky/embed/ryMxLB/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/voidsky/pen/ryMxLB/'>Centering text (kinda) with Padding</a> by HuangKai (<a href='http://codepen.io/voidsky'>@voidsky</a>) on <a href='http://codepen.io'>CodePen</a>.

</iframe>

## 神奇的伪类居中

```css

.ghost-center {

  position: relative;

.ghost-center::before {

  content: " ";

  display: inline-block;

  height: 100%;

  width: 1%;

  vertical-align: middle;

.ghost-center p {

  display: inline-block;

  vertical-align: middle;

```

<iframe height='265' scrolling='no' title='Ghost Centering Multi Line Text' src='//codepen.io/voidsky/embed/wJzGLG/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/voidsky/pen/wJzGLG/'>Ghost Centering Multi Line Text</a> by HuangKai (<a href='http://codepen.io/voidsky'>@voidsky</a>) on <a href='http://codepen.io'>CodePen</a>.

</iframe>

## flex大法

用flex一切都简单了

```css

.flex-center-vertically {

  display: flex;

  justify-content: center;

  flex-direction: column;

  height: 400px;

```

## 参考文章

[https://css-tricks.com/centering-css-complete-guide/](https://css-tricks.com/centering-css-complete-guide/)

