<template>
	<div class="m-page">
		<m-nav v-bind:navList="navList" v-bind:searchId="searchId" />
		<!-- 页面容器 -->
		<slot name="container"></slot>
		<m-footer />
	</div>

</template>

<script>
import VueDrawerLayout from "@/components/VueDrawerLayout/VueDrawerLayout"
import NavBar from "@/components/NavBar"
import FooterBox from "@/components/FooterBox"

export default {
	name: "rukou",
	//组件
	components: {
		'm-container-fluid': VueDrawerLayout,
		'm-nav': NavBar,
		'm-footer': FooterBox,
	},
	//接收父组件传参
	props: {
		'navList': null,
		"searchId": null,
	},
	data() {
		return {}
	},
	//页面初始化
	mounted(){},
	//监听click方法
	methods: {
	},
	
}
</script>

<style lang="" scoped>
</style>
