## 目录
---
- [webpack介绍](#webpack介绍)
- [WebPack和Grunt以及Gulp相比有什么特性](#WebPack和Grunt以及Gulp相比有什么特性)
- [webpack依赖](#webpack依赖)
- [webpack常用配置](#webpack常用配置)
- [webpack 常用功能](#webpack-常用功能)
  - [使用webpack构建本地服务器](#使用webpack构建本地服务器)
  - [Loaders](#Loaders)
- [Babel](#Babel)
  - [Babel的安装与配置](#Babel的安装与配置)
  - [Babel的配置选项](#Babel的配置选项)
- [一切皆模块](#一切皆模块)
  - [CSS](#CSS)
    - [CSS module](#CSS-module)
    - [CSS预处理器](#CSS预处理器)
- [插件（Plugins）](#插件Plugins)
  - [使用插件的方法](#使用插件的方法)
  - [HtmlWebpackPlugin](#HtmlWebpackPlugin)
  - [Hot Module Replacement](#Hot-Module-Replacement)
  - [优化插件](#优化插件)
    - [ExtractTextPlugin](#ExtractTextPlugin)
    - [缓存](#缓存)
- [参考文章](#参考文章)
---

## webpack介绍

>WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。 

## WebPack和Grunt以及Gulp相比有什么特性

其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack可以替代Gulp/Grunt类的工具。

Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，这个工具之后可以自动替你完成这些任务。

![your text](http://o7bk1ffzo.bkt.clouddn.com/1500820605770)

Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个浏览器可识别的JavaScript文件

![your text](http://o7bk1ffzo.bkt.clouddn.com/1500820622300)

如果实在要把二者进行比较，Webpack的处理速度更快更直接，能打包更多不同类型的文件。

## webpack依赖

webpack依赖于node,npm工具

## webpack常用配置

- devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项

- entry : 入口

- output ： 输出文件路径

  - path  : 路径

  - filename  ：文件名

- module

  - loaders: [

    test: /\.json$/,  ： 匹配规则

    loader: "json"    :  使用的loader

  ]

- postcss

- plugins 

```js
//一个常见的Webpack配置文件
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');  //插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: __dirname + "/app/main.js",  // __dirname是node一个全局变量
  output: {
    path: __dirname + "/build",
    filename: "[name]-[hash].js"
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
      }
    ]
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name]-[hash].css")
  ]
```

## webpack 常用功能

### 生成source map

| devtool选项                    | 配置结果                                     |

| ---------------------------- | ---------------------------------------- |

| source-map                   | 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包文件的构建速度； |

| cheap-module-source-map      | 在一个单独的文件中生成一个不带列映射的map，不带列映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便； |

| eval-source-map              | 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项； |

| cheap-module-eval-source-map | 这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和`eval-source-map`选项具有相似的缺点； |

### 使用webpack构建本地服务器

想不想让你的浏览器监测你都代码的修改，并自动刷新修改后的结果，其实Webpack提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以实现你想要的这些功能，不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖

```
npm install --save-dev webpack-dev-server
```

devserver作为webpack配置选项中的一项，具有以下配置选项

| devserver配置选项      | 功能描述                                     |

| ------------------ | ---------------------------------------- |

| contentBase        | 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录） |

| port               | 设置默认监听端口，如果省略，默认为”8080“                  |

| inline             | 设置为`true`，当源文件改变时会自动刷新页面                 |

| colors             | 设置为`true`，使终端输出的文件为彩色的                   |

| historyApiFallback | 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为`true`，所有的跳转将指向index.html |

继续把这些命令加到webpack的配置文件中，现在的配置文件如下所示

```js
module.exports = {
  ……
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  } 
```

### Loaders

**鼎鼎大名的Loaders登场了！**

Loaders是webpack中最让人激动人心的功能之一了。通过使用不同的loader，webpack通过调用外部的脚本或工具可以对各种各样的格式的文件进行处理，比如说分析JSON文件并把它转换为JavaScript文件，或者说把下一代的JS文件（ES6，ES7)转换为现代浏览器可以识别的JS文件。或者说对React的开发而言，合适的Loaders可以把React的JSX文件转换为JS文件。

Loaders需要单独安装并且需要在webpack.config.js下的`modules`关键字下进行配置，Loaders的配置选项包括以下几方面：

- `test`：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）

- `loader`：loader的名称（必须）

- `include/exclude`:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；

- `query`：为loaders提供额外的设置选项（可选）

继续上面的例子，我们把Greeter.js里的问候消息放在一个单独的JSON文件里,并通过合适的配置使Greeter.js可以读取该JSON文件的值，配置方法如下

```js
//安装可以装换JSON的loader
npm install --save-dev json-loader
```

创建带有问候信息的JSON文件(命名为config.json)

```js
//config.json
  "greetText": "Hi there and greetings from JSON!"
```

更新后的Greeter.js

```js
var config = require('./config.json');
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = config.greetText;
  return greet;
```

Loaders很好，不过有的Loaders使用起来比较复杂，比如说Babel。

## Babel

Babel其实是一个编译JavaScript的平台，它的强大之处表现在可以通过编译帮你达到以下目的：

- 下一代的JavaScript标准（ES6，ES7），这些标准目前并未被当前的浏览器完全的支持；

- 使用基于JavaScript进行了拓展的语言，比如React的JSX

### Babel的安装与配置

Babel其实是几个模块化的包，其核心功能位于称为`babel-core`的npm包中，不过webpack把它们整合在一起使用，但是对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析Es6的`babel-preset-es2015`包和解析JSX的`babel-preset-react`包）。

我们先来一次性安装这些依赖包

```js
// npm一次性安装多个依赖模块，模块之间用空格隔开
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
```

在webpack中配置Babel的方法如下

```js
module.exports = {
  ……
  module: {
   	  ……
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',//在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  }
```

现在你的webpack的配置已经允许你使用ES6以及JSX的语法了。继续用上面的例子进行测试，不过这次我们会使用React，记得先安装 React 和 React-DOM

```
npm install --save react react-dom
```

### Babel的配置选项

Babel其实可以完全在webpack.config.js中进行配置，但是考虑到babel具有非常多的配置选项，在单一的webpack.config.js文件中进行配置往往使得这个文件显得太复杂，因此一些开发者支持把babel的配置选项放在一个单独的名为 ".babelrc" 的配置文件中。我们现在的babel的配置并不算复杂，不过之后我们会再加一些东西，因此现在我们就提取出相关部分，分两个配置文件进行配置（webpack会自动调用`.babelrc`里的babel配置选项），如下：

```js
// webpack.config.js
module.exports = {
  ……
  module: {
    loaders: [
     ……
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  devServer: {...} // Omitted for brevity
//.babelrc
  "presets": ["react", "es2015"]
```

到目前为止，我们已经知道了，对于模块，Webpack能提供非常强大的处理功能，那那些是模块呢。

## 一切皆模块

Webpack有一个不可不说的优点，它把所有的文件都可以当做模块处理，包括你的JavaScript代码，也包括CSS和fonts以及图片等等等，只有通过合适的loaders，它们都可以被当做模块被处理。

### CSS

webpack提供两个工具处理样式表，`css-loader` 和 `style-loader`，二者处理的任务不同，`css-loader`使你能够使用类似`@import`和 `url(...)`的方法实现 `require()`的功能,`style-loader`将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

继续上面的例子

```
//安装
npm install --save-dev style-loader css-loader
```

```js
//使用
module.exports = {
  module: {
	……
      {
        test: /\.css$/,
        loader: 'style!css'//添加对样式表的处理
      }
    ]
  },
  devServer: {...}
```

> **注**：感叹号的作用在于使同一文件能够使用不同类型的loader

接下来，在app文件夹里创建一个名字为"main.css"的文件，对一些元素设置样式

你还记得吗？webpack只有单一的入口，其它的模块需要通过 import, require, url等导入相关位置，为了让webpack能找到”main.css“文件，我们把它导入”main.js “中，如下

```
//main.js
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';
import './main.css';//使用require导入css文件
render(<Greeter />, document.getElementById('root'));
```

> 通常情况下，css会和js打包到同一个文件中，并不会打包为一个单独的css文件，不过通过合适的配置webpack也可以把css打包为单独的文件的。

不过这也只是webpack把css当做模块而已，咱们继续看看一个真的CSS模块的实践。

#### CSS module

最近有一个叫做 CSS modules 的技术就意在把JS的模块化思想带入CSS中来，通过CSS模块，**所有的类名，动画名默认都只作用于当前模块**。Webpack从一开始就对CSS模块化提供了支持，在CSS loader中进行配置后，你所需要做的一切就是**把”modules“传递都所需要的地方**，然后就可以直接把CSS的类名传递到组件的代码中，且这样做只对**当前组件有效**，不必担心在不同的模块中具有相同的类名可能会造成的问题。具体的代码如下

```js
module.exports = {
  module: {
	……
      {
        test: /\.css$/,
        loader: 'style!css?modules'//跟前面相比就在后面加上了?modules
      }
    ]
  },
  devServer: {...}
```

放心使用把，相同的类名也不会造成不同组件之间的污染。

CSS modules 也是一个很大的主题，有兴趣的话可以去[官方文档](https://github.com/css-modules/css-modules)查看更多消息

#### CSS预处理器

Sass 和 Less之类的预处理器是对原生CSS的拓展，它们允许你使用类似于variables, nesting, mixins, inheritance等不存在于CSS中的特性来写CSS，CSS预处理器可以这些特殊类型的语句转化为浏览器可识别的CSS语句，你现在可能都已经熟悉了，在webpack里使用相关loaders进行配置就可以使用了，以下是常用的CSS 处理loaders

- Less Loader

- Sass Loader

- Stylus Loader

不过其实也存在一个CSS的处理平台-PostCSS，它可以帮助你的CSS实现更多的功能，在其[CSS官方文档](https://github.com/postcss/postcss)可了解更多相关知识。

举例来说如何使用PostCSS，我们使用PostCSS来为CSS代码自动添加适应不同浏览器的CSS前缀。

首先安装postcss-loader 和 autoprefixer（自动添加前缀的插件）

```
npm install --save-dev postcss-loader autoprefixer
```

接下来，在webpack配置文件中进行设置，只需要新建一个postcss关键字，并在里面申明依赖的插件，如下，现在你写的css会自动根据Can i use里的数据添加不同前缀了。

```js
//webpack配置文件
module.exports = {
  module: {
	……
      {
        test: /\.css$/,
        loader: 'style!css?modules!postcss'
      }
    ]
  },
  postcss: [
    require('autoprefixer')//调用autoprefixer插件
  ],
  devServer: {...}
```

到现在，本文已经涉及到处理JS的Babel和处理CSS的PostCSS，它们其实也是两个单独的平台，配合Webpack可以很好的发挥它们的作用。接下来介绍Webpack中另一个非常重要的功能-Plugins

## 插件（Plugins）

插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个

**插件并不直接操作单个文件，它直接对整个构建过程其作用。**

Webpack有很多内置插件，同时也有很多第三方插件，可以让我们完成更加丰富的功能。

### 使用插件的方法

要使用某个插件，我们需要通过npm安装它，然后要做的就是在webpack配置中的plugins关键字部分添加该插件的一个实例（**plugins是一个数组**）继续看例子，我们添加了一个实现版权声明的插件。

```js
//webpack.config.js
var webpack = require('webpack');
module.exports = {
  module: {
    loaders: [
      { test: /\.json$/, loader: "json" },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css?modules!postcss' }//这里添加PostCSS
    ]
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: [
    new webpack.BannerPlugin("Copyright Flying Unicorns inc.")//在这个数组中new一个就可以了
  ],
  devServer: {...}
```

通过这个插件，打包后的JS文件显示如下

![img](https://segmentfault.com/img/remote/1460000006766941)

知道Webpack中的插件如何使用了，下面给大家推荐几个常用的插件

### HtmlWebpackPlugin

这个插件的作用是依据一个简单的模板，帮你生成最终的Html5文件，这个文件中自动引用了你打包后的JS文件。**每次编译都在文件名中插入一个不同的哈希值。**

**安装**

```
npm install --save-dev html-webpack-plugin
```

这个插件自动完成了我们之前手动做的一些事情，在正式使用之前需要对一直以来的项目结构做一些改变：

1. 移除public文件夹，利用此插件，**HTML5文件会自动生成，此外CSS已经通过前面的操作打包到JS中了，public文件夹里**。

2. 在app目录下，**创建一个Html文件模板**，这个模板包含title等其它你需要的元素，在编译过程中，本插件会依据此模板生成最终的html页面，会自动添加所依赖的 css, js，favicon等文件，在本例中我们命名模板文件名称为index.tmpl.html，模板源代码如下

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Webpack Sample Project</title>
  </head>
  <body>
    <div id='root'>
    </div>
  </body>
</html>
```

3.更新webpack的配置文件，方法同上,新建一个build文件夹用来存放最终的输出文件

```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json" },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css?modules!postcss' }
    ]
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
    })
  ],
  devServer: {……}
```

### Hot Module Replacement

Hot Module Replacement（HMR）也是webpack里很有用的一个插件，它允许你在修改组件代码后，自动刷新实时预览修改后的效果。在webpack中实现HMR也很简单，只需要做两项配置

1. 在webpack配置文件中添加HMR插件；

2. 在Webpack Dev Server中添加“hot”参数；

不过配置完这些后，JS模块其实还是不能自动热加载的，还需要在你的JS模块中执行一个Webpack提供的API才能实现热加载，虽然这个API不难使用，但是如果是React模块，使用我们已经熟悉的Babel可以更方便的实现功能热加载。

整理下我们的思路，具体实现方法如下

- Babel和webpack是独立的工具

- 二者可以一起工作

- 二者都可以通过插件拓展功能

- HMR是一个webpack插件，它让你能浏览器中实时观察模块修改后的效果，但是如果你想让它工作，需要对模块进行额外的配额；

- Babel有一个叫做react-transform-hrm的插件，可以在不对React模块进行额外的配置的前提下让HMR正常工作；

更新我们的例子来实际看看如何配置

```js
//webpack中的配置
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json" },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css?modules!postcss' }
    ]
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ],
  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }
   
```

### 优化插件

webpack提供了一些在发布阶段非常有用的优化插件，它们大多来自于webpack社区，可以通过npm安装，通过以下插件可以完成产品发布阶段所需的功能

- OccurenceOrderPlugin :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID

- UglifyJsPlugin：压缩JS代码；

- ExtractTextPlugin：分离CSS和JS文件

#### ExtractTextPlugin

该插件会提取entry chunk中所有的`require('*.css')`，分离出独立的css文件。

```
new ExtractTextPlugin([id: string], filename: string, [options])
```

一个entry生成一个文件，当多个entry的时候，可以用`[name]/[id]/[contenthash]`来生成多个文件

- `id` 插件实例的唯一标识，自动生成

- `filename` 输出的filename，可以通过`[name]/[id]/[contenthash]`自定义filename

- `options.allChunks` 提取所有的chunk（默认只提取initial chunk）

- `options.disable` disable该插件

  ​

```
ExtractTextPlugin.extract([notExtractLoader], loader, [options])
```

该方法将已经存在的loader转换成一个提取loader

- `notExtractLoader` 不提取css时需要使用的loader

- `loader` 用来将资源文件转换为css输出模块的loader

- `options.publicPath` 覆盖loader的`publicPath`设置

  ​

#### 缓存

缓存无处不在，使用缓存的最好方法是保证你的文件名和文件内容是匹配的（内容改变，名称相应改变）

webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前。

```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/build",
    filename: "[name]-[hash].js"
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')  //分离css
      }
    ]
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),  //为组件分配ID
    new webpack.optimize.UglifyJsPlugin(),  //压缩js代码
    new ExtractTextPlugin("[name]-[hash].css") //生成文件名
  ]
```

## 参考文章

[入门 Webpack，看这篇就够了](https://segmentfault.com/a/1190000006178770)

