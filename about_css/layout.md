## 目录
---
- [两栏布局](#两栏布局)
- [三栏布局](#三栏布局)
  - [圣杯（双飞翼）](#圣杯双飞翼)
---

## 两栏布局
左侧200px固定，右侧自适应
![your text](http://o7bk1ffzo.bkt.clouddn.com/1500385653092)
可选方案很多，根据项目要求选择，一般我选**第一种方案**。方案四**全浮动**常用来做圣杯（双飞翼）布局。

| 套父亲盒 | 左         | 右           | 原理                           | 注意                    |
| -- | -- | -- | -- | -- |
| \             | float:left                   | overflow:auto/hidden    | BFC紧挨浮动盒子        | 底下清除浮动或者套个父亲,overflow:hidden    |
| 随意            | position:absolute/float:left | margin-left:200px       | 空出左边的区域              | 左侧太高的话，无法撑开container，有底栏的时候问题严重 |
| 需要            | position:absolute            | padding-left:200px      | 空出左边区域         | 问题同上          |
| padding:200px | margin-left:-200px           | float:right，width:100%; | 主区域浮动，浮动盒子相互紧挨，width100%，通过父亲盒子的padding控制左侧区域。 | 父亲盒建立BFC就没什么问题                  |

## 三栏布局
### 简单三栏布局
左float:left
右float:right
中间overflow:auto/hidden或者margin-left/right设置
但是它要求左右边栏在中间栏上方显示
```html
	<div class="container">
		<div class="left">
			左栏
		</div>
		<div class="right">
			右栏
		</div>
		<div class="main">
			中栏
		</div>
	</div>
	<div class="footer">
		底栏
	</div>
```
### 圣杯（双飞翼）
圣杯模型讲究的是在布局上，**先内容，再左右导航**，这样的好处是，加载的时候，主要的内容先加载出来。也符合语义化。
```html
	<div class="container">
		<div class="main">
			中栏
		</div>
		<div class="left">
			左栏
		</div>
		<div class="right">
			左栏
		</div>
	</div>
	<div class="footer">
		底栏
	</div>
```
三个模块全是float，这样可以紧挨着，同时在浮动流中可以通过负margin移动元素。
中间：width:100%
左边：margin-left:-100%;
右边：margin-left:-100px (自身宽度)
![your text](http://o7bk1ffzo.bkt.clouddn.com/1500388510237)
接下来就是把中间区域限制一下，很容易想到，直接用父亲盒子设置左右padding就行了。
![your text](http://o7bk1ffzo.bkt.clouddn.com/1500389357241)
然后，再通过相对定位，left和right进行移动
![your text](http://o7bk1ffzo.bkt.clouddn.com/1500389385555)
双飞翼模式有点不一样，**它是在main元素外面再套了一个父亲盒，然后设置父亲盒子的margin-left和margin-right**
总结一下，圣马布局和双飞翼的流程大体上是这样的
- 搭建 head content foot, content 内部的三个元素全部左浮动，然后清除浮动防止影响 footer
- 给 main 100% 的宽度让他占满一行
- 给 left -100% 的margin-left 让他移动到最左边，给 right 和他宽度一样的负 margin 让他移动到最右边
- 针对移动后 main 的两边会被 left 和 right 重合覆盖掉做出不同的改变，这儿也就是两个布局的本质区别
  - 圣杯布局会给 content 内边距，**左右分别为 left 和 right的宽度**，然后再利用相对定位移动 left 和 right
  - 双飞翼布局会在 main 里面再加一层 wrap ，然后把内容都写在 wrap 里面，正对 **wrap 设置他的 margin**, 左右外边距和 left 与 right 一样
1. 实现布局：当屏幕行高不够的时候，footer吸底，当屏幕高度足够的时候，footer在页面的最底下。
2. 实现布局：左右元素定宽 中间自适应布局
3. 实现布局: 两栏布局，左侧固定宽度，右侧自适应
