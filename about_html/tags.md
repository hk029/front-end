## 目录
---
- [html的文件结构](#html的文件结构)
  - [写在开头](#写在开头)
  - [html语法特性](#html语法特性)
  - [文本级、容器级](#文本级、容器级)
  - [head](#head)
    - [meta](#meta)
    - [title](#title)
  - [body](#body)
    - [hx](#hx)
    - [p](#p)
    - [em/strong](#em/strong)
    - [q](#q)
    - [blockquote](#blockquote)
    - [br](#br)
    - [hr](#hr)
    - [code](#code)
    - [pre](#pre)
  - [列表](#列表)
    - [ol-li](#ol-li)
    - [dl-dt-dd](#dl-dt-dd)
  - [两大盒子](#两大盒子)
    - [span](#span)
  - [字符实体](#字符实体)
    - [lt](#lt)
    - [gt](#gt)
    - [copy](#copy)
  - [表格](#表格)
      - [caption](#caption)
      - [summary](#summary)
    - [a](#a)
      - [**作用2**：链接Email地址**mailto**](#**作用2**链接Email地址**mailto**)
      - [**作用3**：页面锚点](#**作用3**页面锚点)
    - [img](#img)
  - [表单](#表单)
      - [label](#label)
      - [input](#input)
      - [textarea](#textarea)
      - [select-option](#select-option)
---

[TOC]
# html的文件结构
```html
<html>
    <head>...</head>
    <body>...</body>
</html>
```
## 写在开头
网页技术严格的三层分离：html就是负责描述页面的语义（**结构层**）；css负责描述页面的样式（**样示层/表示层**）；js负责描述页面的动态效果的（**行为层**）。
**html中，除了语义，其他什么都没有。**
html的作用只是增加语义！没有任何别的作用！比如：**h1标签只是给文本增加主标题的语义**，而不给文字加粗、加黑、变大，所有样式都属于css干的事情。
## html语法特性
- HTML对换行不敏感，对tab不敏感
- 空白折叠现象
- 标签要严格封闭
## 文本级、容器级
HTML标签是分等级的，HTML将所有的标签分为两种：**容器级、文本级**。
顾名思义，**容器级的标签，里面可以放置任何东西；文本级的标签里面，只能放置文字、图片、表单元素**。
再次强调：**文本级的标签里面，只能放置文字、图片、表单元素**，不要试图在`<p>`标签里放别的标签比如`<h1>`标签
## head
head部分主要有：`<title>、<script>、 <style>、<link>、 <meta>`
### meta
meta是**自封闭标签**，里面可以定义：
- 字符集 **charset** utf-8  / gb2312 ……
- 关键字 **Keywords**  SEO搜索引擎优化
- 页面描述 **Description** SEO搜索引擎优化
- 页面缩放……
### title
title标签是网页的标题信息，可以用来SEO
![your text](http://o7bk1ffzo.bkt.clouddn.com/1473839676125)
## body
body部分主要有：`<h1>、<p>、<a>、<img>`等网页内容标签，在这里的标签中的内容会在浏览器中显示出来。
### hx
`<hx>`标签是标题标签，表示文章标题（x=1-6）
```vbscript-html
<body>
	<h1>一级标题</h1>
	<h2>二级标题</h2>
	<h3>三级标题</h3>
	<h4>四级标题</h4>
	<h5>五级标题</h5>
	<h6>六级标题</h6>
</body>
```
![your text](http://o7bk1ffzo.bkt.clouddn.com/1473840042377)
### p
作用：p标签是段落标签，**文本级**，不要试图在`<p>`标签里放别的标签比如`<h1>`标签
语法：`<p>段落文本</p>`
### em/strong
作用：强调文字，默认em是斜体，strong是粗体，都可以用css调整
用法：`<em>强调文本</em>`
用法：`<strong>强调文本</strong>`
### q
作用：q标签是引用标签，引用的文字会自动加上引号
用法：`<q>引用文本</q>`
### blockquote
作用：长引用标签，默认做法是缩进
用法：`<blockquote>引用文本</blockquote>`
### br
作用：换行 ( break ) **自封闭**
用法：`<br />`
注意：很多时候，应该用`<p>`代替`<br>`
### hr
作用：分隔线 ( horizontal )
用法：`<hr>`
### code
作用：代码，防止浏览器误认为是要执行代码，而没显示代码。加了标签浏览器就不会执行了，而是像文本一样显示出来
用法：`<code>代码语言</code>`
### pre
作用：在处理多段预览文字或代码时使用（保证显示的格式，不需要`<br />`或`&nbsp`控制格式）
用法：`<pre>语言代码段</pre>`
## 列表
### ul-li
作用：**无序**列表显示，**导航条**，内容列表
用法：
```html
<ul>
  <li>新闻1</li>
  <li>新闻2</li>
   ......
</ul>
```
效果：
![your text](http://o7bk1ffzo.bkt.clouddn.com/1473841390637)
**注意**：ul里面只能放li。**ul的作用，并不是给文字增加小圆点的，而是增加无序列表的“语义”的**。同时li是一个**容器级**标签，里面啥都可以放(div，p，hx，ul，img……)！！这也是为什么li经常用来做导航/内容列表
### ol-li
作用：**有序**列表显示
用法：
```html
<ol>
  <li>新闻1</li>
  <li>新闻2</li>
   ......
</ol>
```
效果：
![your text](http://o7bk1ffzo.bkt.clouddn.com/1473841501816)
注意：用的不多，除非是非要自动编号的场景。
### dl-dt-dd
作用：带**标题**的列表显示用法：
用法
```html
<dl>
   <dt>计算机</dt>
   <dd>用来计算的仪器 ... ...</dd>
   <dt>显示器</dt>
   <dd>以视觉方式显示信息的装置 ... ...</dd>
</dl>
```
效果：![your text](http://o7bk1ffzo.bkt.clouddn.com/1488868869467)
注意：基本都可以用**div+ul**来代替，根据场景需要使用，基本所有列表的使用方法都可以转换。像京东的底栏就可以用这个实现（虽然现在京东用的div+ul）
![img](file:///C:/Users/ADMINI~1/AppData/Local/Temp/msohtmlclip1/01/clip_image002.jpg)
## 两大盒子
### div
作用：**最常用的标签之一**，是**最重要的容器**（盒子），划分（division ），可以根据逻辑组成把页面划分成不同部分，然后通过css对不同部分进行装饰。（就像屋内的房间划分一样）
用法：`<div>…</div>`
![your text](http://o7bk1ffzo.bkt.clouddn.com/1473841607506)
由于div太常用了，所以，我们亲切的称呼这种模式叫做“**div+css**”。div标签负责布局，负责结构，负责分块。css负责样式。
### span
作用：**最常用的标签之一**，也是**很重要的盒子**，它是**文本级的标签**，span标签为文字单独设置样式（通过css）
用法：`<span>单独处理文本</span>`
可以说，span里面是放置小元素的，div里面放置大东西的
## 字符实体
### nbsp
作用：空格，你在html里面输入的空格最后都会被解析成1个空格，所以需要多个空格的使用可以用nbsp（Non-breaking space）你也可以记忆为nb(牛逼) sp (space空格)
用法：`&nbsp;`
### lt
作用：less than 打出<
用法：`&lt;`
### gt
作用：greater than ,打出>
用法：`&gt;`
### copy
作用：copyright，打出©
用法：`&copy;`
## 表格
### table
作用，产生一个表格
用法：主要是`table、tbody、tr、th、td`四元素的使用
`<table>`表示一个表格
`<tbody>`表示这个表格内容是一个整体（一次显示而不是多次加载）
`<tr>`表示一行
`<td>`表示一个单元格
`<th>`表示**表头**
注意：默认是不代框的，如果加框可以用css样式
```html
<table>
  <tbody>
    <tr>
      <th>班级</th>
      <th>学生数</th>
      <th>平均成绩</th>
    </tr>
    <tr>
      <td>一班</td>
      <td>30</td>
      <td>89</td>
    </tr>
    <tr>
      <td>二班</td>
      <td>35</td>
      <td>85</td>
    </tr>
  </tbody>
</table>
```
![your text](http://o7bk1ffzo.bkt.clouddn.com/1473841886075)
#### caption
作用：表格标题
#### summary
作用：表格
### a
#### **作用1**：实现超链接
用法：`<a  href="目标网址"  title="鼠标滑过显示的文本" target="_blank">链接显示的文本</a>`
`target`属性表示是在当前窗口还是新窗口打开，`_blank`表示新窗口，还有`_self`自身窗口，`_top`顶部框架,`_parent`父框架。
#### **作用2**：链接Email地址**mailto**
![your text](http://o7bk1ffzo.bkt.clouddn.com/1473842446659)
```html
<a href="mailto: hk2291976@hotmail.com ? cc=abc@hotmail.com ; bb@hotmail.com & subject=主题 & body =邮件内容 ">发送邮件</a>
```
#### **作用3**：页面锚点
锚点用name属性来设置，一个a标签如果name属性（或者id属性），那么就是页面的一个锚点。
```html
<a name="wdzp">我的作品</a>
或者：
<a id="wdzp">我的作品</a>
```
那么网址：`html#wdzp`就能够让这个锚点在页面最顶端显示，此时页面有卷动。
同时如果有一个超链接，也可以跳转到锚点
```html
	<a href="#wdzp">点击我就查看我的作品</a>
```
**注意：**如果需要一个段落内文字都被点击，那么应该是用**p包裹a**而不是a包裹p，**a的语义要小于p，a就是可以当做文本来处理，所以p里面相当于放的就是纯文字。**
### img
作用：插入图片，**自封闭标签，也称为单标签**
语法：`<img src="图片地址" title="鼠标滑过显示文字" alt="下载失败时的替换文本" title = "提示文本">`
**注意：**src可以使用相对或绝对路径，相对路径的`..`只能写在开头
## 表单
### form
作用：表单数据，用于和用户交互
语法：`<form   method="传送方式"   action="服务器文件">`
传送方式：`POST`,`GET`
#### label
作用：显示文本和**关联控件**
语法：`<label for="关联名字">显示文本</label>`
**注意：**用`for`属性可以关联控件的**id**，有些像单选多选框这类不易点击的，可以用label关联
```html
<form>
   <label for="male">男</label>
  <input type="radio" name="gender" id="male" />
  <br />
  <label for="female">女</label>
  <input type="radio" name="gender" id="female" />
  <br />
</form>
```
这样就可以点击“男”或“女”触发点击单选的功能
![your text](http://o7bk1ffzo.bkt.clouddn.com/1473845077992)
**注意**：什么表单元素都有label。
#### input
作用：根据type类型
用法：`<input type="类型">显示文本</input`
type类型：
- `text`: 文本类型，**value**里放值，可以显示在文本框里（**作默认值**）
- `password`: 密码类型
- `radio`：name="name" **name属性相同**的单选框
- `checkbox`：name="name" **name属性相同**的单选框复选框
- `file`: 选择文件
- `button`：按钮（定义onclik触发消息），和button标签实现功能一样
- `submit`：提交数据，自动有“提交”文字，点击这个表单就会被提交到form标签的action属性中的那个页面中去
- `reset` : 重置数据
H5中还加入了例如`datatime,date,color,tel,range,number……`等类型
[详细信息](http://www.monmonkey.com/rumenpian/html/input.html)
**注意：**在H5中，可以用`placeholder`属性作为占位符，可以实现提示信息，input的**值都需要通过value**设置和取得。
![your text](http://o7bk1ffzo.bkt.clouddn.com/1473844238263)
#### textarea
作用：文本域，支持多段文本
用法：`<textarea  rows="行数" cols="列数">文本</textarea>`
**注：**属性可以通过css修改`weight`和`height`更改，或者通过`cols`或`rows`更改。
#### select-option
作用：选择框，**节约空间**
用法：`<option value='提交值' selected="selected">显示值</option>`
其中：`selected="selected"`表示选中
```
    <label>爱好:</label>
    <select>
      <option value="看书">看书</option>
      <option value="旅游" selected="selected">旅游</option>
      <option value="运动">运动</option>
      <option value="购物">购物</option>
    </select>
```
![your text](http://o7bk1ffzo.bkt.clouddn.com/1473844600847)
注意：下拉框可以多选，`select`启用属性`multiple="multiple"`,然后在选择的时候，按`ctrl`（mac上`command`），就可以多选
![your text](http://o7bk1ffzo.bkt.clouddn.com/1473844735310)
