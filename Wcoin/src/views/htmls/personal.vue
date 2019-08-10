<template>
    <!-- 个人中心 -->
    <div class="page">
        <m-nav v-bind:navList="navList" />
        <div class="m-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar"

export default {
    data() {
        return {
            navList: [
				{
					name: '行情',
					herf: "/market",
				},
				{
					name: '币币交易',
					herf: "/exchange"
				},
				{
					name: 'OTC',
					herf: "/apartment",
				},
				{
					name: 'IEO',
                    herf: "/ieoinfo",
				},
			],
        }
    },
    components: {
		'm-nav': NavBar,

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
.page {
    height: 100vh;
	background-color: #f8f9fe;
	.m-container {
        padding-top: 120px;
	}
}

</style>