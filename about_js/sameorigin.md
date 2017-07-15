# 同源策略 和 部分其他跨域方法

同源策略是对JavaScript代码能够操作哪些Web内容的一条完整的安全限制。具体来说，脚本只能读取和所属文档来源相同的窗口和文档的属性。

文档来源

    协议 主机 端口

*脚本本身的来源和同源策略并不相关，相关的是脚本所嵌入的文档的来源*

作用场景

1. 使用多个<iframe\>

2. 打开其他浏览器窗口

3. 使用XmlHttpRequest

## 不严格的同源策略

### 子域问题（document.domian）

同源策略给使用多个子域的大站点带来一些问题。

例如：来自`home.example.com`的文档里的脚本想要合法地读取`developer.example.com`载入的文档的属性

为了支持这种类型的多域名站点，可以使用Document对象的`domain`属性。在默认情况下，domain存放的是载入文档的服务器的主机名。可以设置这一属性，不过使用的字符串必须具有有效的域前缀或它本身。

```javascript
//设置home.example.com的文档
document.domain = 'example.com';

//设置developer.example.com的文档
document.domain = 'example.com';
```

这样，两个子域就具有同源性，就可以互相读取对方的属性了。

*domain值中必须有一个点号，不能设置为com或其他顶级域名。*

### 跨域资源共享（CORS）

Cross-Origin Resource Sharing这项技术已经成为一项标准，参见：[http://www.w3.org/TR/cors/](http://www.w3.org/TR/cors/)

这个标准对HTTP进行扩展：

1. 新的`Origin:`请求头
2. 新的`Access-Control-Allow-Origin`响应头

它允许服务器用头信息显示地列出源，或使用通配符来匹配所有源并允许跨域HTTP请求，已经运用到`XMLHttpRequest Level 2`。这样就不会被同源策略所限制了。

### 跨文档消息

跨文档消息（cross-document messaging），允许来自一个文档的脚本可以传递文本消息到另一个文档里的脚本，而不管脚本的来源是否不同。调用window对象的`postMessage()`，方法，可以异步传递消息，利用`onmessage`事件处理函数来处理它。采用`域判断`来确定信任源。

**注意：** 貌似只对使用iframe或者window.open打开的窗口有效。直接用window.postMessage到别的域无效

```javascript
//window.open方式
var pop = window.open('http://www.example.com/')
pop.postMessage('hello','http://www.example.com')

//文档A发送消息给文档B
chatFrame.contentWindow.postMessage('hello','http://www.example.com/')

//文档B监听message事件
window.addEventListener('message',messageHandler,true);

function messageHandler(e){

    if(checkWhiteList(e.origin)){
        //处理消息
        processMessage(e.data);
    }else{
        //忽略来自未知源的消息
    }
}
//进行源的判断
var originWhiteList=['portal.example.com','games.example.com',
                        'www.example.com'];

function checkWhiteList(origin){

    var i;

    for(i = 0;i < originWhiteList.length;i++){
        if(origin === originWhiteList[i]){
            return true
        }
    }

    return false;
}
```

### nginx反向代理 
nginx反向代理 这个方法一般很少有人提及，但是他可以不用目标服务器配合，不过需要你搭建一个中转nginx服务器，用于转发请求
