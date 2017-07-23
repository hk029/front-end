## 目录
---
- [localstorage](#localstorage)
- [sessionStorage](#sessionStorage)
- [应用缓存](#应用缓存)
  - [application cache](#application-cache)
---

## localstorage

localStorage是Html5的一种新的本地缓存方案，目前用的比较多，一般用来存储ajax返回的数据，加快下次页面打开时的渲染速度。

|浏览器|最大长度|

|-----|-----|

|IE9以上|5M|

|Firefox8以上|5.24M|

|Opera|2M|

|Safari/WebKit|2.6M|

```js
//localStorage核心API: 
localStorage.setItem(key, value)    //设置记录 
localStorage.getItem(key)           //获取记录 
localStorage.removeItem(key)        //删除该域名下单条记录 
localStorage.clear()                //删除该域名下所有记录 
```

值得注意的是，localstorage大小有限制，不适合存放过多的数据，如果数据存放超过最大限制会报错，并移除最先保存的数据。

## sessionStorage

和localstorage差不多，不过是会话结束就关闭

## 应用缓存

### 离线检测

```js
window.navigator.onLine //true表示能上网 但是在chrome11及之前的版本上始终为true
window.ononline = fn()  //html5的新事件
window.onoffline = fn() //
```

### application cache

application cahce是将大部分图片资源、js、css等静态资源放在`manifest`文件配置中。当页面打开时通过manifest文件来读取本地文件或是请求服务器文件。

离线访问对基于网络的应用而言越来越重要。虽然所有浏览器都有缓存机制，但它们并不可靠，也不一定总能起到预期的作用。HTML5 使用ApplicationCache 接口可以解决由离线带来的部分难题。**前提是你需要访问的web页面至少被在线访问过一次。**

使用缓存接口可为您的应用带来以下三个优势：

- 离线浏览 – 用户可在离线时浏览您的完整网站。

- 速度 – 缓存资源为本地资源，因此加载速度较快。

- 服务器负载更少 – 浏览器只会从发生了更改的服务器下载资源。

一个简单的离线页面主要包含以下几个部分：

index.html

```html
<html manifest="test.manifest">
<head>
  <title>AppCache Test</title>
  <linkrel="stylesheet" href="theme.css">
    <script src="main.js"></script>
</head>
<body>
  <p>
    <output id="clock">
      </output>
  </p>
  <div id="log">
    </div>
</body>
</html>
```

test.manifest

manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）。

manifest 文件可分为三个部分：

- CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存（必须）

- NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存

- FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）

```js
CACHE MANIFEST
/# 2012-02-21 v1.0.0
/theme.css
/logo.gif
/main.js
NETWORK:
login.asp
FALLBACK:
/html5/ /404.html
```

clock.js和clock.css为独立的另外文件。

另外，需要注意的是更新缓存。在程序中，你可以通过window.applicationCache 对象来访问浏览器的app cache。你可以查看 status 属性来获取cache的当前状态：

```js
  var appCache = window.applicationCache;
  switch (appCache.status) {
    case appCache.UNCACHED: // UNCACHED == 0    
      return 'UNCACHED';
      break;
    case appCache.IDLE: // IDLE == 1     
      return 'IDLE';
      break;
    case appCache.CHECKING: // CHECKING == 2    
      return 'CHECKING';
      break;
    case appCache.DOWNLOADING: // DOWNLOADING == 3   
      return 'DOWNLOADING';
      break;
    case appCache.UPDATEREADY: // UPDATEREADY == 4    
      return 'UPDATEREADY';
      break;
    case appCache.OBSOLETE: // OBSOLETE == 5    
      return 'OBSOLETE';
      break;
    default:
      return 'UKNOWN CACHE STATUS';
      break;
  };
```

为了通过编程更新cache，首先调用 applicationCache.update()。这将会试图更新用户的 cache(要求manifest文件已经改变)。最后，当 applicationCache.status 处于 UPDATEREADY 状态时， 调用applicationCache.swapCache()，旧的cache就会被置换成新的。

```js
  var appCache = window.applicationCache;
  appCache.update(); // Attempt to update the user’s cache. … 
  if (appCache.status == window.applicationCache.UPDATEREADY) {
    appCache.swapCache(); // The fetch was successful, swap in the new cache. 
  }
```

这里是通过更新menifest文件来控制其它文件更新的。

