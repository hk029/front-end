# front-end
前端基本功以及面试必备知识
# JS相关

- [jsonp](about_js/jsonp.md)
- [同源策略 和 部分其他跨域方法](about_js/sameorigin.md)
- [如何clone一个对象(深拷贝)](about_js/clone.md)
- [闭包](/about_js/closure.md)
- [如何实现继承](about_js/extend.md)
- [this](about_js/this.md)
- [数组相关](/about_js/array.md)
- [链式调用](/about_js/chain.md)
- [上下文](/about_js/context.md)
- [事件](/about_js/event.md)
- [jsonp](/about_js/jsonp.md)
- [polyfill](/about_js/polyfill.md)
- [原型(链)](/about_js/prototype.md)
- [同源问题与跨域](/about_js/sameorigin.md)
- [cache](/caching/cache.md)
- [cookie](/caching/cookie.md)
- [session](/caching/session.md)

# css 相关
- [盒模型](/about_css/box.md)
- [层叠](/about_css/cascade.md)
- [居中](/about_css/center.md)
- [css3相关](/about_css/css3.md)
- [格式化上下文](/about_css/fc.md)
- [flex布局](/about_css/flex.md)
- [流模型](/about_css/flow.md)
- [hack](/about_css/hack.md)
- [基本布局](/about_css/layout.md)
- [less](/about_css/less.md)
- [sass](/about_css/sass.md)
- [css选择器](/about_css/selector.md)

# html 相关
- [doctyp](/about_html/doctype.md)
- [head](/about_html/head.md)
- [语义化标签](/about_html/semantic.md)
- [常用标签](/about_html/tags.md)
- [viewpor](/about_html/viewport.md)


# ES6
- [箭头函数](/es6/arrow.md)
- [class](/es6/class.md)

#框架，工具
## vue
- [vue相关](/framework/vue/vue.md)
- [vuex](/framework/vue/vuex.md)
- [vue-router](/framework/vue/vue_router.md)

## webpack
- [webpack基本知识](/framework/webpack.md)


# nodejs
- [nodejs相关](/framework/nodejs/nodejs.md)
- [fs](/framework/nodejs/fs.md)
- [http](/framework/nodejs/http.md)

## 前端综合
1. [ajax](/overall/ajax.md)
1. [cookie](/overall/cookie.md)
1. [fiddler使用](/overall/fiddler.md)
1. [flex布局](/overall/flex.md)
1. [generator](/overall/generator.md)
1. [iframe](/overall/iframe.md)
1. [通信](/overall/message.md)
1. [promise](/overall/promise.md)
1. [正则表达式](/overall/regex.md)
1. [存储相关](/overall/storage.md)

### 事件委托


1. 闭包 原型(prototype)
2. 如何实现链式调用
3. 原生js实现jquery选择器
4. 原生对象 html api

## ES相关:

1. 闭包 作用域 词法环境
2. 实现继承 克隆
3. this call apply arguments
4. 如何实现es5 es6方法的polyfill

## CSS相关:

1. 实现布局：当屏幕行高不够的时候，footer吸底，当屏幕高度足够的时候，footer在页面的最底下。
2. 实现布局：左右元素定宽 中间自适应布局
3. 盒模型(*)
4. position float display(*)
5. 浏览器模式(解释清楚算加分项)
6. 选择器的优先级(加分项)
7. 垂直居中

## DOM/BOM相关：

1. 事件/自定义事件
2. 选择器
3. 属性操作
4. dom的遍历

## 前端综合技能：

1. http
2. cookie
3. ajax
4. iframe
5. 消息通信
6. 本地存储
7. Promise
8. generator
9. 弹性布局
10. box-sizing
11. 响应式（px, em, rem) 屏幕适配
12. 瀑布流
13. 视差滚动
14. 多媒体 上传
15. 如何调试方法 抓包 fiddler作用
16. nginx
17. 正则表达式

## 框架相关：

1. jquery backbone vue angular react bootstrap nodejs webpack/gulp/grunt seajs requirejs underscore koa express mateor
   1. jquery:
      1. 事件 区别 on bnd live 等 delegate 如何实现
      2. 选择器
      3. 类似offset如何实现
      4. 如何实现简易的jquery
   2. backbone：
      1. mvc
   3. vue：
      1. 生命周期
      2. keep-alive
      3. template/render
      4. mvvm
      5. 双向绑定 无法监测的情况 数组 对象
      6. css隔离 scope实现
      7. 跨模块数据props、vuex
      8. vue-router
   4. angular：
      1. 双向绑定
         1. 脏检查
         2. 触发场景
         3. 性能问题
   5. react：
      1. 虚拟dom
      2. 组件生命周期
      3. render方法 state props区别
   6. bootstrap：
      1. 响应式
      2. 栅格布局
   7. nodejs:
      1. 用nodejs开发过什么 遇到过什么坑
      2. 服务端如何实现session
      3. 怎么实现负载均衡
      4. 用过什么库
   8. webpack/gulp/grunt:
      1. 构建工具的理解
      2. 如何优化性能
      3. 做个哪些开发
      4. npm如何加载 查找包
   9. seajs/requirejs/commonjs：
      1. commonjs规范 amd cmd
      2. 如何管理依赖
   10. underscore
       1. 如何链式调用
   11. koa
   12. express
   13. mator
2. sass和less是什么，为什么要使用它们

## 算法题：

1. 经典题：
   1. 链表判环
   2. 翻转链表
   3. 链表取倒数第n个
   4. 有序链表合并
   5. 数组排序
   6. 数组去重
   7. 括号的匹配（栈）
   8. 二叉树的遍历
   9. 背包问题