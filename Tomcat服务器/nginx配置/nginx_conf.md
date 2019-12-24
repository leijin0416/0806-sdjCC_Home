# conf > nginx.conf 文件配置

图片启用 GZip压缩 会适得其反，因为不仅浪费了CPU，还增大了体积，势必影响服务器性能，影响网站速度。

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

    # 如果port_in_redirect为off时，那么始终按照默认的80端口；如果该指令打开，那么将会返回当前正在监听的端口。
    port_in_redirect off;

    # 前台展示打开的服务代理
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
            proxy_set_header X-Real-IP $remote_addr;
            #proxy_pass http://47.106.136.114:3000/ ;
        }
        #set site favicon
        
        #gzip 调优
        gzip on;
        gzip_http_version   1.1;    
        gzip_buffers 4 32k;
        gzip_comp_level 6;
        gzip_min_length 1000;
        gzip_types text/csv text/xml text/css text/plain text/javascript application/javascript application/x-javascript application/json application/xml;
        gzip_vary on;

        #expires 缓存调优
        location ~* \.(ico|jpe?g|gif|png|bmp|swf|flv)$ {
            root  html/dist;
            expires 10d;
            #log_not_found off;
            access_log off;
        }

        location ~* \.(js|css)$ {
            root  html/dist;
            expires 1d;
            log_not_found off;
            access_log off;
        }

        #favicon 丢失
        location ~ ^/favicon\.ico$ {
            root  html/dist;
        }

        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }


    # HTTPS server
    # 管理后台打开的服务代理
    server {
        listen       4444;
        server_name  localhost;

        location / {
            root   /usr/local/nginx/html/web/;
            index  index.html index.htm;
            try_files $uri $uri/ @router;
            autoindex on;
        }
        location @router{
            rewrite ^.*$ /index.html last;
        }

        location /api/ {
            proxy_set_header X-Real-IP $remote_addr;
            #proxy_pass http://47.106.136.114:3000/ ;
        }

        gzip on;
        gzip_buffers 32 4k;
        gzip_comp_level 6;
        gzip_min_length 200;
        gzip_types text/css text/xml application/javascript;
        gzip_vary on;

        error_page   500 502 503 504  /50x.html;
    }
}
```