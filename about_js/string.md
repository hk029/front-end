## 目录
---
- [字符串相关](#字符串相关)
  - [字符串不可变](#字符串不可变)
  - [常用方法](#常用方法)
  - [toLowerCase](#toLowerCase)
  - [indexOf](#indexOf)
  - [lastIndexOf](#lastIndexOf)
  - [字符串的slice()和substr()和substring()](#字符串的slice和substr和substring)
  - [保留小数](#保留小数)
  - [转换字符串](#转换字符串)
  - [charAt、charCodeAt](#charAt、charCodeAt)
---

# 字符串相关
## 越界不报错字符串越界不会报错，会返回`undefine`## 字符串不可变
需要特别注意的是，字符串是不可变的，如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果：```jsvar s = 'Test';s[0] = 'X';alert(s); // s仍然为'Test'```JavaScript为字符串提供了一些常用方法，**注意**，调用这些方法本身不会改变原有字符串的内容，而是返回一个新字符串## 常用方法
## toUpperCasetoUpperCase()把一个字符串全部变为大写：```jsvar s = 'Hello';s.toUpperCase(); // 返回'HELLO'```## toLowerCase
toLowerCase()把一个字符串全部变为小写：```jsvar s = 'Hello';var lower = s.toLowerCase(); // 返回'hello'并赋值给变量lowerlower; // 'hello'```## indexOf
indexOf()会搜索指定字符串出现的位置：```jsvar s = 'hello, world';s.indexOf('world'); // 返回7s.indexOf('World'); // 没有找到指定的子串，返回-1```## lastIndexOf
indexOf()会搜索指定字符串**最后出现**的位置## 字符串的slice()和substr()和substring()
> str.slice(beginSlice[, endSlice])> str.substr(start[, length])> str.substring(indexStart[, indexEnd])都是截断函数，但是有一些区别- slice和substr能接负数，代表倒数。substring不行- substr第二参数代表长度不是end- substring的end如果大于start会自动交换，slice不会,会返回""- 三者均支持越界```jsvar str = "example";console.log(str.slice(-3)); // "ple" console.log(str.substr(-3)); // "ple" console.log(str.substr(2,4)); // "ampl" console.log(str.substring(2,4)); // "am" console.log(str.slice(4,2)); // "" console.log(str.substring(4,2)); // "am" console.log(str.slice(2,-1)); // "ampl" console.log(str.substring(0,100)); // "example" console.log(str.slice(0,100)); // "example" console.log(str.substr(0,100)); // "example" ```## 保留小数
 122340.12345      保留两位有效小数  122340.12   1. substr(0, .+3)  通过 **indexOf**  返回小数点的位置     截取字符串  ```js  console.log(str.substr(0,str.indexOf(".")+3));```2. **先乘以100  取整  然后 除以100**  ```js  console.log(parseInt(PI*100) /100);```3. **toFixed**(2)  保留 2位 小数 ```js  console.log(PI.toFixed(2));```## 转换字符串
1. +“”    2. String()   转换为字符串 3. **toString（基数）**  ;    基数就是**进制**  ## charAt、charCodeAt
  charAt，获取相应位置字符（参数：字符位置）   charCodeAt获取相应位置字符**unicode**编码（参数： 字符位置）