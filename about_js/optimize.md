## 目录
---
- [目录](#目录)
- [js优化](#js优化)
  - [防抖动](#防抖动)
    - [underscore源码](#underscore源码)
    - [简化版](#简化版)
  - [节流](#节流)
    - [underscore源码](#underscore源码)
    - [简化版](#简化版)
- [参考文章](#参考文章)
---

## 目录

---

- [js优化](#js优化)

  - [防抖动](#防抖动)

  - [节流](#节流)

- [参考文章](#参考文章)

---



## js优化



在实际工程中间，会用到很多优化的技巧，其中比较重要的两个是去抖动和函数节流。这两个方法都是限制函数执行的方案。



### 防抖动



函数防抖就是让某个函数在上一次执行后，满足等待某个时间内不再触发此函数后再执行，而在这个等待时间内再次触发此函数，等待时间会重新计算。



防抖动大量运用在`联想搜索`里。当用户输入停止后再开始联想，而不是用户随便输入一点什么就开始发送请求，如果用户一下输入大量文字或英文，会在短时间内向后台发送大量请求是很没必要的。



#### underscore源码

```js
_.debounce = function(func, wait, immediate) {
    // immediate默认为false
    var timeout, args, context, timestamp, result;
    var later = function() {
      // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
      var last = _.now() - timestamp;
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };
    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      // 第一次调用该方法时，且immediate为true，则调用func函数
      var callNow = immediate && !timeout;
      // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
  };
```



#### 简化版

```js
  var debounce = function ( fn, wait, immdediate) {
    var timer = null,
        pre = 0;
    return function () {
      var context = this;
      var args = arguments;
      var now = +new Date();
      var left = now - pre - wait;
      pre = now;
      // 如果距离上一次函数调用已经超过了预计时间，或者此时没有设置timer
      if ( left > 0 ){
        fn.apply(context,args);
        return ;
      }
      //每次进入函数，都重新计算过期时间
      clearTimeout(timer);
      timer = setTimeout(function () {
        clearTimeout(timer);
        timer = null;
        fn.apply(context,args);
        pre = +new Date();  //调用了函数也更新pre
      },wait);
    }
  }

```

### 节流



每间隔某个时间去执行某函数，避免函数的过多执行，这个方式就叫函数节流。节流和防抖动最大的不同就是，节流保证一个时间段内至少会执行一次。可以想象成把水龙头拧小，它主要用于大量连续事件快速频繁触发的场景，比如：onscroll，onresize。



#### underscore源码

```js
_.throttle = function(func, wait, options) {
    /* options的默认值
     *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
     *  options.leading = true;
     * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
     *  options.trailing = true; 
     * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
     */
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 当到达wait指定的时间间隔，则调用func函数
      // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
      if (remaining <= 0 || remaining > wait) {
        // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // options.trailing=true时，延时执行func函数
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
```

精彩之处：一般来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数.



#### 简化版



自写简化版（来自javascript设计模式）

```js
var throttle = function ( fn, interval ) {
    var timer,
        first = true;
    return function () {
        var args = arguments,   // 重命名一下，防止迷糊
            _me = this;
        if ( first ) {      // 第一 次直接执行
            fn.apply(_me , args);
            return first = false;
        }
        if ( timer ){   // 如果上一次还没执行完，则直接返回
            return false;
        }
        timer = setTimeout(function () {  
            clearTimeout(timer);    // 时间结束后，先取消计时器，然后运行当前函数
            timer = null;
            fn.apply(_me, args);
        }, interval || 500);
    };
};
```





## 参考文章



- ​[JS魔法堂：函数节流（throttle）与函数去抖（debounce）](http://www.cnblogs.com/fsjohnhuang/p/4147810.html)



- [函数防抖与节流](https://segmentfault.com/a/1190000002764479)



- [scroll优化之防抖与节流](https://segmentfault.com/a/1190000007676390)



- 《Javascript设计模式与开发实践》

