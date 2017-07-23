## 目录
---
- [cookie操作](#cookie操作)
  - [服务端设置cookie](#服务端设置cookie)
- [cookie和session](#cookie和session)
- [cookie跨域](#cookie跨域)
  - [Cookie跨域单点登录  ](#Cookie跨域单点登录--)
- [总结](#总结)
- [参考文章](#参考文章)
---

## cookie操作
### JS
```js
  document.cookie
```
返回是一个字符串，"key1=value1; key2=value2; "
每个key,value之后有一个`;`和`空格`，
`document.cookie`只会执行添加或者修改操作，不能删除里面已添加的值，设置document.cookie不会覆盖cookie，除非cookie的名称已经存在。
```js
// 设置document.cookie
document.cookie = "";
document.cookie;
运行结果依旧是之前的值
```
将cookie设置为空，并不能清除cookie，因为是不会覆盖的
### 服务端设置cookie
会在响应头里加入`Set-Cookie`，然后浏览器会把这个加入cookie中，name和value都必须是URL编码
```html
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: name=value
```
## cookie和session
可以说cookie就是seession，服务器在遇到一个http连接的时候，就会检查是否携带了cookie，其中有没有seessionID，如果有就去查自己的数据库（redis）看是否匹配，匹配了就知道该用户是谁。
否则就生成一个新的key，服务器会把sessionID种在浏览器的cookie中，这样，当用户再次访问的时候，服务器就能标示该用户是否浏览过。
## cookie跨域
### 同域单点登录
在cookie相关文档信息中，提到cookie是不能跨域访问的，**但是在二级域名是可以共享cookie的。** 这样就是我们的项目有了局限性，必须将多个系统的域名统一，作为二级域名，统一平台提供使用主域名。这样就可以实现cookie的单点登录了。
cookie的四个可选属性：
- cookie的生存期属性:expires;
默认情况下,cookie只在浏览器会话期存在.退出浏览器就丢失;可以用expires设置时间;退出浏览器后就不会丢失并存为客户端浏览器的cookie文件;过了时间后cookie失效,还会自动删除cookie文件. 
- path属性:默认情况下,在同一个目录下文件可以调用;  
>例如:http://hanj.com/c1/1.html设置的cookie可以被http://hanj.com/c1/2.html调用.但不能被http://hanj.com/c2/目录下的文件调用;  
> 但如把path属性设成"/";则在http://hanj.com/下的所有文件都可调用此cookie.  
- domain属性:例如设成".hanj.com"则在.hanj.com下的所有服务器下的文件都可以调用cookie.  
- secure安全属性:默认情况下为false;用http协议不安全传输;true:用https等协议安全传输. 
所以设置了domain就可以实现二级域名共享cookie
### Cookie跨域单点登录  
为了快速、简单的实现这一功能，首先想到就是通过JS操作Cookie并让两个不同域的cookie能够相互访问，这样就可达到了上述的效果，具体实现过程大致可分以下两个步骤：  
１、在Ａ系统下成功登录后，利用JS动态创建一个隐藏的iframe，通过iframe的src属性将A域下的cookie值作为 get参数重定向到B系统下b.aspx页面上；  
```js
var _frm = document.createElement("iframe"); 
_frm.style.display="none";  
_frm.src="http://b.com/b.jsp?test_cookie=xxxxx";  
document.body.appendChild(_frm);  
```
2、在B系统的b.aspx页面中来获取A系统中所传过来的cookie值，并将所获取到值写入cookie中，这样就简单的实现了cookie跨域的访问；　不过这其中有个问题需要注意，就是在IE浏览器下这样操作不能成功，需要在b.aspx页面中设置P3P HTTP Header就可以解决了（具体詳細信息可以参考:http://www.w3.org/P3P/)，P3P设置代码为： 
```js
/* 
*也可以在html加入标记 
<meta http-equiv="P3P" content='CP="IDC DSP COR CURa ADMa  OUR IND PHY ONL COM STA"'>
Response.AppendHeader("P3P", "CP='IDC DSP COR CURa ADMa  OUR IND PHY ONL COM STA'"); 
```
## 总结
- 服务端设置了http-only属性的Cookie，客户端JS无法读取，更别说更改了。
- 跨域的Cookie会存取失败（跨二级域名不包括在内）。
- 如果浏览器设置了阻止网站设置任何数据， 客户端无法接收Cookie，当然JS对Cookie的操作会失败。
- Cookie的数量超过最大限制，之前的Cookie被自动删除，JS无法读取到。Cookie过期被浏览器自动删除了。
- cookie是一种WEB服务器通过浏览器在访问者的硬盘上存储信息的手段。
- cookie个数限制30-50个 (20个不再正确), 大小约4k
- 不同浏览器对过多cookie的处理方式不同，opera，ie是LRU方式，firefox是随机替换
- cookie会包含在http的请求头，发送到服务器端，与h5存储最大的区别
cookie只能给同个域名下的js访问
- 会话cookie：如果不设置过期时间，则表示这个cookie生命周期为浏览器会话期间
- 持久cookie：如果设置了过期时间，浏览器就会把cookie保存到硬盘上，关闭后再次打开浏览器，这些cookie依然有效直到超过了设定的时间
存储在硬盘上的cookie可以在不同的浏览器进程间共享
## 参考文章
[浏览器 cookie 限制](http://www.planabc.net/2008/05/22/browser_cookie_restrictions/)
[cookie 跨域访问的解决方案](http://www.cnblogs.com/sueris/p/5674169.html)
