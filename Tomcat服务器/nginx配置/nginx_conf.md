# conf > nginx.conf 文件配置

### > 图片启用 GZip压缩 会适得其反，因为不仅浪费了CPU，还增大了体积，势必影响服务器性能，影响网站速度。

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
    }
}
```

### 配置：

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
    #如果port_in_redirect为off时，那么始终按照默认的80端口；如果该指令打开，那么将会返回当前正在监听的端口。
    port_in_redirect off;

    #前台展示打开的服务代理
    server {
        listen       80;
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
        #root html/dist;
        #index  index.html;
        location  / {
            root   html/dist;
            index  index.html;
            #try_files $uri $uri/ /index.html =404;
            try_files $uri $uri/ @router;
            autoindex on;       #开启nginx目录浏览功能
            autoindex_exact_size off;   #文件大小从KB开始显示
            charset utf-8;          #显示中文
            add_header 'Access-Control-Allow-Origin' '*'; #允许来自所有的访问地址
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, PUT, POST, DELETE, OPTIONS'; #支持请求方式
            add_header 'Access-Control-Allow-Headers' 'Content-Type,*';
        }

        location @router{
            rewrite ^.*$ /index.html last;
        }

        #开始配置我们的反向代理
        location /api/ {
            #proxy_pass http://47.106.136.114:3000/ ;
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
        #set site favicon
        
        #gzip 调优
        gzip on;
        gzip_http_version   1.1;    
        gzip_buffers 32 4k; #缓冲(压缩在内存中缓冲几块? 每块多大?)
        gzip_comp_level 6;  #推荐6 压缩级别(级别越高,压的越小,越浪费CPU计算资源)
        gzip_min_length 300; #开始压缩的最小长度(再小就不要压缩了,意义不在)
        gzip_types application/javascript text/css text/xml;
        gzip_disable "MSIE [1-6]\."; #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
        gzip_vary on;

        #expires 缓存调优  位置确认到父级地址
        location ~* \.(ico|jpe?g|gif|png|bmp|swf|flv)$ {
            root  /html/dist;
            expires 10d;
        }

        location ~* \.(js|css)$ {
            root  /html/dist;
            expires 1d;
        }

        #设置expires后，防止favicon 丢失
        location ~ ^/favicon\.ico$ {
            root  /html/dist;
        }

        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

    # 管理后台打开的服务代理
    server {
        listen       4444;
        server_name  localhost;
    }
}
```