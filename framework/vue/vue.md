## 目录
---
- [遇到的问题](#遇到的问题)
  - [异步更新队列](#异步更新队列)
---

## 遇到的问题

### 无法检测到Object变更

受现代 JavaScript 的限制（以及废弃 Object.observe），Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。例如：

```js

var vm = new Vue({

  data:{

  a:1

  }

// `vm.a` 是响应的

vm.b = 2

// `vm.b` 是非响应的

```

Vue 不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：

```js

Vue.set(vm.someObject, 'b', 2)

```

您还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名：

```js

this.$set(this.someObject,'b',2)

```

有时你想向已有对象上添加一些属性，例如使用 Object.assign() 或 _.extend() 方法来添加属性。

但是，添加到对象上的新属性**不会触发更新**。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：

```js

// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`

this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })

```

### 异步更新队列

可能你还没有注意到，Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将**开启一个队列**，并缓冲在同一事件循环中发生的所有数据改变。**如果同一个 watcher 被多次触发，只会一次推入到队列中**。

这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际（已去重的）工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MutationObserver，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。

例如，当你设置 vm.someData = 'new value' ，该组件不会立即重新渲染。

当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果你想在 DOM 状态更新后做点什么，这就可能会有些棘手。

虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用` Vue.nextTick(callback)` 。这样回调函数在 DOM 更新完成后就会调用。例如：

```js

<div id="example">{{message}}</div>

var vm = new Vue({

  el: '#example',

  data: {

    message: '123'

  }

vm.message = 'new message' // 更改数据

vm.$el.textContent === 'new message' // false

Vue.nextTick(function () {

  vm.$el.textContent === 'new message' // true

```

在组件内使用 vm.$nextTick() 实例方法特别方便，因为它不需要全局 Vue ，并且回调函数中的 this 将自动绑定到当前的 Vue 实例上：

```js

Vue.component('example', {

  template: '<span>{{ message }}</span>',

  data: function () {

    return {

      message: '没有更新'

    }

  },

  methods: {

    updateMessage: function () {

      this.message = '更新完成'

      console.log(this.$el.textContent) // => '没有更新'

      this.$nextTick(function () {

        console.log(this.$el.textContent) // => '更新完成'

      })

    }

  }

```

