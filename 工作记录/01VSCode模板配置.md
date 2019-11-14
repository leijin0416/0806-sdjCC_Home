## 快速生成vue 模板

- 使用快捷`Ctrl + Shift + P`唤出控制台，然后输入snippets并选择

- (或 文件>首选项>用户代码片断里面，输入 vue.json ，然后回车 )

```js
{
	"Print to console": {
        "prefix": "vue",
        "body": [
            "<template>",
            "    <div class=\"page\">\n",
            "    </div>",
            "</template>\n",
            "<script>",
            "//import 《组件名称》 from '《组件路径》';",
            "export default {",
            "    data() {",
            "        return {\n",
            "        }",
            "    },",
            "    components: {\n",
            "    },",
            "    props: {\n",
            "        propC: { type: String, required: true },\n",
            "    },",
            "    //监听属性 类似于data概念",
            "    computed: {\n",
            "    },",
            "    //监控data中的数据变化",
            "    watch: {\n",
            "    },",
            "    //生命周期 - 创建完成（可以访问当前this实例）",
            "    created() {\n",
            "    },",
            "    //生命周期 - 挂载完成（可以访问DOM元素）",
            "    mounted() {\n",
            "    },",
            "    //方法集合",
            "    methods: {\n",
            "    },",
            "}",
            "</script>\n",
            "<style lang=\"scss\" scoped>",
            "/*@import url($3); 引入公共css类*/",
            "$4",
            "</style>",
        ],
        "description": "Log output to console"
    }
}
```
