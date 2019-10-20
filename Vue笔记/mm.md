<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Object.defineProperty</title>
    <style>
        .decimal-leading-zero{list-style-type: decimal-leading-zero}
    </style>
</head>
<body>
    <p>参考vue.js实现双向绑定的方法理解双向绑定原理(:Object.defineProperty和发布-订阅模式)</p>
    <h3>前端MVVM原理--参考vue.js实现</h3>
    <ul class="decimal-leading-zero">
        <li>Objdect.defineProperty实现属性劫持</li>
        <li>实现一个Observer,能够对数据的所有的属性进行监听,如有变动可拿到最新值并通知订阅者</li>
        <li>实现一个Compile,对每个元素节点的指令进行扫描和解析,根据指令模板替换相应数据并绑定相应更新函数</li>
        <li>实现Watcher,作为连接Observer和Compile的桥梁,能够订阅并收到每一个属性变动的通知,并执行指令绑定的相应更新函数,更新视图</li>
        <li>mvvm入口函数,整合以上三者</li>
    </ul>
    
    <div id="app">
        <input type="text" v-model="textvalue">
        {{ textvalue }}
        <input type="text" v-model="text">
        {{ text }} {{ text }}
    </div>
<script>
    var uid$1 = 0;
    function Watcher(vm, node, name){
        Dep.target = this;
        this.name = name;
        this.node = node;
        this.vm = vm;
        this.uid = uid$1++;
        this.update();
        Dep.target = null;
    };

    Watcher.prototype = {
        update: function(){
            this.get();
            this.node.nodeValue = this.value;
        },
        get:function(){    //获取data中的属性值
            this.value = this.vm[this.name];
        }
    };

    function compile(node, vm){
        var reg = new RegExp(/\{\{(.*?)\}\}/g);    //正则匹配指令({{ text }})
        if(node.nodeType === 1){    //匹配节点元素
            var attr = node.attributes;    //获取节点元素的所有属性
            //解析属性
            for (var i = 0; i < attr.length; i++) {
                if(attr[i].nodeName == 'v-model'){
                    var name = attr[i].nodeValue;    //获取v-model绑定的属性名
                    node.addEventListener('input', function(e){
                        //给相应的data属性赋值，并触发该属性的set方法
                        vm[name] = e.target.value;
                    });
                    node.value = vm.data[name];        //将data值赋值给node
                    node.removeAttribute('v-model');
                };
            };
        };
        if (node.nodeType === 3) {    //匹配节点类型为text的元素
            if (reg.test(node.nodeValue.trim())) {    //去除空格,防止指令前后有空格的状况
                var nodeValue = node.nodeValue.trim();
                nodeValue.match(reg).forEach(function(key){
                    var name = key.replace(/\{\{(.*?)\}\}/g,RegExp.$1);    //获取匹配到的字符串
                    name = name.trim();
                    //node.nodeValue = vm.data[name];    //将data值赋值给node
                    new Watcher(vm, node, name);    //这里改成订阅者形式,从而实现自动更新绑定相同指令的元素
                });
            };
        };
    };

    function nodeToFragment(node, vm){
        var flag = document.createDocumentFragment();
        var child;

        //循环遍历节点，编译节点并劫持到文档片段中
        while(child = node.firstChild){
            compile(child, vm);    //根据指令模板编译节点指令
            flag.append(child);    //将子节点劫持到文档片段中
        };

        return flag;    //返回文档片段
    };

    function Dep(){
        this.subs = [];
    };

    Dep.prototype = {
        addSub: function(sub){
            if(!this.subs[sub.uid]){
                //防止重复添加
                this.subs[sub.uid] = sub;
            }
        },
        notify: function(){
            for(var uid in this.subs){
                this.subs[uid].update();
            }
        }
    }

    function defineReactive(obj, key, val){
        var dep = new Dep();

        Object.defineProperty(obj, key, {
            get: function(){
                //添加订阅者watcher到主体对象Dep中
                if(Dep.target) dep.addSub(Dep.target);
                return val;
            },
            set: function(newVal){
                if (newVal === val) return;
                val = newVal;
                //console.log(val);
                //作为发布者发出通知
                dep.notify();
            }
        });
    };

    function observe(obj, vm){
        Object.keys(obj).forEach(function(key){
            defineReactive(vm, key, obj[key]);
        });
    };

    function vue(options){
        this.data = options.data;
        var data = this.data;

        observe(data, this);

        var id = options.el;
        var dom = nodeToFragment(document.getElementById(id), this);
        //编译完成后，将dom重新赋值给app
        document.getElementById(id).appendChild(dom);
    };
</script>
<script>
    var vm = new vue({
        el: 'app',
        data: {
            textvalue: 'hello world',
            text: 'hello'
        }
    });
</script>

<script>
    //视图控制器
    // var userInfo = {};
    // Object.defineProperty(userInfo, "nickName", {
    //     get: function(){
    //         return document.getElementById('nickName').innerHTML;
    //     },
    //     set: function(nick){
    //         document.getElementById('nickName').innerHTML = nick;
    //     }
    // });
    // Object.defineProperty(userInfo, "introduce", {
    //     get: function(){
    //         return document.getElementById('introduce').innerHTML;
    //     },
    //     set: function(introduce){
    //         document.getElementById('introduce').innerHTML = introduce;
    //     }
    // })
</script>

<script>
    // //定义一个发布者
    // var publisher = {
    //     publish: function(){
    //         dep.notify();
    //     }
    // };

    // //定义三个订阅者
    // var subscriber1 = {update: function(){console.log(1);}};
    // var subscriber2 = {update: function(){console.log(2);}};
    // var subscriber3 = {update: function(){console.log(3);}};

    // //定义一个主体对象，用于存放订阅者
    // function Dep(){
    //     this.subscribers = [subscriber1,subscriber2,subscriber3];
    // };

    // //定义主体对象的原型方法notify,用于调用订阅者的更新方法,从而实现订阅更新操作
    // Dep.prototype.notify = function() {
    //     this.subscribers.forEach(function(subscriber){
    //         subscriber.update();
    //     });
    // };

    // //发布者发布消息,主体对象执行notify方法,进而触发订阅者执行update方法
    // var dep = new Dep();
    // publisher.publish();
</script>
</body>
</html>