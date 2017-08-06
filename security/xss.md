## 目录
---
- [XSS和CSRF](#XSS和CSRF)
- [XSS](#XSS)
- [CSRF](#CSRF)
- [防御](#防御)
---



## XSS和CSRF

>XSS：跨站脚本（Cross-site scripting，通常简称为XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。



在一个论坛发帖中发布一段恶意的Javaript代码就是脚本注入，**如果这个代码内容有请求外部服务器，那么就叫做XSS！**



>CSRF:跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。



XSS更偏向于方法论，CSRF更偏向于一种形式，只要是伪造用户发起的请求，都可成为CSRF攻击。

XSS更偏向于代码实现（即写一段拥有跨站请求功能的JavaScript脚本注入到一条帖子里，然后有用户访问了这个帖子，这就算是中了XSS攻击了），CSRF更偏向于一个攻击结果，只要发起了冒牌请求那么就算是CSRF了

## XSS



简单来说,XSS注入恶意的跨站脚本，就可能是XSS攻击。

脚本可能包含一个跨域的get请求（img，iframe），把当前用户的cookie包含在在url里发送出去，这样，黑客就能拿到用户的cookie然后为所欲为。



有一些用户浏览网页时发送错误，向服务器请求 URL，比如www.xxx.com/error.php?message=sorry,an error occurred，然后服务器根据得到的 message，不进行过滤，复制到错误页面的模板中：`<p>sorry,an error occurred</p>`，返回给用户。



这个漏洞有一个显著的特征，应用程序没有进行任何过滤或净化措施，就非常容易受到攻击。`www.xxx.com/error.php?message=<script>alert(1)</script>`，当用户打开错误页面时，就会出现`<p><script>alert(1)</script></p>`，弹出一个消息框。



显然，攻击人员不会很傻的仅仅 alert 一些消息，在 IE 中，如果开启跨站点脚本检测可能无法弹出消息。通常 XSS 都会伴随着会话劫持，攻击者截获通过验证的用户的会话令牌。劫持用户的会话后，攻击者就可以访问该用户授权访问的所有数据和功能。



比较隐蔽的还有图片模式，页面加载就会触发

`<img src="./create_post.php" /> `



## CSRF



CSRF：跨站请求伪造（冒充用户之手，伪造请求）。

-->横向提权（修改个人数据）；纵向提权（添加用户）



XSS 是实现 CSRF 的诸多途径中的一条，但绝对不是唯一的一条。一般习惯上把通过 XSS 来实现的 CSRF 称为 XSRF。



严格意义上来说，CSRF 不能分类为注入攻击，因为 CSRF 的实现途径远远不止 XSS 注入这一条。通过 XSS 来实现 CSRF 易如反掌，但对于设计不佳的网站，一条正常的链接都能造成 CSRF。



例如，一论坛网站的发贴是通过 GET 请求访问，点击发贴之后 js 把发贴内容拼接成目标 URL 并访问：

`http://example.com/bbs/create_post.PHP?title=标题&content=内容`

那么，我只需要在论坛中发一帖，包含一链接：

`http://example.com/bbs/create_post.php?title=我是脑残&content=哈哈`

只要有用户点击了这个链接，那么他们的帐户就会在不知情的情况下发布了这一帖子。可能这只是个恶作剧，但是既然发贴的请求可以伪造，那么删帖、转帐、改密码、发邮件全都可以伪造。







## 防御



- 对一些关键字和特殊字符进行过滤或 URL、HTML 编码，"<>?"或"script，javascript"；

- Cookie 防盗，在 Cookie 中**防止放入用户名和密码**，对 Cookie 信息进行 MD5 等算法进行多次散列存放，必要时还要对 ip 和 cookie 进行绑定，一旦检测异常，立马让用户重新登录；

- 严格控制 URL 访问，对于一些挂马的 ip 和域名，强制无法访问；

- iframe的sandbox可以防御一部分危险代码

- 首先可以提高的一个门槛，就是改良站内 API 的设计。对于发布帖子这一类创建资源的操作，应该只接受 POST 请求，而 GET 请求应该只浏览而不改变服务器端资源。

- 使用token，服务端生成随机的token，用户发贴有一个隐藏域保存token，发送的时候，需要进行token比较，一致才发送。

