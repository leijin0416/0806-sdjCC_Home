<template>
    <div class="tags-box">
        <ul>
            <li class="tags-li">
                <Tag type="dot" color="success">绿色星球 </Tag>
            </li>
            <transition-group>
                <li class="tags-li"
                    v-for="(item,index) in tagsList"
                    :key="index" >
                    <Tag type="dot" closable checkable
                        :color="item.name === navbarNames ? 'primary' : 'default'"
                        @on-change="onTagsChange(item)"
                        @on-close="onTagsClose(item)" >{{item.title}}</Tag>
                </li>
            </transition-group> 
      </ul>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import { getStore, removeStore } from '@/common/localUtil'
import { log } from 'util'

// 删除元素
Array.prototype.indexOf = function(val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
}
Array.prototype.remove = function(val) {
    let index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}

export default {
    data() {
        return {
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
            tagsAdminList: [],  // 储备
            tagsList: [],
            oldTagName: '',
            navbarNames: '',
            oldvalNames: ''
        }
    },
    components: {

    },
    // 监听属性 类似于data概念
    computed: {
        ...mapGetters("localUser", ["navbarName", "tagsData"]),

    },
    // 监控data中的数据变化
    watch: {
        /**
         *  tag 在关闭时的思路？
         *  在切换新的 headerNavbarName 路由时，通过 watch 监听 navbarName 保存旧的name
         */
        "navbarName": {
			handler: function(newer, oldval) {
                let that = this
                if (that.oldTagName != newer) {
                    if (newer == null || oldval == null) {
                        return
                    } else {
                        // that.oldTagName = ''
                        that.oldvalNames = oldval
                        that.navbarAddTags(newer)
                        that.navbarDelTags(oldval)
                        console.log('旧的：' + oldval)
                        console.log('新的：' + newer)
                    }
                }
			},
	　　　　deep: true
        },
        "tagsData": {
			handler: function(newer, oldval) {
                let that = this
				if (newer == null) {
					return
				} else {
                    if (newer.length === 1) {
                        that.$router.push({path: newer[0].router})
                        that.headerNavbarName(newer[0].name)
                        that.navbarNames = newer[0].name

                    }
                    // console.log('------ tag数组列表：------');
                    // console.log(oldval);
                    // console.log(newer);
                    // console.log('------ tag数组列表：------');
				}
			},
	　　　　deep: true
        }
    },
    // 方法集合
    methods: {
        ...mapMutations("localUser", ['headerTagsData', 'headerNavbarName', 'headerOldvalName']),
        navbarDelTags (val) {
            let that = this
            that.headerOldvalName(val)
            // console.log(navbarName);
        },
        /**
         *  数组对象去重
         */
        mapFilter (arr) {
            const res = new Map();
            return arr.filter((arr) => !res.has(arr.name) && res.set(arr.name, 1))
        },
        /**
         *  push 数组tagsList
         */
        navbarAddTags (names) {
            let that = this
            // 左导航点击后的 name 属性
            let name = names
            that.navbarNames = name
            // 左导航数组
            let dataMenu = that.menuItemData
            let tagData = []

            dataMenu.forEach( (el, i, item) => {
                let row = item[i].children
                row.forEach(element => {
                    tagData.push(element)
                });
            });
            tagData.forEach( (el, i, item) => {
                if (item[i].name === name) {
                    // 备份数组
                    that.tagsAdminList.push(item[i])
                }
            });
            // 去重问题
            let tagDataList = that.mapFilter(that.tagsAdminList)
            // 最后赋值给 tag
            that.tagsList = tagDataList
            that.headerTagsData(tagDataList)
            // console.log('------ 主的数组：------');
            // console.log(tagDataList);
            // console.log('------ END数组：------');
        },
        /**
         *  tag 跳转
         */
        onTagsChange (event) {
            let that = this
            let router = event.router
            that.$router.push({path: router});
            that.headerNavbarName(event.name)
            // console.log(event);
        },
        /**
         *  tag 关闭
         */
        onTagsClose (event) {
            removeStore('tagsData')
            let that = this
            if (that.oldvalNames === '') {
                that.oldvalNames = getStore('navbarName')
            }
            let navbarName = getStore('navbarName')
            let oldval = that.oldvalNames
            // console.log('旧的状态：' + oldval);
            // console.log('当前状态：' + navbarName);

            let data = that.tagsList
            let backupData = that.tagsList
            let backupTagsData = that.mapFilter(that.tagsAdminList)
            // 当前选中的元素
            let del = event
            let { title } = del
            let { name } = del

            if (that.tagsList.length === 1) {
                this.$Message.error({
                    content: '小主~ 再删就快没掉了啦',
                    duration: 3,
                    background: true,
                    onClose: () => {}
                })
            } else {
                // 如果 当前高亮状态等于旧的状态，并且删除对象状态等于当前高亮状态
                if (navbarName === oldval && name === navbarName) {
                    that.$router.push({path: data[0].router})
                    that.headerNavbarName(data[0].name)
                    that.navbarNames = data[0].name
                    
                } else {
                    // 删除当前event元素 在原数组数据
                    // 问题
                    for (let i = 0; i < backupData.length; i++) {
                        if (backupData[i].name == navbarName && backupData[i].name == name) {
                            for (let j = 0; j < data.length; j++) {
                                if (data[j].name == oldval) {
                                    that.$router.push({path: data[j].router})
                                    that.headerNavbarName(data[j].name)
                                    that.navbarNames = data[j].name
                                    // 旧的状态
                                    that.oldTagName = data[j].name
                                    // console.log('最新状态：' + that.navbarNames);
                                }
                                backupData.remove(event)
                            }
                        }
                    }
                }
                backupTagsData.remove(event)
                data.remove(event)

                that.tagsAdminList = backupTagsData
                that.tagsList = data
                that.headerTagsData(data)
                // console.log('主的数组' +that.tagsList);
                // console.log('备份数组' + that.tagsAdminList);
            }
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        let that = this
        let tagDataList = JSON.parse(getStore('tagsData'))
        if (tagDataList) {
            let name = getStore('navbarName')
            that.navbarNames = name
            that.tagsList = tagDataList
            that.tagsAdminList = tagDataList
        }
        // that.navbarAddTags()
        // console.log(tagDataList);
        // console.log(getStore('navbarName'));
    }
}
</script>

<style lang="scss" scoped>
// transition-group 动画效果
.v-enter,
.v-leave-to{
    opacity: 0;
    transform: translateX(80px);
}
.v-enter-active,
.v-leave-active{
    transition: all .25s ease-in-out; 
}
// ----- END -----

.tags-box {
    padding: 2px 15px;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #e6e6e6;
    box-shadow: inset 0 0 15px hsla(0,0%,39.2%,.1);
    background: #fbfbfb;
    ul {
        font-size: 0;
        li {
            display: inline-block;
            cursor: pointer;
            &:nth-child(1) {cursor: context-menu;}
        }
    }
}

</style>