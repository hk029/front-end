## 目录
---
- [派生选择器](#派生选择器)
- [兄弟选择器（IE6不支持）](#兄弟选择器IE6不支持)
- [群组选择器](#群组选择器)
- [伪类选择器](#伪类选择器)
  - [锚伪类](#锚伪类)
  - [first-child 伪类](#first-child-伪类)
  - [lang 伪类](#lang-伪类)
---

[attribute] |	用于选取带有指定属性的元素。

[attribute=value] |	用于选取带有指定属性和值的元素。

[attribute~=value] |	用于选取属性值中包含指定词汇的元素。

[attribute\|=value] |	用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。

[attribute^=value] |	匹配属性值以指定值开头的每个元素。

[attribute$=value] |	匹配属性值以指定值结尾的每个元素。

[attribute\*=value] |	匹配属性值中包含指定值的每个元素。

## 派生选择器

派生选择器也被称为上下文选择器，作用于A元素下的B元素

```
A B {
    ...
```

## 兄弟选择器（IE6不支持）

选择紧跟在A元素后面的B元素，A、B有同样的父元素。

```
selectorA + selectorB {
    ...
```

选择A后面的所有B元素，A、B有同样的父元素。

```
selectorA ~ selectorB {...}
```

## 群组选择器

几个选择器形成一个群组，设置相同的样式

```
selectorA, selectorB {...}
```

## 伪类选择器

伪类不对应class，而是对应元素的状态等，比如visited。

```
selector : pseudo-class {...}
```

### 锚伪类

适用于<a>元素

- link：未访问的链接

- visited：已访问的链接

- hover：鼠标悬停

- active：选定的链接

__提示：__在 CSS 定义中，a:hover 必须被置于 a:link 和 a:visited 之后，才是有效的。a:active 必须被置于 a:hover 之后，才是有效的。

### first-child 伪类

如果元素是父元素的第一个子元素，则会匹配该伪类

### lang 伪类

