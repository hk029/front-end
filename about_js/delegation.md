## 目录
---
---

让利用事件冒泡的原理，让自己的所触发的事件，让他的父元素代替执行。最常用的就是在ul里设置事件响应，去处理所有的li上的点击事件，再通过e.target判断。

当然，你可以给每个独立的li元素添加事件监听器，但有时这些li元素可能会被删除，可能会有新增，监听它们的新增或删除事件将会是一场噩梦

```js
// 找到父元素，添加监听器...
document.getElementById("parent-list").addEventListener("click",function(e) {
	// e.target是被点击的元素!
	// 如果被点击的是li元素
	if(e.target && e.target.nodeName == "LI") {
		// 找到目标，输出ID!
		console.log("List item ",e.target.id," was clicked!");
});
```

假设我们有一个父元素div，里面有很多子元素，但我们关心的是里面的一个带有”classA” CSS类的A标记：

```js
// 获得父元素DIV, 添加监听器...
document.getElementById("myDiv").addEventListener("click",function(e) {
	// e.target是被点击的元素
	if(e.target && e.target.nodeName == "A") {
		// 获得CSS类名
		var classes = e.target.className.split(" ");
		// 搜索匹配!
		if(classes) {
			// For every CSS class the element has...
			for(var x = 0; x < classes.length; x++) {
				// If it has the CSS class we want...
				if(classes[x] == "classA") {
					// Bingo!
					console.log("Anchor element clicked!");
					// Now do something here....
				}
			}
		}
});
```

上面这个例子中不仅比较了标签名，而且比较了CSS类名。虽然稍微复杂了一点，但还是很具代表性的。比如，如果某个A标记里有一个span标记，则这个span将会成为target元素。这个时候，我们需要上溯DOM树结构，找到里面是否有一个 A.classA 的元素。

