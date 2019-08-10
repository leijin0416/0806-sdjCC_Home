<template>
    <!-- 中心-建议反馈 -->
    <div class="feedback">
        <Row>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <h2 class="details-h2">个人中心 > <span class="color-gray">建议反馈 > 反馈详情</span> 
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
                        <div class="m-goto">
                            <router-link tag="a" to="/feedback">返回列表</router-link>
                        </div>
                        <h2 class="font-h2">
                            <span>{{feedback.feedback_problem}}</span>
                        </h2>
                        <div class="feedback-text">
                            {{feedback.feedback_content}} 
                        </div>
                        <div class="text-time color-gray">
                            创建时间： {{feedback.feedback_create_time}}
                        </div>
                    </div>
                    <div class="m-feedback-ft">
                        <h2 class="font-h2">回复区:</h2>
                        <div class="text-box" v-if="feedback.background_reply">
                            <h2 class="font-text">
                                <span>后台回复：</span>
                            </h2>
                            <div class="text-bd">{{feedback.background_reply}}</div>
                            <div class="text-ft">
                                <div class="font-h4">
                                    <Button type="success" class="btn" @click="OnFeedbackClick">回复</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end -->
                </div>
            </Col>
        </Row>
        <Modal
            v-model="modalFeedback"
            title="回复内容"
            :mask-closable='false'>
            <div class="details-btn">
                <Form ref="valueFeedback" :model="valueFeedback" style="" >
                    <FormItem>
                        <Input v-model="valueFeedback.user" type="textarea" :autosize="{minRows: 4,maxRows: 4}" placeholder="" />
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button size="large" @click="OnCommentFeedback">确定</Button>
            </div>
        </Modal>
    </div>
</template>


<script>
import axios from '@/common/api/http.js'
import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
    data() {
        return {
            modalFeedback: false,
            feedback: [],

            valueFeedback: {
                user: '',
            }

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
        OnFeedbackClick() {
            this.modalFeedback = true;
        },
        OnCommentFeedback() {
            let id = this.feedback.user_feedback_id;
            let content = this.valueFeedback.user;
			axios.post('', {
				"func": "app.userFeedback.addUserComment",
				"data": {
					"user_feedback_id": id,
					"comment_content": content,
				},
			})
			.then( res => {
				if (res.data.data.type == 200) {
                    this.modalFeedback = false;
				} else {
					this.$Message.error({
						content: res.data.data.msg,
						duration: 3,
						onClose: () => {
						}
					});
                }
				console.log(res);
			})
			.catch( res => {console.log(res);})
            
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        let feedback = local.get('feedback');
        this.feedback = feedback;
        
    },
	//页面离开时
	destroyed: function () {
        local.remove('feedback');
        //console.log("我已经离开了！");
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
        //内容盒子
        .m-feedback-text {
            min-height: 450px;
            max-height: 450px;
            overflow: hidden; 
            overflow-y: auto;
            padding: 5px 0 15px;
            .font-h2 {
                font-size: $font-size-base;
            }
            .feedback-text {
                padding: 20px 0;
                line-height: 2;
            }
            .text-time {padding-top: 20px; text-align: right;}
            .m-goto {
                padding-bottom: 5px;
                margin-bottom: 5px;
                text-align: right;
                border-bottom: 1px solid #eee;
            }
        }

    }
    .m-feedback-ft {
        min-height: 180px;
        max-height: 180px;
        overflow: hidden; 
        overflow-y: auto;
        padding: 20px 0;
        border-top: 1px solid #eee;
        .font-h2 {
            font-size: $font-size-base;
            color: $color-body-c;
        }
        .text-box {
            padding: 10px 0;
            .font-text {
                padding: 5px 0;
                span {
                    display: inline-block;
                    padding-right: 15px;
                }
            }
            .text-bd {
                padding: 5px 15px;
                color: #777;
            }
            .text-ft {
                .font-h4 {
                    text-align: right;
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