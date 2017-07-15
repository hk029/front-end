# Vuex

## 介绍

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

这个状态自管理应用包含以下几个部分：

- **state**，驱动应用的数据源；
- **view**，以声明方式将**state**映射到视图；
- **actions**，响应在**view**上的用户输入导致的状态变化。

单向数据流：

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499919392698)



但是，当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态。

- 来自不同视图的行为需要变更同一状态。

 

![your text](http://o7bk1ffzo.bkt.clouddn.com/1499919463930)



虽然 Vuex 可以帮助我们管理共享状态，但**也附带了更多的概念和框架**。这需要对短期和长期效益进行权衡。

如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 [global event bus](http://vuejs.org/guide/components.html#Non-Parent-Child-Communication) 就足够您所需了。但是，如果您需要构建是一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。



## store

Vuex 使用 **单一状态树** —— 是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个『唯一数据源([SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth))』而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

单状态树和模块化并不冲突 —— 在后面的章节里我们会讨论如何将状态和状态变更事件分布到各个子模块中。



每一个 Vuex 应用的核心就是 store（仓库）。"store" 基本上就是一个容器，它包含着你的应用中大部分的**状态(state)**。

Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是**响应式**的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你**不能直接改变 store 中的状态**。改变 store 中的状态的唯一途径就是显式地**提交(commit) mutations**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

STORE

- state ：单一数据源，通过computed绑定数据`store.state.xxx`
- mutations : 通过`store.commit(type)` 提交改变
- getters ： 通过computed绑定数据`store.getters.xxx`
- actions：通过`store.dispatch(type)` 分发action
- modules

## state



Vuex 通过 `store` 选项，提供了一种机制将状态从根组件『注入』到每一个子组件中（需调用 **Vue.use(Vuex)**）, 通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到

```js
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

要想动态更新数据，可以使用`computed`

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

当一个组件需要**获取多个状态时候**，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

当映射的**计算属性**的名称与 **state 的子节点名称相同**时，我们也可以给 `mapState` 传一个字符串数组。

```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

## getter

在获取state的时候，做一些函数处理。相当于公用的**computed**,

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
    //也可以接受其他的getter作第二参数，由于是箭头函数，所以必须要把getters传进去，不能用this
  	doneTodosCount: (state, getters) => {
    	return getters.doneTodos.length
  	}
  }
})
```

Getters 会暴露为 `store.getters` 对象

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

同理，也有一个`mapGetters`方法使用：

```javascript
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: mapGetters([
      'doneTodosCount',
      'anotherGetter',
    ])
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：

```js
mapGetters({
  // 映射 this.doneCount 为 store.getters.doneTodosCount
  doneCount: 'doneTodosCount'
})
```



## 多个map属性拼接

可能我的计算属性会用到mapState和mapGetters的多个属性，如何拼接呢，可以使用新的`对象展开运算符...`，这个现在已经在stge-3阶段了，不久应该就可以正式使用了，如果不使用这个方法，可以使用Object.assign方法。

```js
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
export default {
  //Object.assign()
  computed: Object.assign(mapState(['count']),mapGetters(['addTwo'])),
  // ...
  computed: {
    ...mapState(['count']),
    ...mapGetters(['addTwo'])
  }
}
  
```



## mutation

**更改** Vuex 的 store 中的**状态**的**唯一方法**是提交 mutation。 类似于**事件**而不是方法（你不能直接调用）

每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    //increment是事件类型，回调函数支持额外参数即mutation的载荷（payload)
    //在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
    increment (state,payload) {
      // 变更状态
      state.count += payload.amount
    }
  }
})
```

你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 `increment` 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 **store.commit** 方法：

```js
store.commit('increment')
```

当然也可以使用对象风格的提交方式：

提交 mutation 的另一种方式是直接使用包含 `type` 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

当使用对象风格的提交方式，**整个对象都作为载荷传给 mutation 函数**，因此 handler 保持不变：

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

### Mutations 需遵守 Vue 的响应规则

1. 最好提前在你的 store 中**初始化好所有所需属性。**

2. 当需要在对象上添加新属性时，你应该

   - 使用 `Vue.set(obj, 'newProp', 123)`或者

   - 以新对象替换老对象。例如，利用 stage-3 的[对象展开运算符](https://github.com/sebmarkbage/ecmascript-rest-spread)我们可以这样写：

     ```
     state.obj = { ...state.obj, newProp: 123 }
     ```

### mutation 必须是同步函数

一条重要的原则就是要记住**mutation 必须是同步函数**。为什么？请参考下面的例子：

```
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用 —— 实质上任何在回调函数中进行的的状态的改变都是不可追踪的。



### mapMutations

你可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation，或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 `store`）。

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment' // 映射 this.increment() 为 this.$store.commit('increment')
    ]),
    ...mapMutations({
      add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
    })
  }
}
```



## Actions

Action 类似于 mutation，不同在于：

- **Action 提交的是 mutation**，而不是直接变更状态。
- Action 可以包含任意**异步操作**。

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

当我们在之后介绍到 [Modules](https://vuex.vuejs.org/zh-cn/modules.html) 时，你就知道 context 对象为什么不是 store 实例本身了。

实践中，我们会经常会用到 ES2015 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码（特别是我们需要调用 `commit` 很多次的时候）：

```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

Action 通过 `store.dispatch` 方法触发：

```js
store.dispatch('increment')
```

Actions 支持同样的**载荷方式**和**对象方式**进行分发：

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

来看一个更加实际的购物车示例，涉及到**调用异步 API** 和 **分发多重 mutations**：

```js
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
   
```

你在组件中使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
    ]),
    ...mapActions({
      add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    })
  }
}
```

### 组合 Actions

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 `store.dispatch` 可以处理被触发的action的回调函数返回的Promise，并且store.dispatch仍旧返回Promise：

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以：

```js
store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：

```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 [async / await](https://tc39.github.io/ecmascript-asyncawait/) 这个 JavaScript 即将到来的新特性，我们可以像这样组合 action：

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

> 一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行

## 严格模式

开启严格模式，仅需在创建 store 的时候传入 `strict: true`：

```
const store = new Vuex.Store({
  // ...
  strict: true
})
```

在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

### 开发环境与发布环境

**不要在发布环境下启用严格模式！**严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。

类似于插件，我们可以让构建工具来处理这种情况：

```
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```



## ★双向绑定问题

由于vuex中你不能直接修改状态，必须通过mutation，所以双向绑定会稍微麻烦一点，用『Vuex 的思维』去解决这个问题的方法是：**给 `<input>` 中绑定 value，然后侦听 `input` 或者 `change` 事件，在事件回调中调用 action:**



```js
<input :value="message" @input="updateMessage">
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
下面是 mutation 函数：

// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```

必须承认，这样做比简单地使用“`v-model` + 局部状态”要啰嗦得多，并且也损失了一些 `v-model` 中很有用的特性。**另一个方法是使用带有 setter 的双向绑定计算属性：**

```
<input v-model="message">

// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```