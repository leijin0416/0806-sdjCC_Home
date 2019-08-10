<template>
	<div class="g-drawer-box">
		<vue-drawer-layout 
			ref="drawerLayout" 
			:drawer-width="300" 
			:z-index="9">
			<!-- 侧轴 -->
			<div class="m-drawer" slot="drawer">
				<slot name="drawer-l"></slot>
				<a href="javascript:void(0)" class="m-btn" @click="handleToggleDrawer"></a>
			</div>
			
			<!-- 主轴 -->
			<div class="m-content" slot="content">
				<slot name="drawer-c"></slot>
				<a href="javascript:void(0)" class="btn" @click="handleToggleDrawer"></a>
			</div>
		</vue-drawer-layout>
	</div>
</template>

<script>
import Vue from 'vue'
	
export default {
	name: "",
	//组件
	components: {
	},
	//接收父组件传参
	props: [],
	data() {
		return {
		}
	},
	//页面初始化
	mounted(){
	},
	//监听click方法
	methods: {
		handleToggleDrawer () {
			this.$refs.drawerLayout.toggle();
		},
	},
	destroyed () {

    },
	
}
</script>

<style lang="scss" scoped>
.g-drawer-box {
	//主要内容
	.m-content {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: transparent;
		.btn {
			position: fixed;
			top: 15px;
			left: 15px;
			width: 60px;
			height: 45px;
			display: none;
			background: rgba(0, 0, 0, .3);
		}
		.btn:before {
			content: " ";
			position: absolute;
			left: 6px;
			display: block;
			width: 45px;
			height: 5px;
			background: $color-violet-dark;
			border-radius: 8px;
			top: 5px;
			border-radius: 10px;
			/* 利用阴影制作中间的那根线，当鼠标hover时隐藏 */
			box-shadow: 0 14px $color-violet-dark;
		}
		.btn:after {
			content: " ";
			position: absolute;
			left: 6px;
			display: block;
			width: 45px;
			height: 5px;
			background: $color-violet-dark;
			border-radius: 10px;
			bottom: 5px;
		}
	}
	//左侧滑栏
	.m-drawer {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #fff;
		.m-btn {
			position: absolute;
			right: 10px;
			top: 10px;
			z-index: 999;
			width: 50px;
			height: 50px;
			cursor: pointer;
			&:before {
				position: absolute;
				content: '';
				width: 35px;
				height: 5px;
				top: 20px;
				left: 10px;
				background: $color-violet-dark;
				transform: rotate(45deg);
				border-radius: 10px;
			}
			&:after{
				content: '';
				position: absolute;
				top: 20px;
				left: 10px;
				width: 35px;
				height: 5px;
				background: $color-violet-dark;
				transform: rotate(-45deg);
				border-radius: 10px;
			}
		}
	}
}

//小于1024
@media only screen and (max-width: 1024px) {
	.g-drawer-box {
		//显示点击框
		.m-content {
			.btn {display: block;}
		}
	}
}
</style>
