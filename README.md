# 文档

解决 nginx: [error] invalid PID number ; in /usr/local/nginx/logs/nginx.pid

- **第一步**：执行命令  killall -9 nginx   杀掉nginx 进程

- **第二步**：执行命令  /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf  
重新加载配置文件

- **第三步**：执行命令  ./nginx -s reload 重新启动nginx

[参考链接](https://blog.csdn.net/htycsdnblog/article/details/79798553) | [解决github加载慢](https://www.jianshu.com/p/3eacebfc55ab) | [github最新地址](https://github.com.ipaddress.com/) | [多平台图床聚合-图片外链](https://img.mosq.cn/)
