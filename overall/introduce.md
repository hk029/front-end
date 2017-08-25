## 目录
---
- [自我介绍](#自我介绍)
- [为什么选vue，vue和react和angular的区别是什么](#为什么选vue，vue和react和angular的区别是什么)
---



## 自我介绍



我叫黄锴，目前在中国科学院大学读研二，明年毕业。目前在搜狐实习，实习大致3-4个月，在搜狐负责一个2C端的项目——搜狐焦点经纪人版块的开发。然后组内目前就我一个前端。所以，基本上是一个人负责所有的前端业务。目前还负责维护搜狐焦点的IM插件。该插件是一个用vue写的。然后平时的话，自己会做一些小项目，比如豆瓣客，英语阅读器，内部使用的周报系统。



项目难点的话，说实话，我接触的项目难点大多都是业务难点。业务难点多起来，就多了去了，业务上的问题，大多都有变通的方式。比如要



- 因为显示问题大多都不是用的原生的控件：比如我们项目里就要自制select(hover)，Input的placeholder不支持ie9，table需要固定宽度，有时候用div就会比较方便。

- 比较奇葩需求还有**控制内容显示两行**。

- hover图片变化（设置两张背景图，在hover的时候切换background-img样式，但是会出现闪动，因为是动态加载的，改成使用一张图，切换position就会好很多）

- 联想搜索（引入**防抖动**）。吸顶。实现页面栏。

- 动态加载内容时候，过度加载。（加锁）

- 点赞反馈。

- 还有一些移动端的问题（300ms和点击穿越，去除点击区域的黄框，还有fixed顶在输入框出来的时候，会失效，固定页面大小）

- 布局问题，不能使用flex。（从这里**引入flex**）

- ugly代码调试问题（fiddler）



技术难点，说实话应该也是有很多的，但是我之前一直都没记录下来。就讲讲最近遇到的吧，都是ie9的问题。就是ie9没有console对象。导致页面整体死掉。



还有ie9的跨域问题。ie9下无法实现CORS方式跨域。可以使用jsonp解决。或者使用iframe跨域。（**引入跨域**）







还有，其实我觉得遇到的技术难点都还好，沟通才是我目前发现最大的难点。前端和后台的沟通，一个接口设计的合理不合理，数据到底是前端取还是后台塞。需求是否合理



- 设计稿是否能实现（量像素问题，是用padding，margin，还是line-height），我自己的经验是：一般来说，明显能看出区域之间的间隔使用margin，但是margin有个问题经常首尾的内容距离其他部分还有一部分的margin，这时候通过计算就很麻烦，最好就直接通过使用margin塌陷（引入**margin塌陷**）。其他的尽量使用padding，不存在塌陷问题。然后line-height一般设置成1：1的关系，方便测量。但是难在多段文字的时候，得通过line-height做出间隔，但是line-height撑开行盒后，段落与其他区域间的距离，就要通过手动计算了。



  [scroll优化之防抖与节流](https://segmentfault.com/a/1190000007676390)













## 为什么选vue，vue和react和angular的区别是什么



只要我面试就一直会被问到这个问题，我私下也查过很多react，angular的特点，和vue的对比。



- 有种说法是angular和vue是强化html，而react是强化js，angular和vue强调的是vm层，利用模板引擎语法，把数据和视图绑定起来。而react是把html嵌入了js中。



- angular和vue都是双向数据绑定，react是单向数据流。但是angular是脏检查机制，不断的watch。在watcher过多的时候，效率低。vue是通过get和set，相对来说效率会高一些。



- react是用JSX语法，而且高度组件化。vue也是提倡组件化。他们两个都没内置核心工具，比如ajax，router，需要进行加载，angular就内置。



- react依赖虚拟dom来做脏检查



  ​



但是，说实话，我现在知道这些又有什么意义呢？最后，其实不是我决定用什么，而是业务决定的。如果我去了公司，公司用react，那我就从头开始学react呗，反正开发都是看文档。







其实说实话，三个框架都是主流的框架，目前来看，大家都发展的很好，也不见得谁要取代谁。而且我觉得**学框架不是为了学而学，而是为了解决问题而学**。如果抛开效率问题，我大可以用原生js去做当时的一切（我也这么做过），大不了自己遇到问题，多造几个轮子，或者用现有的轮子。**我觉得框架这东西，没有最好的，适合的就是最好的。**我当时为什么选择vue，很简单，我对比了一圈，大家都说vue上手简单，而我的需求是什么？是快速构建一款应用。我不需要考虑那么多。我用vue，也只是因为它用起来确实很方便，双向绑定很舒服。模板语法很简单。而且vue2.0也引入了虚拟dom的概念，vue是一个新生儿，意味着它可以吸取react和angular的优点。



已经了解到vue是通过数据劫持的方式来做数据绑定的，其中最核心的方法便是通过Object.defineProperty()来实现对属性的劫持，达到监听数据变动的目的，无疑这个方法是本文中最重要、最基础的内容之一，如果不熟悉defineProperty，猛戳这里
整理了一下，要实现mvvm的双向绑定，就必须要实现以下几点：
1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
4、mvvm入口函数，整合以上三者
![](https://segmentfault.com/img/bVBQYu)



# 坑

## es6

### let

- let和const注意：只有在`{}`中才有作用域（**if单语句不加{} 不能用let**）

- let定义后，不能再用let,var,const重复定义（先var再let可以），传的**参数名默认也是let**定义的

- `for`循环还有一个特别之处，**就是循环语句部分是一个父作用域**，而循环体内部是一个单独的子作用域。

- 无变量提升

- 暂时性死区TDZ（在{}内部定义之后，在这个块里let定义之前访问这个变量会报`ReferenceError`的错）

  ```js
  var tmp = 123;
  if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
  }
  ```

- typeof不再绝对安全（因为TDZ）

- 不属于顶层对象

- **const只保护地址**（对象内部属性不保证）



### 箭头

- 没有this，this会一直查找（对箭头函数用bind,apply,call改变this无效）



## 类型转换



```
parseInt("")  //NaN    注意和Number不同，Number("")  -> 0 
```

- 几乎任何值都有的`toString()`（**除了null和undefined**），但是！String()，**可以将所有的类型转换成字符串**，它会先调用toString()，不能转换（null,undefined）的再特殊处理，不能更改进制。(**字符串的+操作就是利用这个**)

```
String(10) // "10"
String(null) //"null"
String(undefined)  //"undefined"
null.toString   //报错
```

- Object默认转换成"[object Object]"，**除非手动实现了toString函数**

### == 和 ===

- == 如果是同一类型，直接比较（**对象比较指针，永远不相等**）

- null和undefined和非这两者的值，都为false

- Number和String, String=>Number

- Boolean和其他类型，Boolean=>Number（0，1）

- Number，String和Object, Ojbect调用valueOf或toString

  > Object默认转换成"[object Object]"，除非手动实现了toString函数
  >
  > **数组会扁平化！！**
  >
  > []转换成""
  >
  > [1]转换成"1"
  >
  > [1,2,[3,4],5]转换成"1,2,3,4,5"



`margin-top`和`margin-bottom`对**非替换行内元素无效**

padding的百分比计算和margin一样，都**只与父亲的width有关**

★border设置的时候，**最少需要设置一个样式**

边框宽度**默认medium**

边框**颜色默认值**为`color`值



注意：对于那些包**含块基于一个块级元素的绝对定位的元素**，百分比根据**这个元素的padding box的高度来计算**。这与CSS1不同，（CSS1中）百分比总是根据父级元素的*content box*来计算.



宽度**初始值为auto**



margin塌陷

1. 都属于**流内**（in-flow）[**块级盒**](https://github.com/hk029/front-end/blob/master/about_css/fc.md#%E5%9D%97%E7%BA%A7%E5%85%83%E7%B4%A0Block-level-elements%E4%B8%8E%E5%9D%97%E7%BA%A7%E7%9B%92Block-level-boxes) ，处于**同一个**[块格式化上下文**BFC**](https://github.com/hk029/front-end/blob/master/about_css/fc.md)
2. **没有行盒** （line box），**没有空隙（clearance）**，**没有padding**并且**没有border把它们隔开**（注意，因此某些0高度行盒会被忽略）















