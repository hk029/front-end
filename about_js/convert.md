## 目录
---
- [基本类型和类型转换](#基本类型和类型转换)
  - [Number](#Number)
    - [NaN](#NaN)
    - [数值转换](#数值转换)
    - [pareseInt()：](#pareseInt)
    - [parseFloat()](#parseFloat)
  - [String](#String)
    - [转换字符串：](#转换字符串)
  - [+](#+)
  - [==和===](#==和===)
    - [null和undefined和非这两者的值](#null和undefined和非这两者的值)
    - [Number和String, String=>Number](#Number和String,-String=>Number)
    - [NaN和任何值都不相等](#NaN和任何值都不相等)
    - [Number，String和Object, Ojbect调用valueOf或toString](#Number，String和Object,-Ojbect调用valueOf或toString)
---

# 基本类型和类型转换

## Boolean

1. 只有`true`和`false`两个值，这两个值是特殊的值，不完全等于1和0

2. **转换规则**（自动使用`Boolean()`函数），在if语句中很有用。

   | 数据类型      | true           | false     |

   | --------- | -------------- | --------- |

   | Boolean   | true           | false     |

   | String    | 非空             | “”        |

   | Number    | 非0（包括Infinity） | 0和**NaN** |

   | Object    | 任何对象           | null      |

   | Undefined | /              | undefined |

## Number

1. 0开始表示八进制（首**多余0会自动丢弃**），**无效八进制自动转换成十进制**，在**严格模式下八进制无效。**

2. 0x开始表示十六进制（**不可有多余的0**）

3. 浮点数会占用2倍整数内存，所以当数没有小数的时候，会转换成整数。

4. 小数前0超过6位会用科学表示法

5. 不推荐省略浮点数前的0

6. 浮点数表示最高精度有17位，但是有精度问题，`千万不能用==来比较！`

7. Number.MAX_VALUE和Number.MAX_VALUE

8. 超过范围的会转换为`Infinity|-Infinity`这个值，存储在`Number.POSITIVE_INFINITY`和`Number.POSITIVE_INFINITY`中

9. 可以用**isFinite()** 函数判断介于最大和最小值的数值 。

### NaN

**所有跟NaN有关的运算全会得到NaN**

任何数都不等于NaN，包括自己，只能用**isNaN()** 来判断，isNaN也可用于对象，根据valueOf()判断，如果不行再通过toString()测试。

### 数值转换

| 数据类型      | 数值            |

| --------- | ----------------- |

| Boolea    | true : 1，false : 0         |

| Null      | null : 0                    |

| Undefined | undefined : NaN                |

| String    | 1. 只包含数字（含浮点），且非十六进制，会自动忽略前导0（无法表示八进制）   |

|          | 2. `0xf`这样十六进制转换成对应十进制        |

|           | 3. "" : 0                                |

|           | 4. 其他 ：NaN                               |

| Object    | 根据valueOf()，结果是NaN再根据toString()，调用上面String规则 |

```javascript
Number("Hello")  // NaN
Number("000023") // 23
Number(true)  //1
```

**在和数字做运算操作的时候会自动调用以上规则**，比如：

```javascript
+"0x10"   // 16     +的**一元运算** 以直接**等价Number()**
true++  // 2
null + 1 // 1
```

### pareseInt()：

- 会**忽略前导空格**，直到遇到第一个数字，否则返回NaN 

- 后面遇到非数字会自动停止，**包括**`.` 

- 可以识别八进制（尽量别尝试，**ES5不识别，会忽略前导0**），十六进制。

- **尽量使用第二参数来表示进制** ，测试可以使用0-36，0和10一样，其他都会返回NaN。

```javascript
parseInt("")  //NaN    注意和Number不同，Number("")  -> 0 
parseInt("   10a")  //10
parseInt("070")  // ES3 56  ES5  70
parseInt("0xa")  // 10
pareseInt('10',2)  // 2
pareseInt('10',3)  // 3
pareseInt('10',8)  // 8
pareseInt('10',0)  // 10
parseInt('10',36)  //36
pareseInt('a',10)  // NaN
parseInt('10',-1)  //NaN
parseInt('10',37)  //NaN
```

### parseFloat()

- 自动忽略前导0，解析到第一个无效浮点字符。（第一个`.`识别，第二个`.`不识别）

- **不识别别的进制**

- 可以用科学表示法

- 如果发现是**整数，会返回整数**

```javascript
pareseFloat('012.23.4')   //12.23
pareseFloat('3.12e7')   //3120000
pareseFloat('03.')   //3
pareseFloat('0xa')   //NaN
pareseFloat('a2.3')   //NaN
```

## String

1. 特殊字面量

   | 代码     | 输出              |

   | ------ | --------------- |

   | \'     | 单引号             |

   | \"     | 双引号             |

   | \&     | 和号              |

   | \\\    | 反斜杠             |

   | \n     | 换行符             |

   | \r     | 回车符             |

   | \t     | 制表符             |

   | \b     | 退格符             |

   | \f     | 换页符             |

   | \xnn   | 十六进制表示的AscII码   |

   | \unnnn | 十六进制表示的Unicode码 |

**注意：**用length计算的时候，双字节字符也只算1，得自己编函数用**charCodeAt()**函数判断。

- 字符串不可变

### 转换字符串：

1. 几乎任何值都有的`toString()`（**除了null和undefined**），toString()可以加进制（**2-36**，否则报错）

注意，对数字直接使用toString()函数不行，必须变成包装对象

   ```javascript
   var num = 10;
   num.toString(2)  // "1010"
   num.toString(10)  // "10"
   num.toString(16)  // a
   num.toString(37)  // 报错
   10.toString()   //报错，不能直接这么用
   true.toString()  //"true"
   null.toString   //报错
   ```

2. String()，**可以将所有的类型转换成字符串**，它会先调用toString()，不能转换（null,undefined）的再特殊处理，不能更改进制。(**字符串的+操作就是利用这个**)

   ```javascript
   String(10) // "10"
   String(null) //"null"
   String(undefined)  //"undefined"
   ```

3. Object默认转换成"[object Object]"，**除非手动实现了toString函数**

```javascript
var test = {'a':1};
test.toString()  //"[object Object]"
test.toString = function(){return 'test';}
test.toString()  //"test"
String(test)  //"test"
```

## +

+这个符号到底是什么意思，必须要看左右的东西是什么类型的。如果都是数字，那么就是加；否则，就是连字符。

但是，其他的运算符，是完全没有歧义的。比如*、-、/、%。 这些运算符，就是用来计算的！所以，我们的计算机，会帮我们进行一下隐式转换(隐藏的格式转换)。

```js
3*5
15
"3"*5
15
"3"*"5"
15
```

但是，即使计算机有“隐式转换”，一个靠谱的程序员，一定要自己完成转换。否则，其他人看你的代码，有可能造成误会。

## ==和===

`==`运算符在判断两个值是否相等时会进行类型转换，但一个值转换为另一个值并不意味着两个值相等。如果是同一类型，直接比较（**对象比较指针，永远不相等**）

而`===`恒等运算符在判断相等时并未做任何类型转换。

```js
null==undefined
null !== undefined
"0" == 0
"0" !== 0
```

### null和undefined和非这两者的值

都为false

### Number和String, String=>Number

```js
'' == '0' //false
0 == ''//true;
0 == '0'//true
' \t\r\n '==0 //true
```

### NaN和任何值都不相等

### Boolean和其他类型，Boolean=>Number

```js
false == 'false'// 0和不为空的字符串比较   false
false == '0'//0和'0'，true
false == null//false
```

### Number，String和Object, Ojbect调用valueOf或toString

Object默认转换成"[object Object]"，除非手动实现了toString函数

[]转换成""

[1]转换成"1"

[1,2]转换成"1,2"

```js
"[object Object]" == {a:1} //true
"" == [] //true
"1" == [1] //true
1 == [1] //true
"{a:1}" == {a:1} //false
{a:1} == {a:1}  //false
```

