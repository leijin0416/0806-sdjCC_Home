<template>
    <!-- 中心-我的邀请 -->
    <div class="invite">
        <Row>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <h2 class="details-h2">个人中心 > <span class="color-gray">我的邀请</span> </h2>
            </Col>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <div class="m-invite-box">
                    <!-- 信息 -->
                    <div class="m-invite-bd">
                        <!-- <h2 class="font-h2">专属邀请码</h2>
                        <div class="invite-bd-text">
                            <p>
                                <span class="color-gray">ADRFHWRTJ</span>
                                <span class="color-body-c">复制</span>
                            </p>
                            <p>
                                <span>ADRFHWRTJ</span>
                                <span>8412</span>
                            </p>
                        </div> -->
                        <h2 class="font-h2">专属邀请链接</h2>
                        <div class="invite-bd-text">
                            <p>
                                <span class="color-gray">ADRFHWRTJ</span>
                                <span class="color-body-c">复制</span>
                            </p>
                            <p>
                                <span>奖励数额(WCOIN):</span>
                                <span>{{invitation}}</span>
                            </p>
                        </div>
                        <h2 class="font-h2 padd-md">好友列表</h2>
                        <div>
							<m-table 
								:columns="freeColumns"
								:data="freeInviteData" />
                        </div>
                    </div>
                    <!-- end -->
                    
                    <!-- 分页 -->
                    <Page :total="Pagetotal" :page-size="Pagesize" @on-change="changePages" show-total />
                </div>
            </Col>
        </Row>
    </div>
</template>


<script>
import axios from '@/common/api/http.js'
import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import ivewTableSlots from "@/components/fromMarketList/ivewTableSlots"

export default {
    data() {
        return {
            freeColumns: [
                {
                    title: "手机号",
                    key: 'user_phone',
                    slot: ""
                },
                {
                    title: "昵称",
                    key: 'user_name',
                    slot: ""
                },
                {
                    title: "奖励（SCGC）",
                    key: 'user_association_num',
                    slot: ""
                },
                {
                    title: "注册时间",
                    key: 'user_create_time',
                    slot: ""
                },
            ],
            freeInviteData: [],
            invitation: '',

			Pagetotal: 0,//总条数
			Pagesize: 7,//每页显示多少条
            historyData: [],//分页数据的盒子
        }
    },
    components: {
		'm-table': ivewTableSlots,

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        // 邀请金额
        OnInvitationAward() {
            axios.post('', {
                "func": "app.invitation.findInvitationAward",
                "data": {},
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let invitation = res.data.data.date;
                    this.invitation = invitation;
                } 
                console.log(res);
            })
            .catch( res => {console.log(res);})

        },
        //查列表
        OnInvitationUser() {
            axios.post('', {
                "func": "app.invitation.findInvitationUser",
                "data": {
                    "pagNumber": 1,
                    "pagSize": 1,
                    "sumPage": 0,
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let freeData = res.data.data.date;
                    // 分页-保存取到的所有数据到数组中
                    this.historyData = freeData.houseList;
                    this.Pagetotal = freeData.houseList.length; //获取数组长度
                    // 初始化显示，小于每页显示条数，全部显示，大于每页显示条数，取前每页条数显示
                    if(freeData.houseList.length < this.Pagesize){
                        this.freeInviteData = this.historyData;
                    } else {
                        this.freeInviteData = this.historyData.slice(0,this.Pagesize);
                    }
                    if (freeData.houseList.length === 0) {
                        this.PagesizeShow=true;
                    }
                } 
                //console.log(res);
            })
            .catch( res => {console.log(res);})

        },
		//分页
		changePages(index) {
			var _start = ( index - 1 ) * this.Pagesize;
			var _end = index * this.Pagesize;
			this.freeInviteData = this.historyData.slice(_start,_end);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.OnInvitationUser();
        this.OnInvitationAward();
    },
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
/deep/.ivu-tabs-bar {border-bottom-color: #eee;}
/deep/.ivu-table-body {
    .ivu-table-cell span {
        color: #727b95;
    }
} 
.padd-md {padding-top: 30px;}

.invite {
    .details-h2 {
        padding: 15px 30px;
        margin-bottom: 15px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
    }
    .m-invite-box {
        padding: 15px 30px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
        .m-invite-bd {
            padding: 20px 0;
            .font-h2 {
                padding-bottom: 10px;
                font-size: $font-size-base;
                font-weight: bold;
            }
            .invite-bd-text {
                padding-bottom: 30px;
                p {
                    position: relative;
                    display: inline-block;
                    width: 300px;
                    padding: 10px 15px;
                    margin-right: 15px;
                    border-radius: 5px;
                    background-color: #f8f9fe;
                    box-shadow: 0 2px 6px rgba(151, 151, 151, .2);
                    span:nth-child(1) {
                        display: inline-block;
                        vertical-align: middle;
                        max-width: 150px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    span:last-child {
                        @include tb;
                        right: 15px;
                    }
                    &:last-child {
                        background-color: $color-body-c;
                        box-shadow: 0 2px 6px rgba(151, 151, 151, .8);
                        span {
                            color: #a2b2fc;
                            &:last-child {
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
    .details-btn {
        padding-top: 50px;
        text-align: center;
        .btn {
            width: 230px;
            box-shadow: 0 2px 8px rgba(151, 151, 151, .4);
        }
    }
}

</style>