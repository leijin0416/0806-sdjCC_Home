<template>
    <!-- 中心-建议反馈 -->
    <div class="feedback">
        <Row>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <h2 class="details-h2">个人中心 > <span class="color-gray">建议反馈 > 创建</span> 
                </h2>
                
            </Col>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <div class="m-feedback-box">
                    <!-- 信息 -->
                     <Form :model="formValidate" label-position="left" :label-width="100">
                        <FormItem label="标题">
                            <Input v-model="formValidate.input1"></Input>
                        </FormItem>
                        <FormItem label="详细描述">
                            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 4,maxRows: 4}" placeholder=""></Input>
                        </FormItem>
                        <FormItem label="手机">
                            <Input v-model="formValidate.input3"></Input>
                        </FormItem>
                        <FormItem label="姓名">
                            <Input v-model="formValidate.input4"></Input>
                        </FormItem>
                    </Form>
                    <div class="details-btn">
                        <Button type="success" :size="buttonSize" class="btn" @click="OnUserFeedbackList">提交</Button>
                    </div>
                    <!-- end -->
                </div>
            </Col>
        </Row>
    </div>
</template>


<script>
import axios from '@/common/api/http.js'
import {regs, regex, reEmail, myreg, regNum} from '@/assets/js/regExps.js'

export default {
    data() {
        return {
            buttonSize: 'large',
            formValidate: {
                input1: '',
                desc: '',
                input3: '',
                input4: '',
            },
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
		OnUserFeedbackList() {
            let feedbackProblem = this.formValidate.input1;
            let feedbackContent = this.formValidate.desc;
            let feedbackPhone = this.formValidate.input3;
            let feedbackName = this.formValidate.input4;
            if (feedbackProblem === '' || feedbackContent === '' || feedbackPhone === '' ||feedbackName === '') {
                this.$Message.info({
                    content: '输入的内容不正确',
                    duration: 3
                });
            } else if (!myreg.test(feedbackPhone)) {
                this.$Message.info({
                    content: '输入的手机号不正确',
                    duration: 3
                });
            } else {
                axios.post('', {
                    "func": "app.userFeedback.addUserFeedbackByUserId",
                    "data": {
                        "feedback_problem": feedbackProblem,
                        "feedback_content": feedbackContent,
                        "feedback_phone": feedbackPhone,
                        "feedback_name": feedbackName,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: '您的反馈已提交成功',
                            duration: 3,
                            onClose: () => {
                                this.$router.push({ path:'/feedback'});
                            }
                        });
                    } else {
                        this.$Message.error({
                            content: res.data.data.msg,
                            duration: 3,
                            onClose: () => {
                            }
                        });
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);})
            }
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
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