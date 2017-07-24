## 目录
---
- [css选择器](#css选择器)
  - [通用选择器](#通用选择器)
  - [伪类和伪元素](#伪类和伪元素)
      - [:first-line伪元素](#:first-line伪元素)
      - [:first-letter](#:first-letter)
      - [:before :after](#:before-:after)
    - [伪类](#伪类)
      - [:first-child](#:first-child)
      - [链接伪类 :link :visited](#链接伪类-:link-:visited)
      - [动态伪类 :hover :active :focus](#动态伪类-:hover-:active-:focus)
    - [区别](#区别)
  - [派生选择器](#派生选择器)
  - [兄弟选择器（IE6不支持）](#兄弟选择器IE6不支持)
  - [群组选择器](#群组选择器)
  - [伪类选择器](#伪类选择器)
    - [锚伪类](#锚伪类)
    - [first-child 伪类](#first-child-伪类)
    - [lang 伪类](#lang-伪类)
---

# css选择器

| Pattern                | Meaning                                  | Described in section |

| ---------------------- | ---------------------------------------- | -------------------- |

| *                      | 匹配所有元素t                                  | 同用选择器                |

| E                      | 匹配E                                      | 类型选择器                |

| E F                    | E的后代F                                    | 后代选择器                |

| E > F                  | E的直接孩子F                                  | 子选择器                 |

| E:first-child          | 匹配E的第一个孩子                                | 第一个孩子伪               |

| E:linkE:visited        |                                          | 链接伪类选择器              |

| E:activeE:hoverE:focus |                                          | 动态伪类选择器              |

| E:lang(c)              |                                          | lang()伪类选择器          |

| E + F                  | 匹配E的兄弟元素F                                | 相邻选择器                |

| E[foo]                 | 匹配拥有foo属性的E元素                            | 属性选择器                |

| E[foo="warning"]       | 完全匹配E元素属性foo=“warning”                   | 属性选择器                |

| E[foo~="warning"]      | 匹配属性foo的值中含有warning的E元素（`<E foo="warning others">`） | 属性选择器                |

| E[lang\|="en"]         | 匹配属性lang中以en开头（连字符）的E元素（`<E lang="en-abc">`） | 属性选择器                |

| DIV.warning            | 和DIV[class~="warning"]一样                 | 类选择器                 |

| E#myid                 | 完全匹配id为myid的元素                           | ID选择器                |

一个选择器是**一个链的一个或多个简单选择符的组合**。

组合是：`空格`、`>`和`+`。空格可以组合和简单的选择器周围之间出现。

与选择器匹配的文档树的元素称为选择器的主题。由单个简单选择器组成的选择器匹配满足其要求的任何元素。把一个简单的选择和组合到一个链增加了额外的匹配条件，因此选择符的主题总是匹配上一个简单的选择器的元素的子集。

## 通用选择器

如果通用选择器不是简单选择器的唯一组件，则可以省略“*”。例如:

- \*[lang=fr] 和 [lang=fr] 等价的。

- *.warning 和.warning 是等效的。

- *#myid 和#myid是等价的。

注。CSS给“类”属性赋予了很大的力量，作者可以根据几乎没有关联表示的元素（比如HTML中的div和span）设计自己的“文档语言”，并通过“类”属性分配样式信息。作者应该避免这种做法，因为文档语言的结构元素通常具有识别和接受的含义，而作者定义的类可能不。

## 伪类和伪元素

### 伪元素

伪元素创建超越文档语言指定的文档树的抽象。例如，文档语言不提供访问元素内容的第一个字母或第一行的机制。CSS伪元素允许样式表设计器引用否则无法访问的信息。伪元素还可以为样式表设计器提供一种将样式分配到源文档中不存在的内容的方法（例如：在伪元素提供对生成内容的访问之前和之后）。

**伪元素在CSS中的行为就像真实元素一样**

#### :first-line伪元素

选择器"P:first-line"不会匹配任何真实HTML元素。它匹配一个（与CSS规范）一致的UA，将在每个段落的开头插入的伪元素

```css
p:first-line { text-transform: lowercase }
```

**注意：**  第一行的长度取决于很多因素，包括页面宽度，字体大小等等。因此，原始的HTML段落例如：

:first-line 伪元素只能使用到块容器元素上（div，p……）

**注意**：`<p><br>First...`中P的第一行不包含任何字母。单词"First"不在第一个格式行内（空行）

:first-line伪元素与内联元素类似，但存在一些限制。下列属性适用于:first-line伪元素：`font`属性，`color`属性，`background`属性，'`word-spacing`'，'`letter-spacing`'，`'text-decoration`'，'`text-transform`(chrom好像不行，ie可以)和'`line-height`'

#### :first-letter

:first-letter伪元素一定选择一个块的第一行的第一个字母，如果这一行中在它前面**没有跟着任何其它内容**（例如，图片或者inline table）。:first-letter伪元素可能用于“首字母大写（initial caps）”和“首字母下沉（drop caps）”，这些都是常见的排版效果。**首字母的这种类型与一个'float'属性为'none'的内联元素或者浮动元素类似**

这些是适用于:first-letter伪元素的属性： 

`font`属性，`color`属性，`background`属性，'`word-spacing`'，'`letter-spacing`'，`'text-decoration`'，'`text-transform`(chrom好像不行，ie可以)和'`line-height`' 这些。

还有： '`float`'，`'vertical-alig`n'（仅当'float'为'none'时）， `margin`属性， `padding`属性， `border`属性

UA也可以应用其它规则。为了让UA正确渲染首字母下沉或者首字母大写排版，UA可能会根据字母的形状选择一个行高，宽度和高度，这与常规元素不同。CSS3预期具有能够应用于首字母的具体属性

- **如果首字母是个数字**，':first-letter'同样适用，例如，"67 million dollars is a lot of money."中的"

- **表单元格**或**内联块**的第一个字母不能是祖先元素的第一个字母。因此，在

  ```css
  <DIV><P STYLE="display: inline-block">Hello<BR>Goodbye</P> etcetera</DIV>
  ```

  中，DIV的首字母不是字母"H"，实际上，该DIV没有首字母。

- 首字母必须出现在**第一个格式化行（first-line）**中，例如，片段：`<p><br>First...`中，第一行没有任何字母，并且':first-letter'不会匹配任何东西。

- 如果一个元素具有`:before`或者`:after`内容，`:first-letter`应用于元素包括这些内容在内的第一个字母。 例如，应用'p:before {content: "Note: "}'规则后，选择器'p:first-letter'会匹配"Note"的"N"

- `:first-letter`元素在`:first-line`元素里面。设置在:first-line上的属性被:first-letter继承了，而且如果设置的是:first-letter的相同属性，则会被重写（first-letter和first-line同时设置相同属性，**first-letter生效**）

#### :before :after

':before'和':after'伪元素可以用来在一个元素的内容之前或之后插入生成的内容，在[生成的文本](http://www.ayqy.net/doc/css2-1/generate.html)章节中有解释

```css
h1:before {content: counter(chapno, upper-roman) ". "}
```

当:first-letter和:first-line伪元素被应用在一个具有使用:before和:after生成内容的元素，它们应用于元素包括生成的内容在内的首字母或者首行

```css
p.special:before {content: "Special! "}
p.special:first-letter {color: #ffd800}
```

将会把"Special!"的"S"渲染成金色

### 伪类

伪类将元素除其名称、属性或内容以外的元素进行分类；原则上不能从文档树中推断出特征。伪类可能是动态的，从某种意义上说，当用户与文档交互时，元素可能获得或丢失伪类。

#### :first-child

表示**该种元素**是第一个孩子

```css
div > p:first-child { text-indent: 0 }
```

```html
<P> The last P before the note.</P>  不匹配
<DIV class="note">
	<P> The first P inside the note.</P>   匹配
</DIV>
<P> The last P before the note.</P>  不匹配
<DIV class="note">
	<H2>Note</H2>
  	<P> The first P inside the note.</P>  不匹配
</DIV>
```

```css
p:first-child span{ color:red }
=== * > p:first-child span{ color:red }
```

```html
  <p>test <span>haha</span></p>   X  没有父亲
  <div>
    <p>test <span>haha</span></p>  V
    <p>test <span>haha</span></p>  X  不是第一个孩子
    <div>
      <h1>first-child</h1>  
      <p>test <span>haha</span></p>  X  不是第一个孩子
      <div>
        <p>test <span>haha</span></p>  V  是第一个孩子
      </div>
    </div>
  </div>
```

#### 链接伪类 :link :visited

- :link链接伪类适用于尚未访问的链接。

- :visit 一旦用户访问了链接，该伪类就应用了

这两种状态是**互斥的**

文档语言决定了哪些元素是超链接源anchor（例如，HTML4中，link伪类适用于带有"href"属性的A元素）

```css
a:link { color: red }
=== :link  { color: red }
```

**注意：**

样式表编写者可能滥用:link和:visited伪类，来确定用户已经曾访问过哪些站点，而不经用户同意（比如把某些未访问过的站点变成访问的颜色）

UA因此可以把所有链接都当作未被访问过的链接，或者在分别渲染访问过的和未访问过的链接时，采取其它措施来保护用户的隐私

#### 动态伪类 :hover :active :focus

- :hover伪类应用于当用户指定了一个元素（用某些指针设备），但没有激活它时

- :active伪类应用于当一个元素被用户激活时。例如，在用户按下鼠标按钮并释放时

- :focus伪类应用于当一个元素拥有焦点（接受键盘事件或者其它文本输入形式）时

一个元素**可以同时匹配几个伪类**

```css
a:link    { color: red }    /* unvisited links */
a:visited { color: blue }   /* visited links   */
a:hover   { color: yellow } /* user hovers     */
a:active  { color: lime }   /* active links    */
lvha  love hate
```

注意，A:hover必须放在A:link和A:visited规则后面，因为否则层叠规则将会隐藏A:hover规则中的['color'](http://www.ayqy.net/doc/css2-1/colors.html#propdef-color)属性。类似的，因为A:active放在A:hover后面，用户激活并悬停在A元素上时，将会应用激活态的颜色(lime)

结合了动态伪类的示例：

```css
a:focus { background: yellow }
a:focus:hover { background: white }
```

最后一个选择器匹配处于伪类:focus和伪类:hover（状态）的A元素

关于展示焦点轮廓（focus outline）的更多信息，请查看[动态焦点轮廓](http://www.ayqy.net/doc/css2-1/ui.html#dynamic-outlines)章节

- **注意** CSS1中，':active'伪类与':link'和':visited'是互斥的，而现在情况不一样了。一个元素可以同时处于':visited'和':active'（或者':link'和':active'），由常规层叠规则决定应用哪个样式声明*

- **注意** CSS1中，':active'伪类只会应用于链接*

### 区别

**伪类允许在选择器中的任何位置**，而伪元素只能在选择器的**最后一个简单选择器之后追加**。

伪元素和伪类名不区分大小写。

有些伪类是互斥的，而其他类可以同时应用于同一个元素。在规则冲突的情况下，正常的级联顺序决定结果。

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

