<template>
    <!-- 中心-建议反馈 -->
    <div class="feedback">
        <Row>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <h2 class="details-h2">个人中心 > <span class="color-gray">建议反馈 > 反馈记录</span> 
                    <Button type="success" class="btn" to="/found">
                        <Icon type="ios-add-circle-outline" />
                        <p>新建反馈</p>
                    </Button>
                </h2>
                
            </Col>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <div class="m-feedback-box">
                    <!-- 信息 -->
                    <div class="m-feedback-text">
                        <div class="text-list" v-for="(item, index) in feedbackList" :key="index">
                            <a @click="OnfeedBackClick(item)">
                                <h4 class="font-h4 ellipsis-sm">{{item.feedback_problem}}</h4>
                                <p class="font-time">{{item.feedback_create_time}}</p>
                            </a>
                        </div>
                    </div>
                    <!-- end -->
                </div>
            </Col>
            <Col span="12" offset="5" style="margin-top: 15px">
                <!-- 分页 -->
                <Page :total="Pagetotal" :page-size="Pagesize" @on-change="changePages" show-total style="text-align: center;" />
            </Col>
        </Row>
    </div>
</template>


<script>
import axios from '@/common/api/http.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
    data() {
        return {
			Pagetotal: 0,//总条数
			Pagesize: 6,//每页显示多少条
            historyData: [],//分页数据的盒子
            
            feedbackList: []
        }
    },
    components: {

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
		//传
        ...mapMutations("localSession", ['handleUserFeedback']),
        
        //列表
		OnUserFeedbackList() {
			axios.post('', {
				"func": "app.userFeedback.findUserFeedbackByUserIdList",
				"data": {
					"pagNumber": 1,
					"pagSize": 1,
					"sumPage": 1,
				},
			})
			.then( res => {
				if (res.data.data.type == 200) {
					let feedbackList = res.data.data.date.date;
					this.feedbackList = feedbackList;
					
					// 分页-保存取到的所有数据到数组中
					this.historyData = feedbackList;
					this.Pagetotal = feedbackList.length; //获取数组长度
					// 初始化显示，小于每页显示条数，全部显示，大于每页显示条数，取前每页条数显示
					if(feedbackList.length < this.Pagesize){
						//this.pageHouseTrue=true;
						this.feedbackList = this.historyData;
					} else{
						this.feedbackList = this.historyData.slice(0,this.Pagesize);
					}
				}
				console.log(res);
			})
			.catch( res => {console.log(res);})

        },
		//分页
		changePages(index) {
			var _start = ( index - 1 ) * this.Pagesize;
			var _end = index * this.Pagesize;
			this.noticeList = this.historyData.slice(_start,_end);
		},
        //跳转
        OnfeedBackClick(data) {
            let id = data.user_feedback_id;
            this.$router.push({ path:'/foundinfo', query:{productId: id}});
            this.handleUserFeedback(data); //存详情
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.OnUserFeedbackList();
    },
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/

.feedback {
    .details-h2 {
        padding: 15px 30px;
        margin-bottom: 15px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
        .btn {
            position: absolute;
            top: 10px;
            right: 10px;
            p {
                display: inline-block;
                padding-left: 5px;
            }
            /deep/.ivu-icon {padding-bottom: 3px;}
        }
    }
    .m-feedback-box {
        padding: 15px 30px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
        .m-feedback-text {min-height: 630px; padding: 5px 0 15px;}
        .text-list {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            .font-h4 {
                min-height: 46px;
                font-size: $font-size-base;
            }
            .font-time {
                padding-top: 10px;
                text-align: right;
                color: #999;
            }
            a {
                display: block;
                color: $color-black;
                &:hover {
                    .font-h4 {color: $color-body-c;}
                }
            }
            &:last-child {border-bottom: none;}
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