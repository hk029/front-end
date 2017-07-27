## 目录
---
- [margin](#margin)
- [margin塌陷(collapsing margins)](#margin塌陷collapsing-margins)
  - [相邻规则](#相邻规则)
  - [规则拆开](#规则拆开)
---

## margin

- margin可以取**负值**（布局常用，比如双飞翼和圣杯布局，或是做居中的时候，小范围位移）

- 如果margin取auto，则要看

- margin初始为0

## margin塌陷(collapsing margins)

在CSS中，两个或多个盒子（**或可能不是兄弟姐妹**）的相邻边可以组合成一个边。这种组合方式被称为collapse(塌陷)，由此产生的合并margin称为`collapsed margin`

- 水平margin不会塌陷

- root element's box 不会塌陷

如果有`clearance`的元素的顶部和底部margin相邻，则其边距与后面的兄弟姐妹的相邻**边距折叠**，但由此产生的边距**不会与父块的底部边距折叠**。

### 相邻规则

两个margin是**相邻的**，当且仅当：

1. 都属于**流内**（in-flow）[**块级盒**](./fc.md#块级元素Block-level-elements与块级盒Block-level-boxes) ，处于**同一个**[块格式化上下文**BFC**](./fc.md)

2. **没有行盒** （line box），**没有空隙（clearance）**，**没有padding**并且**没有border把它们隔开**（注意，因此某些0高度行盒会被忽略）

3. 都属于竖直相邻盒边（vertically-adjacent box edges），即来自下列某一对：

   - 一个**盒的top margin**和它的第一个流内（in-flow）**孩子的top margin**

   - 一个盒的**bottom margin**和它的下一个流内后面的**兄弟的top margin**

   - **最后**一个流内**孩子的bottom margin**和它的**父级的bottom margin**，**如果父级的高度的计算值为'auto'**

   - 一个盒的top和bottom margin**自己折叠** ： 该盒没有建立一个新的块格式化上下文并且['min-height'](http://www.ayqy.net/doc/css2-1/visudet.html#propdef-min-height)的**计算值为0**，['height'](http://www.ayqy.net/doc/css2-1/visudet.html#propdef-height)的计**算值为0或者'auto'**，并且没有流内孩子。

如果一个margin的任何部分margin与另一个margin相邻的话，就认为它与那个margin相邻，是合并（collapsed）margin

**注意：**相邻margin可以通过**非兄弟或者祖先关系**的元素生成

```css
    .parent-box {
            margin: 100px;
            padding: 0px;
            width: 500px;
            background: pink;
        }
        .child-box {
            margin: 10%;
            padding: 1%;
            width: 200px;
            background: greenyellow;
        }
```

此时明显，父亲和孩子的上下margin都重合了，要想打破这写重合，就打破相邻规则

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499745383958)

给父亲加1px padding

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499745499468)

给父亲加border

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499745519630)

加入一个文字行盒（底部没有元素，所以margin-bottom依然重叠）

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499745570551)

### 规则拆开

- 一个[浮动的](http://www.ayqy.net/doc/css2-1/visuren.html#floats)盒（**非流内**）与任何其它盒之间的margin不会合并（甚至一个浮动盒与它的流内子级之间也不会）

- 建立了新的块格式化上下文的元素（例如，浮动盒与['overflow'](http://www.ayqy.net/doc/css2-1/visufx.html#propdef-overflow)不为'visible'的元素）的margin不会与它们的流内子级合并（**非同一BFC**）

- [绝对定位的](http://www.ayqy.net/doc/css2-1/visuren.html#absolutely-positioned)盒 （**非流内**）的margin不会合并（甚至与它们的流内子级也不会）

- 内联盒的margin不会合并（**非块级元素**）（甚至与它们的流内子级也不会）

- 一个流内块级元素的bottom margin总会与它的下一个流内块级兄弟的top margin合并，**除非兄弟有空隙**

- 一个流内块级元素的top margin会与它的第一个流内块级子级的top margin合并，如果该元素**没有top border**，没有**top padding**并且该子级**没有空隙**

- **一个height为'auto'并且min-height为0**的流内块级盒的bottom margin会与它的最后一个流内块级子级的bottom margin合并，如果该盒没有bottom padding并且没有bottom border并且子级的bottom margin不与有空隙的top margin合并

- 盒自身的margin也会合并，如果['min-height'](http://www.ayqy.net/doc/css2-1/visudet.html#propdef-min-height)属性为0，并且既没有top或者bottom border也没有top或者bottom padding，并且其['height'](http://www.ayqy.net/doc/css2-1/visudet.html#propdef-height)为0或者'auto'，并且不含行盒，并且其所有流内子级的margin（如果有的话）都合并了

当两个或多个边距折叠，所得到的边距宽度是**折叠边距宽度的最大值**。

在负边距的情况下，负相邻边距的绝对值的最大值从正相邻边距的最大值中扣除。如果没有正的边距，则将相邻边距的绝对值的最大值从零中扣除。

