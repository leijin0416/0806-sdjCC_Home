# 服务器

对于tomcat服务器用于java web应用程序，而apache服务器本身只支持处理静态的HTML资源。

## nginx gzip 小优化：

```php
server {
    gzip on;
    gzip_buffers 32 4k;
    gzip_comp_level 6;
    gzip_min_length 200;
    gzip_types text/css text/xml application/javascript;
    gzip_vary on;
}
```

ngonx 开启 gzip，加快首屏渲染时间，图片并不适用