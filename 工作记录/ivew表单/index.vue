<template lang="html">
    <div class="tabel-box" >
        <v-table 
            @OnShowPayTrueClick="OnShowPayTrueClick"
            :columns="columns1" 
            :data="messageData" />
    </div>
</template>

<script>
import tableFromData from "@/components/tableFromData/tableFromData"
/**
 *  - 表格可以通过 slot插槽 的方式 实现一些特殊的功能，如：按钮等；
 *  - type: 'index' 序号；
 *  - sortable: true  排序；
 * 
 *  - messageData 为数据源，后台获取
 *  - columns1 定义表格的头, 参数 key 的值为 messageData 中对应的参数名
 * 
 */

export default {
    name: 'table',
    data() {
        return {
            messageData: Array,
            columns1: [
                // {
                //     title: '序号',
                //     type: 'index',
                //     width: 80,
                //     align: 'center'
                // },
				{
					title: '房源编号',
					key: 'houseId',
                    width: 100,
				},
				{
					title: '用户姓名',
                    key: 'userName',
                    width: 150,
				},
				{
					title: '手机号',
					key: 'userPhone',
				},
				{
					title: '身份证号',
					key: 'userIdCard'
				},
				{
					title: '保证金/元',
					key: 'money',
                    width: 160,
                    sortable: true,
				},
				{
					title: '竞买号',
					key: 'BiddingCode',
                    width: 150,
				},
				{
					title: '创建时间',
					key: 'houseCreateTime',
                    sortable: true,
				},
				{
					title: '已确认金额',
					key: 'earnestPrice',
                    width: 160,
				},
				{
					title: '操作',
                    key: 'BiddingType',
                    slot: 'showPay',
                    width: 160,
				},
            ],
        }
    },
    components: {
       'v-tables': tableFromData,
    },
    model: {
    },
    props: {

    },
    watch: {
    },
    mounted() {

    },
    methods: {
        /**
         *  子组件传过来的值
         */
        OnShowPayTrueClick(i) {
            let data=i;
        },
    }
}
</script>

<style lang="scss" scoped>

</style>