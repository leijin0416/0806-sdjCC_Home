### vs code 快速生成vue 模板

- 使用快捷Ctrl + Shift + P唤出控制台，然后输入snippets并选择。(或 文件>首选项>用户代码片断里面，输入 vue.json ，然后回车 )

```js
{
	// Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
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

