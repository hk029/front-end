## 目录
---
- [介绍](#介绍)
  - [获取DOM节点](#获取DOM节点)
    - [孩子节点](#孩子节点)
    - [兄弟节点](#兄弟节点)
    - [父亲节点](#父亲节点)
  - [更新](#更新)
    - [innerText / textContent](#innerText-/-textContent)
    - [属性](#属性)
    - [style属性](#style属性)
  - [创建DOM](#创建DOM)
  - [插入DOM](#插入DOM)
  - [删除DOM](#删除DOM)
  - [文本操作](#文本操作)
---

[TOC]

# 介绍

由于HTML文档被浏览器解析后就是一棵DOM树，要改变HTML的结构，就需要通过JavaScript来操作DOM。

始终记住DOM是一个树形结构。操作一个DOM节点实际上就是这么几个操作：

- 更新：更新该DOM节点的内容，相当于更新了该DOM节点表示的HTML的内容；

- 遍历：遍历该DOM节点下的子节点，以便进行进一步操作；

- 添加：在该DOM节点下新增一个子节点，相当于动态增加了一个HTML节点；

- 删除：将该节点从HTML中删除，相当于删掉了该DOM节点的内容以及它包含的所有子节点。

## 获取DOM节点

在操作一个DOM节点前，我们需要通过各种方式先拿到这个DOM节点。最常用的方法是

- document.getElementById()    : 唯一

- document.getElementsByTagName()  ： 一组

- document.getElementsByClassName() ： 一组 （6 7 8不支持)

- **querySelector**() ：第一个出现的  (6 7 8不支持)

- **querySelectorAll**() ： 全部  (6 7 8不支持)

### 孩子节点

- firstChild

- lastChild

- firstElementChild  （带element的都是其他浏览器认识ie678不认）

- lastElementChild

- childNodes （它是**标准属性**，它返回指定元素的子元素集合，包括`HTML节点`，`所有属性`，`文本`节点 （嫡出）火狐谷歌等高本版会把**换行也看做是子节点**）

- **children**  (尽量用这个，只返回**元素节点(NodeType === 1)**)

### 兄弟节点

- previousSlbling 获取已知节点的前一个节点

- nextSibling 获取已知节点的下一个节点

- nextElementSlbling  （带element的都是其他浏览器认识ie678不认）

- previousElementSlbling

### 父亲节点

- **parentNode**  已知节点的父节点

- parentElement (ie认，不用它了)

```js

// 返回ID为'test'的节点：

var test = document.getElementById('test');

// 先定位ID为'test-table'的节点，再返回其内部所有tr节点：

var trs = document.getElementById('test-table').getElementsByTagName('tr');

// 先定位ID为'test-div'的节点，再返回其内部所有class包含red的节点：

var reds = document.getElementById('test-div').getElementsByClassName('red');

// 获取节点test下的所有直属子节点:

var cs = test.children;

// 获取节点test下第一个、最后一个子节点：

var first = test.firstElementChild;

var last = test.lastElementChild;

```

严格地讲，我们这里的DOM节点是指`Element`，但是DOM节点实际上是`Node`，在HTML中，`Node`包括`Element`、`Comment`、`CDATA_SECTION`等很多种，以及根节点`Document`类型，但是，绝大多数时候我们只关心`Element`，也就是实际控制页面结构的`Node`，其他类型的`Node`忽略即可。根节点`Document`已经自动绑定为全局变量`document`。

## 更新

### innerHTML

这个方式非常强大，不但可以修改一个DOM节点的文本内容，还可以直接通过HTML片段修改DOM节点内部的子树：

### innerText / textContent

第二种是修改innerText或textContent属性，这样可以自动对字符串进行HTML编码，保证无法设置任何HTML标签：

两者的区别在于读取属性时，innerText不返回隐藏元素的文本，而textContent返回所有文本。另外注意IE<9不支持textContent。

### 属性

- getAttribute(属性名)

- removeAttribute(属性名)

- setAttribute(属性名，属性值)

**有一些属性的值可以直接获取和修改**（标签默认就带的属性，比如id基本标签都带，还有img的src，input的value，name等）

### style属性

修改CSS也是经常需要的操作。DOM节点的`style`属性对应所有的CSS，可以直接获取或设置。因为CSS允许font-size这样的名称，但它并非JavaScript有效的属性名，所以需要在JavaScript中改写为驼峰式命名`fontSize`：

```js

// 获取<p id="p-id">...</p>

var p = document.getElementById('p-id');

// 设置CSS:

p.style.color = '#ff0000';

p.style.fontSize = '20px';

p.style.paddingTop = '2em';

```

或者直接使用style批量更新，用;分隔

```js

// 获取<p id="p-id">...</p>

var p = document.getElementById('p-id');

// 设置CSS:

p.style = "color:#ff0000;fontsize:20px";

```

## 创建DOM

- **createElement**

```js

document.createElement(‘img’)

```

- createAttribute

```js

document.createAttribute('class')

```

- **createTextNode**

```js

var h=document.createElement("H1") 

var t=document.createTextNode("Hello World"); 

h.appendChild(t);

```

## 插入DOM

如果原来的DOM树为空，则可以直接使用InnerHTML进行添加，如果不为空则不行，会覆盖里面原来的节点

- **appendChild**

直接把一个原来的节点插入新的位置

```js

var

    js = document.getElementById('js'),

    list = document.getElementById('list');

list.appendChild(js);

```

- **insertBefore**

如果我们要把子节点插入到指定的位置怎么办？可以使用`parentElement.insertBefore(newElement, referenceElement);`

```js

varlist = document.getElementById('list'),

    ref = document.getElementById('python'),

    haskell = document.createElement('p');

haskell.id = 'haskell';

haskell.innerText = 'Haskell';

list.insertBefore(haskell, ref);

```

- replaceChild

replaceChild(要插入的新元素，被替换的元素)

- **cloneNode**

cloneNode(true[复制当前节点及其所有字节点],false[仅复制当前节点])

## 删除DOM

- **parentNode  +  removeChild**

要删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的removeChild把自己删掉：

```js

// 拿到待删除节点:var self = document.getElementById('to-be-removed');

// 拿到父节点:var parent = self.parentElement;

// 删除:var removed = parent.removeChild(self);

removed === self; // true

```

注意: 删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置。

## 文本操作

- insertData(offset，string)   从offset指定的位置插入string

- appendData(string)  将string插入到文本结点的末尾处

- deleteDate(offset,count)   从offset删除count个字符

- replaceData(off,count,string)   从offset将count个字符。用string替代

- splitData(offset)  从offset将文本结点分成两个节点

- substring(offset,count)  返回由offset起得count个结点

