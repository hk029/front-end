## 目录
---
- [Box: CSS布局的基本单位](#Box:-CSS布局的基本单位)
- [块级元素(Block-level elements)与块级盒(Block-level boxes)](#块级元素Block-level-elements与块级盒Block-level-boxes)
  - [*匿名块盒](#*匿名块盒)
    - [内联盒包含块级盒](#内联盒包含块级盒)
- [内联级元素(Inline-level elements)与内联盒( inline boxes)](#内联级元素Inline-level-elements与内联盒-inline-boxes)
    - [匿名内联盒](#匿名内联盒)
- [Formatting context](#Formatting-context)
- [包含块（containing block）](#包含块containing-block)
  - [包含块规则](#包含块规则)
  - [*控制盒子生成](#*控制盒子生成)
- [IFC](#IFC)
- [BFC有一下特性：](#BFC有一下特性)
- [如何触发一个新的BFC](#如何触发一个新的BFC)
- [应用场景](#应用场景)
  - [1.解决margin叠加问题](#1解决margin叠加问题)
  - [2.用于布局](#2用于布局)
  - [3.用于清除浮动，计算BFC高度.](#3用于清除浮动，计算BFC高度)
---

## Box: CSS布局的基本单位

　　Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：

## 块级元素(Block-level elements)与块级盒(Block-level boxes)

块级元素是源文档中那些被格式化成**视觉上的块**的元素（例如，p）。

display:block, list-item, table 的元素，会生成 block-level box。

块级盒是参与**块格式化上下文**(**BFC**)的盒。每个块级元素生成一个 **主块级盒**(principal block-level box)，用来包含后代盒和生成的内容，并且**任何定位模式**都与该盒有关。有些块级元素可能生成除主盒外的**额外的盒**：'list-item'元素。这些额外的盒根据主盒来放置

除了**表格盒**与**可替换元素**外，一个**块级盒**也是一个**块容器盒**。

**重要：** 一个块容器盒要么只包含块级盒，要么建立了**内联格式化上下文(IFC)**并因此只包含内联盒。

不是所有的块容器盒都是块级盒：**不可替换的内联块**和**不可替换的表格单元**是块级容器，但不是块级盒。作为**块级容器的块级盒**也叫**块盒（block box）**

**块盒 要求 比块级盒更加严格**

### *匿名块盒

#### 块级盒包含内联和块级盒

在一个这样的文档中：

```
<DIV>
  Some text
  <P>More text
</DIV>
```

（假设DIV和P都有'display: block'），DIV**似乎既有内联内容也有块内容**。为了更容易定义格式，我们假设在"Some text"四周有一个***匿名块盒***

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499844512098)

换句话说：**如果一个块容器盒（例如，为上面的DIV生成的）里面有一个块级盒（例如上面的P），那么我们强制让它里面只含有块级盒** 

#### 内联盒包含块级盒

当一个**内联盒**包含一个流内**块级盒时**，该**内联盒**（及与它处于同一行盒里的内联祖先）会被从周围的块级盒（和任何连续的，或者仅仅被可折叠的空白字符和/或流外元素隔开的块级兄弟）中**拆分出来**，把内联盒**分成两个盒**（即使有一边是空的），**分别位于块级盒的两边**。

**拆分前的行盒**与**拆分后的行盒**都被包进**匿名块盒**，并且该块级盒**成为了这些匿名盒的兄弟**。当这样一个内联盒受到相对定位的影响时，**任何由此产生的转变也会影响内联盒里面的块级盒**

```css
p    { display: inline }
span { display: block }
```

被应用在如下HTML文档的话：

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<HEAD>
<TITLE>Anonymous text interrupted by a block</TITLE>
</HEAD>
<BODY>
<P>
This is anonymous text before the SPAN.
<SPAN>This is the content of SPAN.</SPAN>
This is anonymous text after the SPAN.
</P>
</BODY>
```

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499845936333)

产生的盒将会是一个代表BODY的块盒，包含一个环绕着C1的匿名块盒，SPAN块盒和另一个环绕着C2的匿名块盒

匿名盒的属性是从**包围**它的**非匿名盒继承**来的，不可继承的属性，取其初始值。例如，匿名盒的字体是从那个DIV继承的，但margin将为0

**设置在该元素上的属性仍然会应用于该元素生成的匿名盒上**。例如，如果一个border被设置在上例中的P元素上，border将会绘制在C1（在行结束的位置打开）和C2（在行开始的位置打开）周围

有些用户代理以它们的方式给内联包含块实现了border。

在处理相关的百分比值时，**匿名块盒会被忽略**：**用最近的非匿名祖先盒代替**。例如，如果上面DIV里面的匿名块盒的子级为了处理百分比高度，需要知道其包含块的包含块的高度，那么它将采用DIV形成的包含块的高度，而不是匿名块盒的

## 内联级元素(Inline-level elements)与内联盒( inline boxes)

内联级元素是源文档中那些不会为其内容形成新块的元素，内容分布于行中（例如，强调段落中的一部分文本，内联图片等等）。

- 'display'属性的下列值能让一个元素变成**内联级**：'`inline`'，`'inline-table`'和'`inline-block`'。

- **内联级元素可以生成内联级盒（inline-level boxes）**，即参与**内联格式化上下文（IFC）**的盒

- 一个内联盒（inline-box）是一个（特殊的）内联级盒，其**内容**参与了它的包含**内联格式化上下文**。一个'display'值为'**inline**'的**不可替换元素**会生成一个**内联盒**。

- 不属于内联盒的内联块级盒（例如，**可替换内联级元素**，inline-block元素和inline-table元素）被称为**原子内联级盒**（atomic inline-level boxes），因为它们作为单一的不透明盒（opaque box）参与其内联格式化上下文（类似**块盒**）

内联盒》内联级盒

#### 匿名内联盒

任何被直接包含在一个块容器元素中（不在一个内联元素里面）的**文本**，必须视为一个**匿名内联元素**

在一个有如下HTML标记的文档里：

```
<p>Some <em>emphasized</em> text</p>
```

`<p>`会生成一个块盒，里面还有几个内联盒：

- "emphasized"的盒是一个由内联元素（`<em>`）生成的**内联盒**

- 其它盒（"Some"和"text"）都是由块级元素（`<p>`）生成的**匿名内联盒**，因为它们没有与之相关的内联级元素

这种匿名内联盒从它们**父级块盒继承了可继承的属性**，不可继承的属性取其初始值。示例中，匿名内联盒的颜色是从P继承的，但背景是透明的

后续将根据white-space属性合并起来的空白字符内容，不会生成任何匿名内联盒

## Formatting context

Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

CSS2.1 中只有 BFC 和 IFC, CSS3 中还增加了 GFC 和 FFC。

## 包含块（containing block）

包含块是一个很重要的概念，许多盒子的位置和大小是根据一个称为“包含块”的矩形框的边缘计算的。

通常，生成的方块充当子代方块的块；我们说一个**盒子为它的后代建立了包含块**。

### 包含块规则

**没啥特殊的规则，都是之前知道的，注意的就是绝对定位的盒是根据padding盒而不是content盒边**

1. [根元素](http://www.ayqy.net/doc/css2-1/conform.html#root)所在的包含块是一个被称为**初始包含块的矩形**。对于连续媒体，尺寸取**视口**的尺寸，并且被固定在画布开始的位置；对于分页媒体就是**页区（page area）**。初始包含块的'direction'属性与根元素的相同

2. 对于其它元素，如果该元素的position是'relative'或者'static'，包含块由其最近的**块容器**祖先盒的**content边**形成

3. 如果元素具有'position: fixed'，包含块由连续媒体的**视口**或者分页媒体的**页区**建立

4. 如果元素具有'position: absolute'，包含块由最近'**position**'为'absolute'，'relative'或者'fixed'的祖先建立，按照如下方式：

   1. 如果该祖先是一**个内联元素**，包含块就是环绕着为该元素生成的**第一个**和**最后一个**内联盒的**padding box的边界框（bounding box）**。在CSS 2.1中，如果该内联元素被跨行分割了，那么包含块是未定义的

   2. 否则，包含块由该祖先的[padding边](http://www.ayqy.net/doc/css2-1/box.html#padding-edge)形成

   如**果没有这样的祖先，包含块就是初始包含块**

每个盒子的position都是依赖其包含块的，但是它不受这个包含块的限制，它可能会溢出（overflow）。

### *控制盒子生成

`display`属性的下列值能让一个元素变成块级的：'`block`'，`list-item`和`table`

三个术语“`块级盒（block-level box）`”，“`块容器盒（block container box）`”与“`块盒（block box）`”在没有歧义的时候就简称为“块（block）”

## IFC

IFC主要特点是：在一个内联格式化上下文中，**盒是一个接一个水平放置的**，从包含块的顶部开始。这些盒之间的**水平**!!margin，border和padding都有效。

IFC里有一个重要的概念是Line box(行盒)，行盒是包含同一行盒的一个矩形区域。行盒是因为盛放（hold）一个内联格式化上下文中的内联级内容时创建的。

- 盒可能以不同的方式竖直对齐：以它们的**底部**或者**顶部**对齐，或者以它们里面的**文本的基线对齐**。包含来自**同一行的盒**的矩形区域叫做**行盒**(line box)

- 行盒默认是占满包含块的所有宽度，所以默认同一IFC中的行盒宽度一致，但是浮动元素会挤行盒的宽度。所以行盒的**宽度**由**包含块**和 **浮动** 情况决定。

- 同一个内联格式化上下文中的行盒**一般高度各不相同**（例如，一行可能含有一个高图片，而其它的只含文本）, 一个**行盒**总是**足够高**，能够容纳它包含的所有盒。然而，它可能比它所包含的最高的盒还要高（例如，如果盒是以基线对齐）

- 当一行的内联级盒的总宽度小于它们所在的行盒的宽度时，它们在行盒里的**水平分布**由['text-align'](http://www.ayqy.net/doc/css2-1/text.html#propdef-text-align)属性决定。如果该属性值为'justify'，用户代理可能会拉伸内联盒（不包括inline-table和inline-block盒）里的空白和字（间距）

- 当盒B的高度小于它所在的行盒的高度时（**如果等于了也就不存在对齐了**），行盒中B的**竖直对齐**方式由['vertical-align'](http://www.ayqy.net/doc/css2-1/visudet.html#propdef-vertical-align)属性决定。

- 当一个**内联盒**超出一个**行盒**的宽度时，它会被**分成几个盒**，并且这些盒会**跨多行盒分布**。如果一个内联块无法分割（例如，如果该内联盒含有一个单个字符，或者特定语言的单词分隔规则不允许在该内联盒里分隔，或如果该内联盒受到了一个值为**nowrap**或者pre的**white-space**的影响），那么该内联盒会从**行盒溢出**，当一个内联盒被分割后，**margin**，**border**和**padding**在发生分割的地方（或者在**任何分割处**，如果有多处的话）**不会有可视化**效果

注意：分隔处没可视化效果！

![Image illustrating the effect of line breaking on thedisplay of margins, borders, and padding.](http://www.ayqy.net/doc/css2-1/images/inline-layout.png)

## BFC有一下特性：

1. 内部的Box会在垂直方向，从顶部开始一个接一个地放置。

2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生叠加

3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

4. BFC的区域不会与float box叠加。

5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。

6. 计算BFC的高度时，浮动元素也参与计算。

## 如何触发一个新的BFC

根据W3C的文档（https://www.w3.org/TR/CSS2/visuren.html#block-formatting）

以下情况触发BFC：

1. float 除了none以外的值

2. overflow 除了visible 以外的值（hidden，auto，scroll ）

3. display (table-cell，table-caption，inline-block, flex, inline-flex)

4. position值为（absolute，fixed）

在以上的情况会新创建BFC。

![your text](http://o7bk1ffzo.bkt.clouddn.com/1501054791196)

## 应用场景

接下我们看下怎么运用BFC，在哪些场景可以用到BFC.

### 1.解决margin叠加问题

三P每个p之间的距离为50px，发生了外边距叠加。 要解决这个叠加问题即让每个P之间是100px，我们可以新建一个BFC，怎么建呢？可以给p元素添加一个父元素，让它触发BFC。

### 2.用于布局

从图中我们会发现上面BFC的第三个特性，就是元素的左外边距会触碰到包含块容器的做外边框，就算存在浮动也会如此。那么我们如何解决这个问题呢？看上面BFC第四个特性，就是BFC不会与浮动盒子叠加，那么我们是不是可以创建一个新的BFC来解决这个问题呢？来看看：

发现我们用overflow:hidden触发main元素的BFC之后，效果立马出现了,一个两栏布局就这么妥妥的搞掂…

![your text](http://o7bk1ffzo.bkt.clouddn.com/1501055515760)

### 3.用于清除浮动，计算BFC高度.

通过设置overflow:hidden，可以建立一个新的BFC,里面的浮动元素的高度也算在里面（规则6）

