<template>
    <!-- otc- 订单申诉 -->
    <div class="page">
        <m-nav v-bind:navList="navList" />
        <div class="m-container">
            <Row>
                <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                    <h2 class="details-h2">订单申诉</h2>
                </Col>
                <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                    <div class="m-details-box">
                        <div class="details-text-hd">
                            <h2 class="font-h2">平台提示</h2>
                            <div class="details-text">
                                <div class="text-p">提起申诉后资产将会被冻结，平台将会介入本次交易，直至申诉结束。恶意申诉这将被冻结账户，付款成功或者取消申诉后 <span class="color-reg">5分钟</span> 才可以发起申诉。</div>
                                <div class="text-p">离结束仅剩：
                                <!-- 时间戳 -->
                                <count-down endTime="1563346212" :callback="callback" endText="00:00"></count-down> </div>
                            </div>
                        </div>
                        <div class="details-text-bd">
                            <h2 class="font-h2">申诉类型</h2>
                            <div class="m-select">
                                <Select v-model="modelAppeal" style="width:220px" placeholder="请选择申诉类型">
                                    <Option v-for="item in cityAppealList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                                </Select>
                            </div>
                            <h2 class="font-h2">申诉说明</h2>
                            <div class="m-textarea">
                                <Input v-model="textareaAppeal" type="textarea" :rows="4" :autosize="{minRows: 4,maxRows: 4}" placeholder="请输入您的申诉内容" />
                            </div>
                        </div>
                    </div>
                    <div class="details-btn">
                        <Button type="success" :size="buttonSize" class="btn">确认提交</Button>
                        <Button type="success" :size="buttonSize" class="btn">取消申诉</Button>
                    </div>
                </Col>
            </Row>
        </div>
        
    </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import countDownTime from "@/components/countDownTime/countDownTime"

export default {
    data() {
        return {
            modelAppeal: '',
            textareaAppeal: '',
            cityAppealList: [
                {value: '我已完成付款，买家未及时放行'},
                {value: '我向卖家多转了钱'},
                {value: '其他'},
            ],
            buttonSize: 'large',
            navList: [
				{
					name: '行情',
					herf: "/market",
				},
				{
					name: '币币交易',
					herf: "/exchange"
				},
				{
					name: 'OTC',
					herf: "/apartment",
					id: 1,
				},
				{
					name: 'IEO',
                    herf: "/ieoinfo",
				},
            ],
            
        }
    },
    components: {
        'm-nav': NavBar,
        'count-down': countDownTime,

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        callback() {},
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
.page {
    height: 100vh;
	background-color: #f8f9fe;
	.m-container {
        padding-top: 120px;
        .details-h2 {
            padding: 15px 30px;
            margin-bottom: 15px;
            font-size: 18px;
            font-weight: bold;
            border-radius: 5px;
            background-color: $color-white;
            box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
        }
        
    }
}

</style>