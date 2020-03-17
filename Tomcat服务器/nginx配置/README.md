# nginx 概述

理解NGINX就是一个HTTP服务器（web服务器），反向代理服务器，或者说邮件服务器。


# nginx 负载均衡：

[`git -参考配置`](https://github.com/biaochenxuying/blog/issues/18)

- 1、ip_hash（使用宇保持会话）

- 2、修改权重测试 -weight=1
 
```php
http {
    ###此处省略一大堆没有改的配置
    ##自定义我们的服务列表
    upstream myserver{
       server 127.0.0.1:8080;
       server 127.0.0.1:8090;
     }

   server {
        listen       8888 ; ##设置我们nginx监听端口为8888
        server_name  [服务器的ip地址];

        # Load configuration files for the default server block.
        # include /etc/nginx/default.d;

        location /api {
            proxy_pass http://myserver;     #叮，核心配置在这里
            proxy_connect_timeout 6;       #超时时间，单位秒
        }
        error_page 404 /404.html;
            location = /40x.html {
        }
        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
   }

}
```

### or

```php
[root@lb01 nginx-1.6.2]# cat -n conf/nginx.conf
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    upstream lbproxy {
        server 10.0.0.12:80 weight=5;
        server 10.0.0.13:80 weight=5;
        server 10.0.0.11:80 backup;
    }
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  lb.liang.com;
        location / {
            root   html;
            index  index.html index.htm;
            proxy_pass http://lbproxy;
        }
    }
}
```
