<template>
    <!-- 中心-在线客服 -->
    <div class="feedback">
        <Row>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <h2 class="details-h2">个人中心 > <span class="color-gray">在线客服</span> 
                </h2>
                
            </Col>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <div class="m-feedback-box">
                    <!-- 信息 -->
                    <div class="img-box">
                        <h2 class="font-h2">Wcoin 官方客服微信</h2>
                        <img src="@/assets/img/hk/icon-QR_code.png" alt="code.png" class="img">
                        <p>微信扫描二维码，了解更多资讯</p>
                    </div>
                    <!-- end -->
                </div>
            </Col>
        </Row>
    </div>
</template>


<script>
import SellingChats from "@/components/SellingChats/SellingChats"

export default {
    data() {
        return {
            valueChatsHd: 0,
            formValidate: {
                input1: '',
                desc: '',
                input3: '',
            },
        }
    },
    components: {
        'm-chat': SellingChats,

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        OnFeedbackClcik() {

        },
        //重新
        OnExamineAgainClcik() {},
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
        padding: 50px 0;
        background-color: #fff;
        .img-box {
            padding: 30px 0;
            text-align: center;
            .font-h2 {
                font-size: 18px;
                font-weight: bold;
            }
            .img {
                display: block;
                margin: 10px auto;
                &:nth-child(2) {width: 200px;}
            }
            p {text-align: center; color: #999;}
        }
    }
}

</style>