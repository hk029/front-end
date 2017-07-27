## 目录
---
- [盒模型](#盒模型)
- [margin](#margin)
- [padding](#padding)
- [border](#border)
- [高度](#高度)
- [宽度](#宽度)
- [margin width height 的auto计算](#margin-width-height-的auto计算)
  - [2. inline replaced](#2-inline-replaced)
  - [3. 常规流block non-replaced](#3-常规流block-non-replaced)
  - [4. 常规流中的block replaced](#4-常规流中的block-replaced)
  - [5. 浮动的non-replaced](#5-浮动的non-replaced)
  - [6. 浮动的replaced](#6-浮动的replaced)
  - [7. 绝对定位non-replaced](#7-绝对定位non-replaced)
  - [8. 绝对定位replaced](#8-绝对定位replaced)
  - [9. 常规流中的inline-block non-replaced](#9-常规流中的inline-block-non-replaced)
  - [10. 常规流中的inline-block replaced](#10-常规流中的inline-block-replaced)
  - [11. 块格式化上下文的高度auto](#11-块格式化上下文的高度auto)
- [max-width min-width](#max-width-min-width)
- [行高的计算](#行高的计算)
---

## 盒模型

盒模型最重要的就是一个图：

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499743240187)

注意：

1. 每个盒的内容宽度是自上而下计算的，每个LI的包含块由UL元素建立。

2. LI框的margin是透明的——margin总是透明的，所以UL填充和内容区域的背景色（黄色）会通过它们。

3. 垂直高度的margin会塌陷[marigin塌陷](/about_css/collapsedmargin.md) 

## margin

- margin如果设置值为百分比，则是依据生成盒子的包含块**宽度**，哪怕是margin-top和margin-bottom

> The percentage is calculated with respect to the *width* of the generated box's [containing block](https://www.w3.org/TR/CSS2/visuren.html#containing-block). Note that this is true for ['margin-top'](https://www.w3.org/TR/CSS2/box.html#propdef-margin-top) and ['margin-bottom'](https://www.w3.org/TR/CSS2/box.html#propdef-margin-bottom) as well. If the containing block's width depends on this element, then the resulting layout is undefined in CSS 2.1.

- margin可以取**负值**（布局常用，比如双飞翼和圣杯布局，或是小范围位移）

- 如果margin取auto，则要看[计算公式](https://www.w3.org/TR/CSS2/visudet.html#Computing_widths_and_margins)

- margin初始为0

- `margin-top`和`margin-bottom`对**非替换行内元素无效**

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499743907442)

## padding

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499751384456)

- **padding 可以用于除table外所有的元素**

- padding的百分比计算和margin一样，都**只与父亲的width有关**

- 初始值为0

## border

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499751973395)

- 边框属性指定框边框的宽度、颜色和样式。

- ★这些属性适用于**所有元素**。

- 边框宽度可以为：thin，medium，thick，长度（**不能用百分比**），**默认medium**

- 边框**颜色默认值**为`color`值，可以取transparent，此时border透明，但是有宽度

- 边框样式：none，hidden，dotted，dashed，solid，double（两条实线。两条实线及它们之间的空隙之和等于'border-width'的值），groove( 3D凹槽 )，ridge（3D凸槽），inset （嵌进画布，无3D），outset （从画布里出来了），边框**没有默认样式，必须指定**

- border值为'groove'，'ridge'，'inset'和'outset'的边框颜色取决于元素的border color属性，但UA可能会选用它们自己的算法来计算应用的实际颜色（可能有渐变）

- ★border设置的时候，**最少需要设置一个样式**

## 高度

![your text](http://o7bk1ffzo.bkt.clouddn.com/1500093587224)

高度的初始值为auto

**百分比的设置**：百分比参照生成盒的[包含块](http://www.ayqy.net/doc/css2-1/visuren.html#containing-block)的高度。**如果包含块的高度没有显式指定**（即取决于内容高度），并且该元素不是绝对定位的，**则计算值为'auto'**。[根元素](http://www.ayqy.net/doc/css2-1/conform.html#root)上的百分比高度是相对于[初始包含块](http://www.ayqy.net/doc/css2-1/visudet.html#containing-block-details)的 

注意：对于那些包**含块基于一个块级元素的绝对定位的元素**，百分比根据**这个元素的*padding box*的高度来计算**。这与CSS1不同，（CSS1中）百分比总是根据父级元素的*content box*来计算

## 宽度

![your text](http://o7bk1ffzo.bkt.clouddn.com/1500037138032)

宽度**初始值为auto**

除了非替换的行内元素和table元素

## margin width height 的auto计算

### 1. inline non-replaced

无width属性，为0

height也不适用，跟内容有关（行盒）

一个内联的不可替换盒的竖直padding，border和margin从内容区的top和bottom开始，并且与['line-height'](http://www.ayqy.net/doc/css2-1/visudet.html#propdef-line-height)无关。['line-height'](http://www.ayqy.net/doc/css2-1/visudet.html#propdef-line-height)只用在计算行盒的高度时使用。

### 2. inline replaced

- margin-left和margin-right  auto为0

- 有内在宽度，auto为内在宽度

- 有内在宽高比，有高度，auto就根据宽高比计算，没高度，undefined

- 没有内在宽度，没有高度，没有内在宽高比，auto=300px，如果太宽，用最大比例为2：1矩形代替

- 高度同理，只是最后设置为2:1，高度不超过150px，且宽度不超过最大宽度

  **所有可替换元素高度都参考这个**

  ​

### 3. 常规流block non-replaced

- margin + border + padding + width  = containing box

  满足这个式子就行，如果有且仅有一个值为auto，那就根据式子计算就好

- 如果width为auto，其他的auto自动变为0。

- 如果margin-left 和margin-right值相等，会让元素水平居中。

  因为margin padding border 默认都是0，所以如果设置了margin: 0 auto，那其实就给margin-left和margin-right设置了相同的值（计算得出）自然就居中了。

- margin-top和bottom为0

- 高度就为**常规流**中的子集撑起来的高度，考虑padding和子盒margin（浮动和相对位移不考虑）

（包括overflow:visible一样适用）

### 4. 常规流中的block replaced

width的值根据2计算，margin根据3计算

高度参考2

### 5. 浮动的non-replaced

margin-left、right 为0

width为自适应（shrink-to-fit) : min(max(首选最小宽度, 可用宽度), 首选宽度)

高度11

### 6. 浮动的replaced

margin-left、right = 0

width参考2

高度2

### 7. 绝对定位non-replaced

**静态位置**（该元素在常规流中的位置）

left+margin+border+padding+width+right

如果left,right,width三个都为auto，那么margin设为0，**width自适应**，left设为静态位置的left边（ltr），计算right（也就**元素不移动**）

如果right,width,left有一个值是auto，可以直接求出

如果有两个值为auto，并且width为auto，那么width**自适应**，然后求另一值

如果right和left为auto，那么left设置为到静态位置的left边（ltr），计算right。

高度：

- 除非指定，否则参考11

- 如果top height bottom都不为auto，那么margin-top和bottom的auto取一样的值。如果margin-top和bottom只有一个auto，并且被过度约束，那么忽略bottom

- 否则margin-top和bottom设为0，top和bottom计算得出（top优先取静态top位置）

### 8. 绝对定位replaced

width根据2求出

如果right,left都为auto，根据direction把left或right设置为静态位置

然后把margin-left和margin-right的auto设为0

说实话没看懂：

> 1. 如果['left'](http://www.ayqy.net/doc/css2-1/visuren.html#propdef-left)和['right'](http://www.ayqy.net/doc/css2-1/visuren.html#propdef-right)值都是'auto'，然后如果建立静态位置包含块的元素的'direction'属性为'ltr'，把['left'](http://www.ayqy.net/doc/css2-1/visuren.html#propdef-left)设置为静态位置，否则如果'direction'为'rtl'，就把['right'](http://www.ayqy.net/doc/css2-1/visuren.html#propdef-right)设置为静态位置

> 2. 如果['left'](http://www.ayqy.net/doc/css2-1/visuren.html#propdef-left)或者['right'](http://www.ayqy.net/doc/css2-1/visuren.html#propdef-right)为'auto'，把所有值为'auto'的['margin-left'](http://www.ayqy.net/doc/css2-1/box.html#propdef-margin-left)或者['margin-right'](http://www.ayqy.net/doc/css2-1/box.html#propdef-margin-right)替换为'0'

> 3. 如果此时['margin-left'](http://www.ayqy.net/doc/css2-1/box.html#propdef-margin-left)和['margin-right'](http://www.ayqy.net/doc/css2-1/box.html#propdef-margin-right)仍然是'auto'，解方程时要添上额外的约束：2个margin必须相等，除非这会让它们为负。如果包含块的direction是'ltr' ('rtl')，把['margin-left'](http://www.ayqy.net/doc/css2-1/box.html#propdef-margin-left) (['margin-right'](http://www.ayqy.net/doc/css2-1/box.html#propdef-margin-right))设置为0，再求出['margin-right'](http://www.ayqy.net/doc/css2-1/box.html#propdef-margin-right) (['margin-left'](http://www.ayqy.net/doc/css2-1/box.html#propdef-margin-left))

> 4. 如果此时只剩一个'auto'了，就解方程求出这个值

> 5. 如果此时该值被过度限制了，忽略['left'](http://www.ayqy.net/doc/css2-1/visuren.html#propdef-left)（包含块的['direction'](http://www.ayqy.net/doc/css2-1/visuren.html#propdef-direction)属性为'rtl'时）或者['right'](http://www.ayqy.net/doc/css2-1/visuren.html#propdef-right)（['direction'](http://www.ayqy.net/doc/css2-1/visuren.html#propdef-direction)为'ltr'时），再求出这个值

高度计算同7，但是高度通过2求出

### 9. 常规流中的inline-block non-replaced

margin 0

**width 自适应**

高度11

### 10. 常规流中的inline-block replaced

和2一样

### 11. 块格式化上下文的高度auto

- 内联子级：最高行盒和最低行盒之间距离

- 块级子级：最高块盒margin-top边的最低块盒margin-bttom边

- **绝对**定位的**子级忽略**

- 子级可以是匿名块

- 高度要能把**浮动子级的底边包括进去**

## max-width min-width

![your text](http://o7bk1ffzo.bkt.clouddn.com/1500093560762)

首先，先不管max-width和min-width计算一遍width，如果出现了违反条件，再做处理。

![your text](http://o7bk1ffzo.bkt.clouddn.com/1500093224095)

## 行高的计算

1. 计算行盒中每个内联级盒的高度时，对于可替换元素，inline-block元素和inline-table元素，这个值就是其margin box的高度；对于内联盒，这个值是其'line-height'

2. 内联级盒是根据其['vertical-align'](http://www.ayqy.net/doc/css2-1/visudet.html#propdef-vertical-align)属性竖直对齐的。如果它们是'top'或者'bottom'对齐，它们必须对齐得让行盒高度最小化。如果这样的盒足够高，存在多个解，而CSS 2.1没有定义行盒基线的位置（即，[strut](http://www.ayqy.net/doc/css2-1/visudet.html#strut)的位置，见下文）

3. 行盒高度是最高的盒的top与最低的盒的bottom之间的距离

空内联元素生成空的内联盒，但这些盒仍然具有margin，padding，border和line height，并因此会影响这些计算，就像有内容的元素一样

