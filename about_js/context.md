
## 写开开头

首先，我们要知道执行环境(execution context)和作用域(scope)是两个完全不同的概念。 

每个**执行环境**都有与之关联的**变量对象（variable object)**, 最外层的执行环境是全局执行环境（global对象）。环境中定义的所有变量和函数都保存在这个对象中。执行环境始终是this关键字的值，它是拥有当前所执行代码的对象的引用。

代码在一个执行环境中执行的时候，会创建变量的一个作用域链（scope chain） 

换句话说，作用域涉及到所被调用函数中的变量访问，并且不同的调用场景是不一样的。每个执行环境都有一个与之关联的变量对象。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。

## 执行环境（也称执行上下文–execution context）

- 当JavaScript解释器初始化执行代码时，它首先默认进入**全局执行环境**，从此刻开始，函数的每次调用都会创建一个**新的执行环境**。 

- **每个函数都有自己的执行环境**。

- 当执行流进入一个函数时，函数的环境就会被推入一个**环境栈中**（execution stack）。在函数执行完后，栈将其环境弹出，把控制权返回给之前的执行环境。ECMAScript程序中的执行流正是由这个便利的机制控制着。 

- 执行环境可以分为**定义期**和**执行期**两个阶段。

  ### 定义期

  函数**定义**的时候，都会创建一个**[[scope]]**属性，这个对象对应的是一个对象的列表（之前作用域链上的**变量对象**），列表中的对象仅能javascript内部访问，没法通过语法访问

  ```js
  // 外部函数
  function A(){
       var somevar;    
       // 内部函数
      function B(){
           var somevar;
       }
  }
  ```

  ![your text](http://o7bk1ffzo.bkt.clouddn.com/1500300196404)

  ### 执行期

  当函数被执行的时候，就是**进入这个函数的执行环境**

  - 首先会创一个它自己的**活动对象**【Activation Object】（这个对象中包含了this、参数(arguments)、局部变量(包括命名的参数)的定义，当然全局对象是没有arguments的）和一个变量对象的作用域链[[scope chain]]
  - 然后，把这个执行环境的[scope]按顺序复制到[[scope chain]]里，最后把这个活动对象推入到[[scope chain]]的顶部。这样[[scope chain]]就是一个有序的栈，**这样保了对执行环境有权访问的所有变量和对象的有序访问**。

  ​

```js
function Fn1(){
    function Fn2(){
        alert(document.body.tagName);//BODY
        //other code...
    }
    Fn2();
}
Fn1();
//code here
```

![your text](http://o7bk1ffzo.bkt.clouddn.com/1500299260197)
图片来自于[理解Javascript_12_执行模型浅析](http://www.cnblogs.com/fool/archive/2010/10/16/1853326.html)

此外还要注意一下几点：

- 单线程
- 同步执行
- 唯一的全局执行环境
- 局部执行环境的个数没有限制
- 每次某个函数被调用，就会有个新的局部执行环境为其创建，即使是多次调用的自身函数(即一个函数被调用多次，也会创建多个不同的局部执行环境)。

## 变量提升

> In javascript, every variable declaration is hoisted to the top of its declaration context.

其实可以这么理解，在创建了执行环境后，它就要为自己创建一个**活动对象**，就需要**扫描所有的局部变量，加入到对象中**去。

这时候，实际上所有的变量就被提前了。此时**活动对象就已经包含了所有的局部变量，由于作用域链的问题，最先访问的都是当前活动对象的变量**，因此当然都是可以直接访问的。但是它们可能就变成了未被赋值的，所以就会出现种种奇怪的现象。



```js
var myvar = 'my value';  
(function(){
    alert(myvar); // undefined
    var myvar = 'you value';  
})()
```



同时，函数也会提前，所以可以直接访问。但是如果是**函数表达式** 就要小心了，因为**表达式只有在执行的时候才会赋值**，之前只做变量提升。

```js
count(1,2); // 3
function count(a,b)
{
    alert(a+b);    
}

count(1,2); // 会报错误count is not a function
var count = function (a,b)
{
    alert(a+b);    
}
```



另外一个需要提一下的是，函数的声明是优先于变量的声明的。



## 作用域

- 当代码在一个环境中执行时，会创建变量对象的一个作用域链（scope chain）。作用域链的用途是保证对执行环境有权访问的所有变量和函数的有序访问。 
- 作用域链包含了执行环境栈中的**每个执行环境对应的变量对象**。通过作用域链，可以决定变量的访问和标识符的解析。 

**注意**：全局执行环境的变量对象始终都是作用域链的**最后一个对象。**

在访问变量时，就必须存在一个可见性的问题(内层环境可以访问外层中的变量和函数，而外层环境不能访问内层的变量和函数)。更深入的说，当访问一个变量或调用一个函数时，JavaScript引擎将不同执行环境中的变量对象按照规则构建一个链表，在访问一个变量时，先在链表的第一个变量对象上查找，如果没有找到则继续在第二个变量对象上查找，直到搜索到全局执行环境的变量对象即window对象。这也就形成了Scope Chain的概念。 
![your text](http://o7bk1ffzo.bkt.clouddn.com/1500299451878)
图片来自于[理解Javascript_12_执行模型浅析](http://www.cnblogs.com/fool/archive/2010/10/16/1853326.html)

作用域链图，清楚的表达了执行环境与作用域的关系(一一对应的关系)，作用域与作用域之间的关系(链表结构，由上至下的关系)。 

```js
//红宝书代码
var color = "blue";
function changeColor(){
  var anotherColor = "red";
  function swapColors(){
    var tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
    // 这里可以访问color, anotherColor, 和 tempColor
  }
  // 这里可以访问color 和 anotherColor，但是不能访问 tempColor
  swapColors();
}
changeColor();
// 这里只能访问color
console.log("Color is now " + color);
```

上述代码一共包括三个执行环境：`全局执行环境`、`changeColor()的局部执行环境`、`swapColors()的局部执行环境`。

- 全局环境有一个变量color和一个函数changecolor();
- changecolor()函数的局部环境中具有一个anothercolor属性和一个swapcolors函数，当然，changecolor函数中可以访问自身以及它外围（即全局环境）中的变量;
- swapcolor()函数的局部环境中具有一个变量tempcolor。在该函数内部可以访问上面的两个环境（changecolor和window）中的所有变量，因为那两个环境都是它的父执行环境。 

上述代码的作用域链如下图所示： 

![your text](http://o7bk1ffzo.bkt.clouddn.com/1500299544873)

结论：

- **内部环境可以通过作用域链访问所有的外部环境**，但是外部环境不能访问内部环境中的任何变量和函数。 
- **标识符解析**（变量名或函数名搜索）是沿着作用域链**一级一级地搜索标识符的过程**。搜索过程始终从作用域链的前端开始，然后逐级地向后（全局执行环境）回溯，直到找到标识符为止，或者找到全局执行环境也没找到，undefined。





## 执行环境与作用域的区别与联系

- 执行环境为**全局执行环境**和**局部执行环境**，局部执行环境是函数执行过程中创建的。 （还有一个eval环境）
- 作用域链是**基于执行环境的变量对象**的，由所有执行环境的变量对象(对于函数而言是活动对象，因为在函数执行环境中，变量对象是不能直接访问的，此时由活动对象(activation object,缩写为AO)扮演VO(变量对象)的角色。)共同组成。 
- 当代码在一个环境中执行时，会创建变量对象的一个作用域链。作用域链的用途：**是保证对执行环境有权访问的所有变量和函数的有序访问**。作用域链的**前端**，始终都是当前执行的代码所在环境的**变量对象**。



## 没有块级作用域

es6有了，用let，详细的去看es6的[let&const](../es6/let&const.md)



## 延长作用域链

1. try-catch语句的catch块；
2. with语句



看下面实例：

```js
(function bildUrl(){
 var qs = "?debug=true";
    with(location){
         var url = href + qs;    
     }
   alert(url)
})()
```

with会把location对象的所有属性和方法**包含到变量对象**中，并**加入到作用域链的顶部**。此时访问href实际上就是location.href。

但新声明的“url”变量会加入到最近的执行环境的变量对象里。试下面例子，说明url是可以访问到的，只是此时是undefined

```js
(function bildUrl(){
            var qs = "?debug=true"; 
            if (!url)
            {
                alert("这里可以看到url"); //可以正常显示url已经被声明并且被扫描进函数的变量对象
            }
            
            try{
                if (!a)
                {
                    alert(1);// 报错因为a根本就不存在
                }
            }
            catch(e){
                console.log("作用域链被延长了吧");
            }
            
            with(location){
                var url = href + qs;    
            }
            
        })()
```

对catch语句来说，会创建一个新的变量对象加入到作用域链的顶部，其中**包含的是被抛出的错误对象的声明。**
需要说明的是，ie8之前的版本有个不符合标准的地方，就是被势出的错误对象会被加入到执行环境的变量对象。



## 参考文章

 《Javascript高级程序设计》

[javascript高级程序第三版学习笔记【执行环境、作用域】](http://www.cnblogs.com/pigtail/archive/2012/07/19/2570988.html)

[原生JS执行环境与作用域深入理解](http://blog.csdn.net/liujie19901217/article/details/52225025)

[理解Javascript_12_执行模型浅析](http://www.cnblogs.com/fool/archive/2010/10/16/1853326.html)


