# conf > nginx.conf 文件配置

相关安全配置：

```php
http {
    server_tokens off; #nginx 版本信息泄露，服务器头部不显示
    server {
        listen       80;
        #域名，如果没有域名可以使用ip进行访问
        server_name  localhost;

        location / {
            add_header X-Frame-Options "SAMEORIGIN";
            add_header X-Content-Type-Options nosniff;
            add_header X-XSS-Protection "1; mode=block";
        }

        location /api/ {
            proxy_pass http://47.106.136.114/ ;
            #后端的Web服务器可以通过 X-Real-IP 获取用户真实IP
            proxy_set_header X-Real-IP $remote_addr;
            proxy_connect_timeout 90;          #nginx跟后端服务器连接超时时间(代理连接超时)
            proxy_send_timeout 90;             #后端服务器数据回传时间(代理发送超时)
            proxy_read_timeout 90;             #连接成功后，后端服务器响应时间(代理接收超时)
            proxy_buffer_size 4k;              #设置代理服务器（nginx）保存用户头信息的缓冲区大小
            proxy_buffers 4 32k;               #proxy_buffers缓冲区，网页平均在32k以下的话，这样设置
            proxy_busy_buffers_size 64k;       #高负荷下缓冲大小（proxy_buffers*2）
            proxy_temp_file_write_size 64k;    #设定缓存文件夹大小，大于这个值，将从upstream服务器传
        }
    }
}
```

### 配置：

| 方法 | 描述 |
| ------ | ------ |
| gzip on; | 开启Gzip |
| gzip_min_length | 不压缩临界值，大于1K的才压缩，一般不用改 |
| gzip_buffers  | buffer |
| gzip_http_version | 用了反向代理的话，末端通信是 HTTP/1.0；默认是 HTTP/1.1 |
| gzip_comp_level | 压缩级别，1-10，数字越大压缩的越好，时间也越长,越浪费 CPU 计算资源 |
| gzip_types | 进行压缩的文件类型，JavaScript有两种写法 application/javascript |
| gzip_vary | 跟Squid等缓存服务有关，on 的话会在 Header 里增加 "Vary: Accept-Encoding" |
| gzip_disable | IE6 对 Gzip 不怎么友好，不给它Gzip了 |

- 图片启用 GZip压缩 会适得其反，因为不仅浪费了CPU，还增大了体积，势必影响服务器性能，影响网站速度;

- **需要与 webpack GZip 配合使用；**[点击跳转查看->](https://github.com/leijin0416/Vue-Plug-in_unit/blob/master/9-01%E3%80%81vue-webpack.md)

[对于 gzip 参考](https://blog.csdn.net/bigtree_3721/article/details/79849503)

```php
http {

    #前台展示打开的服务代理
    server {
        listen       80;
        server_name  localhost;

        #expires 缓存调优  位置确认到父级地址
        location ~* \.(ico|jpe?g|gif|png|bmp|swf|flv)$ {
            root  /html/dist/img;
            expires 10d;
        }
        location ~* \.(js|css)$ {
            root  /html/dist/js;
            expires 10d;
        }

        #设置 expires 后，防止favicon 丢失
        location ~ ^/favicon\.ico$ {
            root  /html/dist;
        }
    }
}
```

```php
#user  nobody;
worker_processes  1;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    server_tokens off;
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    #如果port_in_redirect为off时，那么始终按照默认的80端口；如果该指令打开，那么将会返回当前正在监听的端口。
    port_in_redirect off;

    #前台展示打开的服务代理
    server {
        listen       80;
	    #listen		  443;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;
        #root /usr/local/nginx/html;
        #index  index.html;

        location / {
            root   /usr/local/nginx/html/dist;
            index  index.html;
            try_files $uri $uri/@router;
            add_header X-Frame-Options "SAMEORIGIN";
            add_header X-Content-Type-Options nosniff;
            add_header X-XSS-Protection "1; mode=block";
            autoindex on;                                   #开启nginx目录浏览功能
            autoindex_exact_size off;                       #文件大小从KB开始显示
            charset utf-8;                                  #显示中文
            add_header 'Access-Control-Allow-Origin' '*';   #允许来自所有的访问地址
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, POST'; #支持请求方式
            add_header 'Access-Control-Allow-Headers' 'Content-Type,*';
        }
		
        location @router{
            rewrite ^.*$ /index.html last;
        }

        #开始配置我们的反向代理
        location /api/ {
            #proxy_set_header X-Real-IP $remote_addr;
            #proxy_pass http://114.55.165.42:6100/ ;
        }
          
	    gzip  on;
	    gzip_disable “MSIE [1-6].(?!.*SV1)”;
	    gzip_http_version 1.1;
	    gzip_vary on;
	    gzip_proxied any;
	    gzip_min_length 1k;
	    gzip_buffers 4 16k;
	    gzip_comp_level 6;
	    gzip_types text/plain text/css text/xml text/javascript application/json application/x-javascript application/xml application/xml+rss application/javascript;

	    #expires 缓存调优  位置确认到父级地址
        location ~* \.(ico|jpe?g|gif|png|bmp|swf|flv)$ {
            root  /usr/local/nginx/html/dist/img;
            expires 15d;
        }
        location ~* \.(js|css)$ {
            root  /usr/local/nginx/html/dist/js;
            expires 15d;
        }

	    #设置 expires 后，防止favicon 丢失
        location ~ ^/favicon\.ico$ {
            root  /usr/local/nginx/html/dist;
        }

        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```