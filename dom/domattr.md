## 目录
---
- [HTMLDivElement](#HTMLDivElement)
  - [常用方法](#常用方法)
  - [DOM其他属性](#DOM其他属性)
---

# HTMLDivElement

可以直接访问的属性就是那些gloable属性：`id`，`align`，`dir`，`lang`，`class(Name)`，`style`，`title`，`hidden`等。

如果是Form元素，还有`value`

其他的属性都在attrbutes里，这是一个NameNodeMap的类型，可以通过div.attributes['id']访问，但是还是使用自带的方法`getAttributes（）`和`setAttribuites()`比较方便。

![your text](http://o7bk1ffzo.bkt.clouddn.com/1501131860411)

![your text](http://o7bk1ffzo.bkt.clouddn.com/1501132129588)

## 常用方法

见[dom操作](/dom/dom.md)

## DOM其他属性

- tagName ：tag的名称

- client系列

- scroll系列

- offset系列

见[元素尺寸](/dom/size.md)

