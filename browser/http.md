

## http

### 持久连接
在http1.0时候，每进行一次http通信就会断开一次连接。这对于一个包含很多资源的网站来说，会造成很多无谓的tcp连接的连接和断开。所以在http1.1中加入了持久连接`keep-alive`。只要任意一端没有明确的提出断开连接，那么连接就一直保持，建立一次tcp连接后，能进行多次请求和相应。减少了tcp连接和断开的额外开销。

### 管线化
持久连接使得多数请求得以管线化，原来发送请求需要得到响应后才能发送下一个请求。管线化后，可以同时并行发送多个请求。


### 状态化
使用cookie。


## http头部

### 请求头
- host : host 地址
- user-agent ： 
- Accept
- Accept-language
- Accept-Encoding
- Cache-control: public,max-age=10000
- If-modified-Since
- If-None-Match
- Pragma:no-cache （被cache-control替代）
- expires:(被max-age替代)
- Connection:keep-alive

- Oringin:
- Access-Control-request-Methods:
- Access-Control-request-Headers:NCS
- withCredential



### 响应头
- Date:
- Server
- Last-Modified:
- Etag:
- Accept-Ranges:
- Content-length:
- Content-type
- Access-Control-Allow-Origin:
- Access-Control-Allow-Methods:
- Access-Control-Allow-Headers:
- Access-Control-Allow-Credentials:
