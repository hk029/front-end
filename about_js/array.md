## 目录
---
- [常用方法（改变原数组）](#常用方法改变原数组)
  - [用map创建数组](#用map创建数组)
  - [用reduce压缩数组](#用reduce压缩数组)
  - [用fliter过滤数组](#用fliter过滤数组)
  - [数组排序sort（改变原数组）](#数组排序sort改变原数组)
  - [逆转数组reverse（改变数组）](#逆转数组reverse改变数组)
  - [数组拼接concat](#数组拼接concat)
  - [字符串和数组转换](#字符串和数组转换)
  - [splice函数（改变数组）](#splice函数改变数组)
  - [slice函数](#slice函数)
---

## 常用方法（改变原数组）

js的数组和python的list一样可以存不同类型不同维度个数据，除了可以用下标查看修改数据外，还有几个方法：

- push()：加到最后

- pop():  从最后取

- shift(): 从开头取

- unshift(): 加入开头

构造数组的方式还有如下：（除了特别说明的外，都不改变原数组）

### 用map创建数组

```js

var oldArray = [1,2,3,4]

var timesFour = oldArray.map(function(val){

  return val * 4;

});

```

### 用reduce压缩数组

reduce的第2个参数（初始值）可选，如果没有，就从数组第一个开始

```js

var array = [4,5,6,7,8];

var sum = 0;

sum = array.reduce(function(pre,cur){

    return pre+cur;

},0);

```

### 用fliter过滤数组

如果我们只需要数组中小于6的元素

```js

var oldArray = [1,2,3,4,5,6,7,8,9,10];

var newArray = oldArray.fliter(function(val){

  return val < 6;

});

```

### 数组排序sort（改变原数组）

数组有排序的功能(会`改变原数组`，并且也会返回)，如果不带参数，默认是按字符串排序，如果要改变排序方式，可以在里面增加比较函数，规则如下

-  负数：a在b前

- 大于：b在a前

```js

var array = [1, 12, 21, 2];

//降序排序

array.sort(function(a,b){

   return  b-a;

});

//升序排序

array.sort(function(a,b){

   return  a-b;

});

```

### 逆转数组reverse（改变数组）

`改变原数组`

```js

var array = [1,2,3,4,5,6,7];

array.reverse();

```

### 数组拼接concat

```js

var oldArray = [1,2,3];

var newArray = [];

var concatMe = [4,5,6];

newArray = oldArray.concat(concatMe);

```

### 字符串和数组转换

- 用split切割字符串

```js

var string = "Split me into an array";

var array = [];

array = string.split(' ');

```

- 用joint把数组拼接成字符串

```js

var joinMe = ["Split","me","into","an","array"];

var joinedString = '';

joinedString = joinMe.join(' ');

```

### splice函数（改变数组）

>array.splice(start, deleteCount[, item1[, item2[, ...]]])

js提供了一个splice函数，用来删除`index`位置处的`deleteCount`数目的元素，并且在index处加入item1,2,3……（可以不加入）

这个函数可以用来替换数组内的部分元素

```js

var myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

// removes 0 elements from index 2, and inserts 'drum'

var removed = myFish.splice(2, 0, 'drum');

// myFish is ['angel', 'clown', 'drum', 'mandarin', 'surgeon']

// removed is [], no elements removed

removed = myFish.splice(3, 1);

// myFish is ['angel', 'clown', 'drum', 'surgeon']

// removed is ['mandarin']

removed = myFish.splice(2, 1, 'trumpet');

// myFish is ['angel', 'clown', 'trumpet', 'surgeon']

// removed is ['drum']

```

### slice函数

>arr.slice([begin[, end]])

取出数组的从begin到end的元素，重新组成数组。

```js

var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];

var citrus = fruits.slice(1, 3);// ['Orange','Lemon']

```

