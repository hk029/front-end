## 目录
---
- [总结](#总结)
- [XMLHttpRequest](#XMLHttpRequest)
    - [1.2 XMLHttpRequest Level 2](#12-XMLHttpRequest-Level-2)
  - [2. State](#2-State)
  - [3. Request](#3-Request)
    - [3.2 setRequestHeader()设置请求头](#32-setRequestHeader设置请求头)
    - [3.3 timeout[XHR 2]超时处理](#33-timeout[XHR-2]超时处理)
    - [3.4 withCredentials[XHR 2]跨域](#34-withCredentials[XHR-2]跨域)
    - [3.5 upload[XHR 2]跟踪上传事件](#35-upload[XHR-2]跟踪上传事件)
    - [3.6 发送请求](#36-发送请求)
    - [3.7 中止请求[XHR 2]](#37-中止请求[XHR-2])
  - [4. Response](#4-Response)
    - [4.3 获得响应头](#43-获得响应头)
    - [4.5 overrideMimeType()[XHR 2]重写服务器返回的MIME类型](#45-overrideMimeType[XHR-2]重写服务器返回的MIME类型)
    - [4.7 指定服务器返回的MIME类型](#47-指定服务器返回的MIME类型)
    - [4.8 [常用]响应体内容](#48-[常用]响应体内容)
    - [4.9 responseXML 响应体内容](#49-responseXML-响应体内容)
  - [5. 进度事件[XHR 2]](#5-进度事件[XHR-2])
    - [5.1 progress事件](#51-progress事件)
  - [6. 实现](#6-实现)
  - [参考](#参考)
---

# 总结

```js
var xhr = new XMLHttpRequest();
xhr.onreadyStateChange = function (fn) {
    if(this.readyState == 4 && xhr.status == 200){
       //0-5 5种状态：未open，未send，拿到请求头,下载响应体，完成
       var ret = xhr.responseText;
       ret = JSON.parse(ret);
       fn(ret)
        // 请求结束
    }
 // 请求错误
xhr.onerror = function () {
    timer && clearTimeout(timer);
    callback({msg:"error"});
xhr.open("GET","www.example.com");  //初始化参数
//method: HTTP方法，有"GET","POST","HEAD","DELETE","PUT"
//url: 
//async: 默认为true，即异步执行，如果为false，则会阻塞直到数据返回
//user: 为授权使用，默认为空
//password: 为授权使用，默认为空
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  //get的时候一般不需要设置。设置请求头,必须先open
xhr.send(Blob data); // post
xhr.send(FormData data);// post
xhr.send(ArrayBuffer data);// post
xhr.send(null);  //get发送请求不需要参数
```

ie中处理比较麻烦：

```js
function createXhr() {
    var xhr;
    if(window.XMLHttpRequest){ // 非IE
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        var versions = [ "MSXML2.XMLHTTP", "MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0"];
        for (var i = 0; i < versions.length; i++)
        try {
            xhr = new ActiveXObject(version[i])
            if(xhr)break;
        }catch (e) {};
    }
```

>来自张贵旭同学https://github.com/zhangguixu

# XMLHttpRequest

## 1. 概述

XMLHttpRequest是一个JavaScript对象，它最初由微软设计(一开始的实现并非一个JavaScript对象，因此又带来了"喜闻乐见"的兼容性问题)，随后被Mozilla、Apple和Google采纳。如今，该对象已经被W3C组织标准化。

```javascript
var xhr = new XMLHttpRequest();
```

通过它，你可以很容易的取回一个URL上的资源数据。尽管名字里有XML， 但XMLHttpRequest可以取回所有类型的数据资源（其实不然，现在的XHR有两个版本了，旧版本的支持的数据资源并不多），并不局限于XML。而且除了HTTP ,它还支持file和ftp协议。

### 1.2 XMLHttpRequest Level 2

在HTML5的概念形成后，W3C开始标准化这个接口，2008年2月，提出了XMLHttpRequest Level 2草案。

这个XMLHttpRequest的新版本，提出了很多有用的新功能。

[兼容性查阅](http://caniuse.com/#feat=xhr2)

## 2. State

readyState表示了请求的五种状态

|值|状态|描述|

|:--|:--|:--|

|0|UNSET(未打开)|open()方法还未被调用|

|1|OPENED(未发送)|send()方法还未被调用|

|2|HEADERS_RECEIVED(已获得响应头)|send()方法已经被调用，且响应头和响应状态已经返回|

|3|LOADING(正在下载响应体)|响应体下载中，responseText已经获取了部分数据|

|4|DONE(请求完成)|整个请求过程已经完毕|

当readyState属性改变时，会调用onreadyStateChange

```javascript
xhr.onreadyStateChange = function () {
    if(this.readyState == 4){
        // 请求结束
    }
```

## 3. Request

### 3.1 open()初始化一个请求

这个方法的参数可以为

* method: HTTP方法，有"GET","POST","HEAD","DELETE","PUT"

* url: 该请求所要访问的URL

* async: 默认为true，即异步执行，如果为false，则会阻塞直到数据返回

* user: 为授权使用，默认为空

* password: 为授权使用，默认为空

*注意此时还没有发送请求，只是做初始化的工作而已。*

```javascript
xhr.open("POST","www.example.com");
```

### 3.2 setRequestHeader()设置请求头

在调用open()方法初始化一个请求之后，我们可以给HTTP请求头赋值。不过这个方法是受限的，有一部分请求头是不能被设置的。

|--|--|--|

|:--|:--|:--|

|Accept-Charset|Content-Transfer-Encoding|TE|

|Accpet-Encoding|Date|Trailer|

|Connection|Expect|Transfer-Encoding|

|Content-Length|Host|Upgrade|

|Cookie|Keep-Alive|User-Agent|

|Cookie2|Referer|Via|

```javascript
// 表单数据的编码类型
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
```

### 3.3 timeout[XHR 2]超时处理

网络任务通常是不可靠的，所以要考虑超时的问题。可以通过设置timeout属性来设置HTTP请求的时限，单位是毫秒。

如果请求超过了时限，就自动停止HTTP请求，可以通过timeout事件来指定回调函数。

```javascript
xhr.timeout = 3000;
xhr.ontimeout = function (){
    // 超时处理
```

### 3.4 withCredentials[XHR 2]跨域

withCredentials为true时，可以进行跨域请求，反之，则不行。

```javascript
xhr.withCredentials = true;
```

这个属性也可以用来检测浏览器是否支持XHR 2

```javascript
function isSupport() {
    return new XMLHttpRequest().withCredentials ? true : false;
```

关于跨域的实现其实是依赖了新增的HTTP请求头，需要服务器的支持。在浏览器端发送请求的时候，加上一个`Origin`的头部信息，服务器可以根据这个头部信息来决定是否响应，如果服务器认为这个请求可以接受，就可以在`Access-Control-Allow-Origin`头部中回发相同的源信息。如果没有这个头部，或者源信息不匹配，浏览器就会驳回请求。

*请求和响应都不包含cookie信息*

### 3.5 upload[XHR 2]跟踪上传事件

可以在upload上添加一个事件监听来跟踪上传的过程，upload有一个progress事件，每当进度有变化的时候，就会触发。

```javascript
xhr.upload.onprogress = function (event) {
```

### 3.6 发送请求

send(data)发送请求，如果是异步模式（默认），该方法会立刻返回，相反，如果是同步模式，则直到请求的响应完全接受以后，该方法才会返回。

该方法可以发送多种类型的数据

```javascript
send(null); // get 请求的情况
send(Blob data); // post
send(FormData data);// post
send(ArrayBuffer data);// post
```

### 3.7 中止请求[XHR 2]

调用abort()，如果请求已经被发送，则立刻中止请求。

```javascript
xhr.abort();
```

## 4. Response

### 4.1 获取http请求的状态

可以通过status来获取http请求的状态码，statusText来获取状态的描述。一般来说，会结合readyState和HTTP状态码来判断一个xhr请求是否成功返回

```javascript
xhr.onreadyStateChange = function () {
    if(this.readyState == 4){
        if(this.status == 200){
            // 成功返回
        }
    }
```

### 4.3 获得响应头

通过getResponseHeader()/getAllResponeseHeader()能查询响应头，但是并非所有的响应头都可以获取的到，例如cookie。

### 4.5 overrideMimeType()[XHR 2]重写服务器返回的MIME类型

这个方法会强迫xhr对象将响应当作指定的类型来进行处理，不过必须在send()方法之前调用这个方法。

```javascript
xhr.open("get","");
xhr.overrideMimeType("text/xml");
xhr.send(null);
```

这样，即使服务器返回的MIME类型是`text/plain`，xhr还是会将响应当作XML进行处理。

### 4.7 指定服务器返回的MIME类型

设置responseType能够改变响应类型，通知服务器客户端期待的响应格式

|值|对应的数据类型|

|:--|:--|

|""|字符串（默认值）|

|"arraybuffer"|ArrayBuffer|

|"document"|Document|

|"json"|JSON|

|"text"|字符串|

在指定了`responseType`之后，就必须使用response来接收响应实体的类型。

```javascript
var arrayBuffer = xhr.response;
```

### 4.8 [常用]响应体内容

responseText最常用的接收服务器响应的内容

### 4.9 responseXML 响应体内容

接收服务器响应的xml内容，如果服务器返回的MIME类型是text\plain的话，responseXML为null

## 5. 进度事件[XHR 2]

Progress Events定义了与客户端通信有关的事件，共有6个进度事件

* loadstart: 在接收到响应数据的第一个字节时触发

* progress: 在接收响应期间持续不断地触发

* error: 在请求发生错误时触发

* abort: 在调用abort()方法而终止连接时触发

* load: 在接收到完整的响应数据时触发

* loadend: 在通信完成或触发error、abort或load事件后触发

### 5.1 progress事件

onprogress事件处理程序会接收到一个event对象，其target属性是XHR对象，此外还包含3个额外的属性

* lengthComputable: 表示进度信息是否可用的布尔值

* position: 表示已经接收的字节数

* totalSize: 根据Content-length响应头确定的预期字节数

```javascript
xhr.onprogress = function(event) {
    if(event.lengthComputabel) {
        var percent = event.position / event.totalSize;
    }
```

## 6. 实现

首先是获取xhr对象，这一点主要是在IE中比较麻烦

```javascript
function createXhr() {
    var xhr;
    if(window.XMLHttpRequest){ // 非IE
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        var versions = [ "MSXML2.XMLHTTP", "MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0"];
        for (var i = 0; i < versions.length; i++)
        try {
            xhr = new ActiveXObject(version[i])
            if(xhr)break;
        }catch (e) {};
    }
```

结合上述内容，我们来进行封装，这里利用了一个技巧，叫惰性加载机制，在其他的章节中有详细的介绍。

```javascript
(function (){
    var ajax = {
        _createXhr : function () {
            var xhr,curVersion;
            if(window.XMLHttpRequest){
                _createXhr = function () {
                    return new XMLHttpRequest();
                }
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                var versions = [ "MSXML2.XMLHTTP", "MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0"];
                for (var i = 0; i < versions.length; i++)
                try {
                    xhr = new ActiveXObject(version[i])
                    if(xhr){
                        curVersion = version[i];
                        _createXhr = function () {
                            return new ActiveXObject(curVersion);
                        }
                        break;
                    }
                }catch (e) {};
            }
            if(!xhr) {
                throw new Error("fail to create XHR");
            }
            return xhr;
        },
        _serialize : function(data) {
            if(typeof data == "object") {
                var p = [];
                for(var key in data){
                    p.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
                }
                return p.join("&");
            } else if (typeof data == "string"){
                return data;
            } else {
                 throw new Error("fail to serialize parameters");
            }
        },
        _get : function(params,xhr) { // get请求
            var url = params.url;
            if(params.data) {
                url = url.indexOf("?") > 0 ? url : (url + "?");
                url += this._serialize(params.data);
            }
            xhr.open("get",url);
            xhr.send(null);
        },
        _post : function(params,xhr) {// post请求
            var url = params.url;
            if(params.data) {
                var data = this._serialize(params.data);
            }
            xhr.open("post",url);
            // 增加请求头
            xhr.setRequestHeader("Content-Type", params.contentType || "application/x-www-form-urlencoded");
            xhr.send(data);
        },
        send : function (params){
            if (!params.url) {
                throw new Error("invalid parameters");
            }
            var requestType = params.requestType || "GET";
            var timeout = params.timeout || 60000;
            var callback = params.callback || function(){};
            var xhr = ajax._createXhr();
            
            // 超时错误，可以使用timeout和ontimeout，
            // 这里使用定时器来实现
            if("timeout" in xhr){
                xhr.timeout = timeout;
                xhr.ontimeout = function () {
                    callback({msg:"timeout"});
                }
            } else {
                var timer = setTimeout(function () {
                    xhr.abort();
                    callback({msg:"timeout"});
                },timeout)
            }
            // 正常返回
            xhr.onreadystateChange = function () {
                if(xhr.readyState == 4 && xhr.status == 200){   
                    timer && clearTimeout(timer);
                    var ret = xhr.responseText;
                    try {
                        ret = typeof JSON.parse == "function"? JSON.parse(ret) : ret;
                    }catch(_){};
                    callback(ret);
                }
            }
            // 请求错误
            xhr.onerror = function () {
                timer && clearTimeout(timer);
                callback({msg:"error"});
            }
            // 开启跨域            
            if("withCredential" in xhr){
                xhr.withCredentials = true;
            }
            
            // 处理参数
            requestType = requestType.toUpperCase();
            switch(requestType){ // 之后可以补充多个请求方法
                case "GET" : 
                    ajax._get(params, xhr);
                    break;
                case "POST" : 
                    ajax._post(params, xhr);
                    break;
            }            
        }
    };
    window.ajax = ajax;
})();
```

## 参考

1. [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

2. [W3C标准](https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html)

3. 《JavaScript权威指南》 脚本化HTTP

4. [XMLHttpRequest Level 2 使用指南](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)

5. 《JavaScript高级程序设计》

