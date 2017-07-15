# front-end
前端基本功以及面试必备知识
# JS相关

## 解释一下jsonp，原理，同源策略，如何实现跨域post

### [jsonp](/hk029/front-end/about_js/jsonp.md)

### [同源策略 和 部分其他跨域方法](/hk029/front-end/about_js/sameorigin.md)


2、通过修改document.domain来跨子域

3、使用window.name来进行跨域

4、使用HTML5中新引进的window.postMessage方法来跨域传送数据（ie 67 不支持）


### 如何clone一个对象 深拷贝 浅拷贝 如何实现继承



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