<template>
	<div id="app" class="app">
		<Layout>
			<router-view v-wechat-title="$route.meta.title"  />
			<FooterBox />
		</Layout>
	</div>
</template>

<script>
import FooterBox from "@/components/FooterBox"
import local from './common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import Layout from "@/layouts";
export default {
	name: "App",
	components: {
		Layout,
		FooterBox,
	},
	data() {
		return {
		}
	},
	//实时监听
	watch: {
		'user_SessionId': {
			handler: function(newer, older) {
				if (newer == null) {
					return
				} else {
					// methods中定义好的获取数据列表的方法
					//alert(newer)
					this.onUserOutClick(newer);
				}
			},
	　　　　deep: true
		},
	},
	computed: {
		//取
		...mapGetters("localSession", ["user_SessionId"]),
	},
	methods: {
		onUserOutClick(type) {
			if(type === '0') {
			}
		},
	},
	beforeCreate(){ 
		//beforeCreate()，created(), beforeMount(), mounted() 都可以
		console.log('app beforeCreate');
	},
};
</script>

<style lang="scss" scoped>
	// 主体容器
	body {
		min-width: 1200px;
	}
</style>
