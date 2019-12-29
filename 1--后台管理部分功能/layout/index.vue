<template>
    <div class="layout" v-wechat-title="$route.meta.title">
        <!-- 左侧导航 -->
        <Layout>
            <Sider ref="side_r">
                <Menu width="auto" mode="vertical" :active-name="tagsName" accordion @on-select="onMenuCollapseClcik" >
                    <div class="ivu-img-lf">
                        <img src="@/assets/img/hk/logo-lf.png" alt="logo.png" class="img">
                    </div>
                    <Submenu :name="item.name" v-for="(item, i) in menuItemData" :key="i" >
                        <template slot="title">
                            <Icon :type="item.type" />
                            {{item.title}}
                        </template>
                        <MenuItem v-for="(items, index) in item.children"
                            :key="index"
                            :name="items.name"
                            :to="items.router" >
                            {{items.title}}
                        </MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <!-- 右侧主体内容 -->
            <Layout>
                <!-- 头部 -->
                <Header>
                    <Menu mode="horizontal" theme="dark" active-name="1">
                        <div class="layout-logo">
                            <img src="@/assets/img/hk/logo.png" alt="logo.png" class="img">
                        </div>
                        <div class="layout-nav">
                            <v-nav />
                        </div>
                    </Menu>
                    <v-tag />
                </Header>
                <!-- 内容 -->
                <Content>
                    <transition name="fade-transverse" mode="out-in">
                        <keep-alive>
                            <div class="ivu-container">
                                <router-view>
                                </router-view>
                            </div>
                        </keep-alive>
                    </transition>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import { rankGender } from '@/api/common'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import { getStore } from '@/common/localUtil'
import { mapFilter } from '@/filters/index'

import NavBar from "@/components/NavBar"
import Tag from "./tags-view/index"

export default {
	name: 'index',
	data() {
		return {
            tagsName: '',
			menuItemData: [
				{
					name: '1',
					type: 'ios-person',
					title: '用户管理',
                    children: [
                        {
                            name: '1-1',
                            title: '用户列表',
                            router: '/user/info',
                        },
                        {
                            name: '1-2',
                            title: '用户资产',
                            router: '/user/property',
                        },
                        {
                            name: '1-3',
                            title: '实名认证',
                            router: '/user/realname',
                        }
                    ],
				},
				{
					name: '2',
					type: 'ios-color-fill',
					title: '空投管理',
                    children: [
                        {
                            name: '2-1',
                            title: '空投养分',
                            router: '/cast/nutrient',
                        },
                        {
                            name: '2-2',
                            title: '空投爱心值',
                            router: '/cast/price',
                        }
                    ],
				},
				{
					name: '6',
					type: 'ios-construct',
					title: '系统设置',
                    children: [
                        {
                            name: '6-2',
                            title: '用户管理',
                            router: '/system/user'
                        }
                    ],
				}
			],
            img: require('@/assets/img/hk/logo.png')
		}
	},
	components: {
        'v-nav': NavBar,
        'v-tag': Tag
	},
	// 监听属性 类似于data概念
	computed: {
        ...mapGetters("localUser", ["navbarName"]),
    },
	// 监控data中的数据变化
	watch: {
        "navbarName": {
			handler: function(newer, older) {
				if (newer == null) {
					return
				} else {
                    let that = this
                    that.tagsName = newer
                    // console.log(newer);
				}
			},
	　　　　deep: true
        }
    },
	//方法集合
	methods: {
        ...mapMutations("localUser", ['headerNavbarName']),
        /**
         *  选择菜单（MenuItem）时触发 导航 active-name
         */
        onMenuCollapseClcik (val) {
            let that = this
            that.headerNavbarName(val)
            that.tagsName = val
            // console.log(val);
        }
	},
	// 生命周期 - 创建完成（可以访问当前this实例）
	created: async function() {
		let that = this
		// that.interval=setInterval(this.changeUsdtData, 60*1000);
	},
	// 生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
        /**
         *  刷新页面 同步 tagsName
         */
        let name = getStore('navbarName')
        if (name) {
            this.tagsName = name
        }
	}
}
</script>

<style lang="scss" scoped>

.layout {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}
// 右侧主体
.layout > .ivu-layout {
    height: 100vh;
    .ivu-layout-sider {
        z-index: 99;
        width: 230px !important;
        flex: 0 0 230px !important;
        max-width: 100% !important;
        overflow: hidden;
        overflow-y: auto;
    }
    // 右侧内容盒子
    .ivu-layout-content {
        flex: initial;
        padding: 105px 15px 15px;
    }
    .ivu-container {
        height: 100%;
        background: #fff;
    }
}
.layout-logo {
    width: 260px !important;
    height: auto !important;
    margin: 3px 15px;
    line-height: 1;
    background: #5b6270;
    border-radius: 3px;
    box-shadow: 0 0 6px #999;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}
.layout-nav{
    margin: 0 auto;
    margin-right: 15px;
}
.ivu-img-lf {
    padding: 10px 30px 10px 10px;
    border-bottom: 1px solid #404040;
    .img {
        display: block;
        margin: auto;
        transition: all 2s ease-in-out;
        &:hover {
            transform: rotate(360deg);
        }
    }
}

//小于1440
@media (min-width: 1024px) and (max-width: 1440px) {

}

//小于1024
@media only screen and (max-width: 480px) {

}

</style>