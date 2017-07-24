## 目录
---
- [目录](#目录)
- [插值](#插值)
  - [一次插值](#一次插值)
  - [属性](#属性)
- [vue生命周期钩子](#vue生命周期钩子)
- [计算属性](#计算属性)
  - [Computed 属性 vs Watched 属性](#Computed-属性-vs-Watched-属性)
- [计算setter](#计算setter)
  - [观察 Watchers](#观察-Watchers)
- [class和style](#class和style)
  - [对象或数组](#对象或数组)
  - [与普通class属性共存](#与普通class属性共存)
  - [表达式](#表达式)
  - [绑定计算属性（重要）](#绑定计算属性重要)
- [绑定内联样式](#绑定内联样式)
  - [数组语法](#数组语法)
  - [自动添加前缀](#自动添加前缀)
- [v-if](#v-if)
  - [<template> 与 v-if](#<template>-与-v-if)
  - [v-else](#v-else)
  - [v-else-if 2.1.0](#v-else-if-210)
  - [v-if  vs  v-show](#v-if--vs--v-show)
  - [key](#key)
- [v-for](#v-for)
  - [in 对象](#in-对象)
  - [对象属性变更](#对象属性变更)
  - [对父作用域的完全访问权限](#对父作用域的完全访问权限)
  - [整数迭代](#整数迭代)
- [v-for with v-if](#v-for-with-v-if)
  - [显示过滤/排序结果](#显示过滤/排序结果)
- [事件](#事件)
  - [加括号，参数](#加括号，参数)
  - [事件修饰符](#事件修饰符)
  - [按键修饰符](#按键修饰符)
- [按键修饰符](#按键修饰符)
- [组件](#组件)
  - [局部注册](#局部注册)
  - [DOM 模版解析说明](#DOM-模版解析说明)
  - [data必须是函数](#data必须是函数)
  - [数据模型](#数据模型)
  - [传递数据（父传子）](#传递数据父传子)
    - [html中短横线隔开](#html中短横线隔开)
    - [动态 Prop](#动态-Prop)
    - [字面量语法 vs 动态语法](#字面量语法-vs-动态语法)
    - [单向数据流（不要在子组件内部改变prop）](#单向数据流不要在子组件内部改变prop)
    - [prop验证](#prop验证)
  - [自定义事件（子传父）](#自定义事件子传父)
    - [给组件绑定原生事件](#给组件绑定原生事件)
    - [使用自定义事件的表单输入组件](#使用自定义事件的表单输入组件)
  - [非父子组件通信](#非父子组件通信)
  - [内容分发](#内容分发)
    - [具名 Slot](#具名-Slot)
  - [动态组件](#动态组件)
    - [keep-alive](#keep-alive)
  - [字符串模板](#字符串模板)
  - [对低开销的静态组件使用 v-once](#对低开销的静态组件使用-v-once)
- [遇到的问题](#遇到的问题)
  - [异步更新队列](#异步更新队列)
---

## 目录

---

- [遇到的问题](#遇到的问题)

  - [异步更新队列](#异步更新队列)

---

## 插值

### 插入html

双大括号会将数据解释为纯文本，而非 HTML 。为了输出真正的 HTML ，你需要使用 `v-html` 指令：

```
<div v-html="rawHtml"></div>
```

被插入的内容都会被当做 HTML —— 数据绑定会被忽略。注意，你不能使用 `v-html` 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。组件更适合担任 UI 重用与复合的基本单元。

**注意：**你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。请只对可信内容使用 HTML 插值，**绝不要**对用户提供的内容插值。

### 一次插值

通过使用 [v-once 指令](https://cn.vuejs.org/v2/api/#v-once)，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上所有的数据绑定：

```html
<span v-once>This will never change: {{ msg }}</span>
```

### 属性

`{{}}`不能在 HTML 属性中使用，应使用 [v-bind 指令](https://cn.vuejs.org/v2/api/#v-bind)：

```html
<div v-bind:id="dynamicId"></div>
```

这对布尔值的属性也有效 —— 如果条件被求值为 false 的话该属性会被移除：

```html
<button v-bind:disabled="someDynamicCondition">Button</button>
```

## vue生命周期钩子

每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 **生命周期钩子** ，这就给我们提供了执行自定义逻辑的机会。例如，`created` 这个钩子在实例被创建之后被调用：

```
var vm = new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// -> "a is: 1"
```

也有一些其它的钩子，在实例生命周期的不同阶段调用，如 `mounted`、 `updated` 、`destroyed` 。钩子的 `this` 指向调用它的 Vue 实例。一些用户可能会问 Vue.js 是否有“控制器”的概念？答案是，没有。组件的自定义逻辑可以分布在这些钩子中。

![Lifecycle](https://cn.vuejs.org/images/lifecycle.png)

## 计算属性

计算属性就是一个专门用来对某些属性做操作的一种属性，它就是一个**返回一个值的方法**。

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
```

你可以像绑定普通属性一样在模板中绑定计算属性。 Vue 知道 `vm.reversedMessage` 依赖于 `vm.message` ，因此当 `vm.message` 发生改变时，所有依赖于 `vm.reversedMessage` 的绑定**也会更新**。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 是没有副作用，这使得它易于测试和推理。

用method可以实现类似computed一样的效果，**但是computed会缓存**，如果对应的计算属性没改变，那么对应的计算的属性也不会变。相比而言，只要发生重新渲染，method 调用**总会**执行该函数。

```javascript
<p>Reversed message: "{{ reversedMessage() }}"</p>
// in component
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
```

### Computed 属性 vs Watched 属性

Vue 确实提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：watch 属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`——特别是如果你之前使用过 AngularJS。然而，通常更好的想法是使用 `computed 属性`而不是命令式的 `watch` 回调。细想一下这个例子：

```
<div id="demo">{{ fullName }}</div>
```

```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val  //重复
    }
  }
})
```

上面代码是命令式的和重复的。将它与 computed 属性的版本进行比较：

```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName    //只用写一行代码
    }
  }
})
```

好得多了，不是吗？

## 计算setter

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

```
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
// ...
```

现在在运行 `vm.fullName = 'John Doe'` 时， setter 会被调用， `vm.firstName` 和 `vm.lastName` 也相应地会被更新。

### 观察 Watchers

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的 watcher 。这是为什么 Vue 提供一个更通用的方法通过 `watch` 选项，来响应数据的变化。**当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的**。

使用 `watch` 选项允许我们执行异步操作（访问一个 API），**限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态**。这是计算属性无法做到的。

## class和style

如果不是字符串，那么默认是data属性

```html
<div v-bind:class="class1"></div>
<!--<div v-bind:class="class-1"></div> -->
<div v-bind:class="'class1'"></div>
<!--<div v-bind:class="class1"></div> -->
```

```javascript
data: {
  class1: 'class-1'
```

### 对象或数组

表达式的结果类型除了字符串之外，还可以是**对象或数组**。对象的的话，它的值就是是否实现该属性的真值

```html
<div v-bind:class="{ active: isActive }"></div>
```

数组的话，就是多属性

```html
<div v-bind:class="['class1','class2']"></div>
```

### 与普通class属性共存

`v-bind:class` 指令可以与普通的 class 属性共存。如下模板:

```html
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```

数组的话，就是多属性数组的话，就是多属性

### 表达式

在属性中也可以使用表达式，比如三元表达式

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]">
```

### 绑定计算属性（重要）

渲染的结果和上面一样。我们也可以在这里绑定返回对象的[计算属性](https://cn.vuejs.org/v2/guide/computed.html)。**这是一个常用且强大的模式**：

经常我们会有需求根据某一个属性的变化修改class，在计算属性中使用switch这种函数就很容易实现。

```
<div v-bind:class="classObject"></div>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal',
    }
  }
```

## 绑定内联样式

### 对象语法

`v-bind:style` 的对象语法十分直观——看着非常像 CSS ，其实它是一个 JavaScript 对象。 CSS 属性名可以用**驼峰式**（camelCase）或**短横分隔命名**（kebab-case）：

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```
data: {
  activeColor: 'red',
  fontSize: 30
```

直接绑定到一个样式对象通常更好，让模板更清晰：

```
<div v-bind:style="styleObject"></div>
```

```
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
```

同样的，**对象语法常常结合返回对象的计算属性使用**。

### 数组语法

`v-bind:style` 的数组语法可以将多个**样式对象**应用到一个元素上：

```
<div v-bind:style="[baseStyles, overridingStyles]">
```

### 自动添加前缀

当 `v-bind:style` 使用需要特定前缀的 CSS 属性时，如 `transform` ，Vue.js 会自动侦测并添加相应的前缀。

## v-if

### v-if使用表达式

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

### <template> 与 v-if

因为 `v-if` 是一个指令，需要将它添加到一个元素上。但是如果我们想切换多个元素呢？此时我们可以把一个 `<template>` 元素当做包装元素，并在上面使用 `v-if`。最终的渲染结果不会包含 `<template>` 元素。

```
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### v-else

`v-else` 元素必须紧跟在 `v-if` 或者 `v-else-if` 元素的后面——否则它将不会被识别。

### v-else-if 2.1.0

`v-else-if`，顾名思义，充当 `v-if` 的“else-if 块”。可以链式地使用多次：

```
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

类似于 `v-else`，`v-else-if` 必须紧跟在 `v-if` 或者 `v-else-if` 元素之后。

### v-if  vs  v-show

- `v-if` 是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

- `v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

  ​

相比之下， `v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，带有 `v-show` 的元素始终会被渲染并保留在 DOM 中，并且只是简单地基于 CSS 进行切换（`display`）。

一般来说， `v-if` 有**更高的切换开销**，而 `v-show` 有**更高的初始渲染开销**。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件不太可能改变，则使用 `v-if` 较好。

### key

用 `key` 管理可复用的元素

**Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染**。这么做，除了使 Vue 变得非常快之外，还有一些有用的好处。例如，如果你允许用户在不同的登录方式之间切换:

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

那么在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模版使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的的 `placeholder`。

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来声明“这两个元素是完全独立的——不要复用它们”。只需添加一个具有唯一值的 `key` 属性即可：

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

现在，每次切换时，输入框都将被重新渲染。

**注意：** `<label>` 元素仍然会被高效地复用，因为它们没有添加 `key` 属性。

## v-for

### in/of 数组

```
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```

上面的in可以用of来代替，因为它是最接近 JavaScript 迭代器的语法

### in 对象

你也可以用 `v-for` 通过一个对象的属性来迭代。

```
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }} : {{ value }}
</div>
```

在遍历对象时，是按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。

### 对象属性变更

受现代 JavaScript 的限制（以及废弃 `Object.observe`），Vue **不能检测到对象属性的添加或删除**。由于 Vue 会在初始化实例时对属性执行 `getter/setter` 转化过程，所以属性必须在 `data` 对象上存在才能让 Vue 转换它，这样才能让它是响应的。

Vue 不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。然而它可以使用 `Vue.set(object, key, value)` 方法将响应属性添加到嵌套的对象上：

```javascript
Vue.set(vm.someObject, 'b', 2)
```

您还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：

```javascript
this.$set(this.someObject,'b',2)
```

有时你想向已有对象上添加一些属性，例如使用 `Object.assign()` 或 `_.extend()` 方法来添加属性。但是，添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：

```javascript
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

### 对父作用域的完全访问权限

在 `v-for` 块中，我们拥有对父作用域属性的完全访问权限。 `v-for` 还支持一个可选的第二个参数为当前项的索引。

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

结果：

- Parent - 0 - Foo

- Parent - 1 - Bar

### 整数迭代

`v-for` 也可以取整数。在这种情况下，它将重复多次模板。

```
<div>
  <span v-for="n in 10">{{ n }}</span>
</div>
```

结果：

1 2 3 4 5 6 7 8 9 10

## v-for with v-if

当它们处于同一节点， `v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-if` 循环中。当你想为仅有的 *一些* 项渲染节点时，这种优先级的机制会十分有用，如下：

```
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

上面的代码只传递了未complete的todos。

而如果你的目的是有条件地跳过循环的执行，那么将 `v-if` 置于包装元素 (或`template`)上。如:

```
<ul v-if="shouldRenderTodos">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
```

### 显示过滤/排序结果

有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的计算属性。

例如：

```
<li v-for="n in evenNumbers">{{ n }}</li>
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
```

## 事件

### 不加括号

如果直接加方法名，不加参数，那么就是直接绑定到内部一个方法上，它内部会有一个event变量

```html
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      alert(event.target.tagName)
    }
  }
})
// 也可以用 JavaScript 直接调用方法
example2.greet() // -> 'Hello Vue.js!'
```

### 加括号，参数

如果加括号和参数，那么就是内联 JavaScript 语句，如果需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量 `$event` 把它传入

```
<button v-on:click="warn('Form cannot be submitted yet.', $event)">Submit</button>
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
```

### 事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在 methods 中轻松实现这点，但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题， Vue.js 为 `v-on` 提供了 **事件修饰符**。通过由点(.)表示的指令后缀来调用修饰符。

- `.stop`

- `.prevent`

- `.capture`

- `.self`

- `.once`(2.1.4)

```
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
```

```
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

不像其它只能对原生的 DOM 事件起作用的修饰符，`.once` 修饰符还能被用到自定义的[组件事件](https://cn.vuejs.org/v2/guide/components.html#Using-v-on-with-Custom-Events)上. 如果你还没有阅读关于组件的文档，现在大可不必担心。

### 按键修饰符

在监听键盘事件时，我们经常需要监测常见的键值。 Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：

```
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```

记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：

```
<!-- 同上 -->
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
```

全部的按键别名：

- `.enter`

- `.tab`

- `.delete` (捕获 “删除” 和 “退格” 键)

- `.esc`

- `.space`

- `.up`

- `.down`

- `.left`

- `.right`

可以通过全局 `config.keyCodes` 对象[自定义按键修饰符别名](https://cn.vuejs.org/v2/api/#keyCodes)：

```
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112
```

## 按键修饰符

> 2.1.0 新增

可以用如下修饰符开启鼠标或键盘事件监听，使在按键按下时发生响应。

- `.ctrl`

- `.alt`

- `.shift`

- `.meta`

> 注意：在Mac系统键盘上，meta对应命令键 (⌘)。在Windows系统键盘meta对应windows徽标键(⊞)。在Sun操作系统键盘上，meta对应实心宝石键 (◆)。在其他特定键盘上，尤其在MIT和Lisp键盘及其后续，比如Knight键盘，space-cadet键盘，meta被标记为“META”。在Symbolics键盘上，meta被标记为“META” 或者 “Meta”。

> 例如:

```
<!-- Alt + C -->
<input @keyup.alt.67="clear">
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

## 组件

### 全局注册

全局注册的组件在任何vue实例域中都可以使用

```javascript
// 注册
Vue.component('my-component', {
  template: '<div>{{msg}}</div>'，
  prop:['msg']  //传递数据
})
```

### 局部注册

通过添加`components`属性（注意有s），可以使组件仅在另一个实例/组件的作用域中可用：

```javascript
var Child = {
   template: '<div>{{msg}}</div>'，
   prop:['msg']  //传递数据
new Vue({
  // ...
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})
```

这种封装也适用于其它可注册的 Vue 功能，如指令。

### DOM 模版解析说明

当使用 DOM 作为模版时（例如，将 `el` 选项挂载到一个已存在的元素上）, 你会**受到 HTML 的一些限制**，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素 `<ul>` ，`<ol>`，`<table>` ，`<select>` **限制了能被它包裹的元素**， 而一些像 `<option>` 这样的元素只能出现在某些其它元素内部。(测试ul,ol是可以用的)

在自定义组件中使用这些受限制的元素时会导致一些问题，例如：

```javascript
<table>
  <my-row>...</my-row>
</table>
```

自定义组件 `<my-row>` 被认为是无效的内容，因此在渲染的时候会导致错误。变通的方案是使用特殊的 `is` 属性：

```javascript
<table>
  <tr is="my-row"></tr>
</table>
```

**应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用：**

- `<script type="text/x-template">`

- JavaScript内联模版字符串

- `.vue` 组件

因此，有必要的话请使用字符串模版。

### data必须是函数

通过Vue构造器传入的各种选项大多数都可以在组件里用。 `data` 是一个例外，它必须是函数。 实际上，如果你这么做：

```
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: {
    message: 'hello'
  }
})
```

那么 Vue 会停止，并在控制台发出警告，告诉你在组件中 `data` 必须是一个函数。理解这种规则的存在意义很有帮助，让我们假设用如下方式来绕开Vue的警告：

```javascript
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
  // 但是我们返回给每个组件的实例的却引用了同一个data对象
  data: function () {
    return data
  }
})
new Vue({
  el: '#example-2'
})
```

由于这三个组件共享了同一个 `data` ， 因此增加一个 counter 会影响所有组件！这不对。我们可以通过为每个组件返回全新的 data 对象来解决这个问题：

```javascript
data: function () {
  return {
    counter: 0
  }
```

### 数据模型

![props down, events up](https://cn.vuejs.org/images/props-events.png)在 Vue.js 中，父子组件的关系可以总结为 **props down, events up** 。父组件通过 **props** 向下传递数据给子组件，子组件通过 **events** 给父组件发送消息。

### 传递数据（父传子）

#### 使用prop

使用 Prop 传递数据

组件实例的作用域是**孤立的**。这意味着不能(也不应该)在子组件的模板内直接引用父组件的数据。要让子组件使用父组件的数据，我们需要通过子组件的props选项。

子组件要显式地用 `props` 选项声明它期待获得的数据：

```javascript
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: '<span>{{ message }}</span>'
})
```

然后我们可以这样向它传入一个普通字符串：

```html
<child message="hello!"></child>
```

#### html中短横线隔开

HTML 特性是不区分大小写的。所以，当使用的不是字符串模版，camelCased (驼峰式) 命名的 prop 需要转换为相对应的 kebab-case (短横线隔开式) 命名：

```javascript
Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})
<!-- kebab-case in HTML -->
<child my-message="hello!"></child>
```

如果你使用字符串模版，则没有这些限制。

#### 动态 Prop

在模板中，要动态地绑定父组件的数据到子模板的props，与绑定到任何普通的HTML特性相类似，就是用 `v-bind`。每当父组件的数据变化时，该变化也会传导给子组件：

```
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>
```

使用 `v-bind` 的缩写语法通常更简单：

```
<child :my-message="parentMsg"></child>
```

#### 字面量语法 vs 动态语法

初学者常犯的一个错误是使用字面量语法传递数值：

```html
<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>
```

因为它是一个字面 prop ，它的值是字符串 `"1"` 而不是number。如果想传递一个实际的number，需要使用 `v-bind` ，从而让它的值被当作 JavaScript 表达式计算：

```html
<!-- 传递实际的 number -->
<comp v-bind:some-prop="1"></comp>
```

#### 单向数据流（不要在子组件内部改变prop）

prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。

另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你**不应该**在子组件内部改变 prop 。如果你这么做了，Vue 会在控制台给出警告。

为什么我们会有修改prop中数据的冲动呢？通常是这两种原因：

1. prop 作为初始值传入后，子组件想把它当作局部数据来用；

2. prop 作为初始值传入，由子组件处理成其它数据输出。

对这两种原因，正确的应对方式是：

1. **定义一个局部变量，并用 prop 的值初始化它**：

   ```javascript
   props: ['initialCounter'],
   data: function () {
     return { counter: this.initialCounter }
   }
   ```

2. **定义一个计算属性，处理 prop 的值并返回。**

   ```javascript
   props: ['size'],
   computed: {
     normalizedSize: function () {
       return this.size.trim().toLowerCase()
     }
   }
   ```

#### prop验证

如果要使用prop验证，那就需要把数组改成对象，后面的值就是检验类型（String，Number，Boolean，Function，Object，Array）,`type` 也可以是一个自定义构造器函数，使用 `instanceof` 检测。

```javascript
Vue.component('example', {
  props: {
    // 基础类型检测 （`null` 意思是任何类型都可以）
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组／对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```

当 prop 验证失败，Vue会在抛出警告 (如果使用的是开发版本)。

### 自定义事件（子传父）

### v-on和$emit()

父亲通过v-on:myevent来绑定子组件抛出的事件，孩子用this.$emit('myevent')抛出事件

```javascript
Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
```

#### 给组件绑定原生事件

有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 `.native` 修饰 `v-on` 。例如：

```
<my-component v-on:click.native="doTheThing"></my-component>
```

#### 使用自定义事件的表单输入组件

自定义事件可以用来创建自定义的表单输入组件，使用 `v-model` 来进行数据双向绑定。看看这个：

```
<input v-model="something">
```

这不过是以下示例的语法糖：(**bind传给子组件value，v-on监听input事件**)

```
<input v-bind:value="something" v-on:input="something = $event.target.value">
```

所以在组件中使用时，它相当于下面的简写：

```
<custom-input v-bind:value="something" v-on:input="something = arguments[0]"></custom-input>
```

所以要让组件的 `v-model` 生效，它必须：

- 接受一个 `value` 属性

- 在有新的 value 时触发 `input` 事件

我们来看一个非常简单的货币输入的自定义控件：

```
<currency-input v-model="price"></currency-input>
Vue.component('currency-input', {
  template: '\
    <span>\
      $\
      <input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
      >\
    </span>\
  ',
  props: ['value'],
  methods: {
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function (value) {
      var formattedValue = value
        // 删除两侧的空格符
        .trim()
        // 保留 2 小数位
        .slice(0, value.indexOf('.') + 3)
      // 如果值不统一，手动覆盖以保持一致
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 通过 input 事件发出数值
      this.$emit('input', Number(formattedValue))
    }
  }
})
```

### 非父子组件通信

有时候两个组件也需要通信(非父子关系)。在简单的场景下，可以使用一个空的 Vue 实例作为中央事件总线：

```
var bus = new Vue()
```

```
// 触发组件 A 中的事件
bus.$emit('id-selected', 1)
// 在组件 B 创建的钩子中监听事件(可以在created上绑定)
bus.$on('id-selected', function (id) {
  // ...
})
```

在复杂的情况下，我们应该考虑使用专门的 [状态管理模式](https://cn.vuejs.org/v2/guide/state-management.html).（vuex）

### 内容分发

#### 单个 Slot

除非子组件模板包含至少一个 `<slot>` 插口，否则父组件的内容将会被**丢弃**。当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。如果有多个`<slot>`，那个所有内容都会替换到不同的`<slot>`

最初在 `<slot>` 标签中的任何内容都被视为**备用内容**。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。

假定 `my-component` 组件有下面模板：

```html
<div>
  <slot>
    只有在没有要分发的内容时才会显示。
  </slot>
  <h2>我是子组件的标题</h2>
  <slot>
    只有在没有要分发的内容时才会显示。
  </slot>
</div>
```

父组件模版：

```html
<div>
  <h1>我是父组件的标题</h1>
  <my-component>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </my-component>
</div>
```

渲染结果：

```html
<div>
  <h1>我是父组件的标题</h1>
  <div>
    <p>这是一些初始内容</p>    <!--第一个slog-->
    <p>这是更多的初始内容</p>
    <h2>我是子组件的标题</h2>
    <p>这是一些初始内容</p>   <!--第二个slog-->
    <p>这是更多的初始内容</p>
  </div>
</div>
```

#### 具名 Slot

`<slot>` 元素可以用一个特殊的属性 `name` 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 `slot` 特性的元素。

仍然可以有一个匿名 slot ，它是**默认 slot** ，作为找不到匹配的内容片段的备用插槽。如果没有默认的 slot ，这些找不到匹配的内容片段将被抛弃。

例如，假定我们有一个 `app-layout` 组件，它的模板为：

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

父组件模版：

```html
<app-layout>
  <h1 slot="header">这里可能是一个页面标题</h1>
  <p>主要内容的一个段落。</p>
  <p>另一个主要段落。</p>
  <p slot="footer">这里有一些联系信息</p>
</app-layout>
```

渲染结果为：

```html
<div class="container">
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里有一些联系信息</p>
  </footer>
</div>
```

在组合组件时，内容分发 API 是非常有用的机制。

### 动态组件

通过使用保留的 `<component>` 元素，动态地绑定到它的 `is` 特性，我们让多个组件可以使用同一个挂载点，并动态切换：

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home'
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})
```

```javascript
<component v-bind:is="currentView">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>
```

也可以直接绑定到组件对象上：

```javascript
var Home = {
  template: '<p>Welcome home!</p>'
var vm = new Vue({
  el: '#example',
  data: {
    currentView: Home
  }
})
```

#### keep-alive

如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 `keep-alive` 指令参数：

```
<keep-alive>
  <component :is="currentView">
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>
```

在[API 参考](https://cn.vuejs.org/v2/api/#keep-alive)查看更多 `<keep-alive>` 的细节。

### 字符串模板

当使用字符串模式时，可以不受 HTML 的 case-insensitive 限制。这意味实际上在模版中，你可以使用 camelCase 、 TitleCase 或者 kebab-case 来引用：

```html
<!-- 在字符串模版中可以用任何你喜欢的方式! -->
<my-component></my-component>
<myComponent></myComponent>
<MyComponent></MyComponent>
```

如果组件未经 `slot` 元素传递内容，你甚至可以在组件名后使用 `/` 使其自闭合：

```html
<my-component/>
```

当然，这只在字符串模版中有效。因为自闭的自定义元素是无效的 HTML ，浏览器原生的解析器也无法识别它。

### 对低开销的静态组件使用 v-once

尽管在 Vue 中渲染 HTML 很快，不过当组件中包含**大量**静态内容时，可以考虑使用 `v-once` 将渲染结果缓存起来，就像这样：

```
Vue.component('terms-of-service', {
  template: '\
    <div v-once>\
      <h1>Terms of Service</h1>\
      ... a lot of static content ...\
    </div>\
  '
})
```

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

