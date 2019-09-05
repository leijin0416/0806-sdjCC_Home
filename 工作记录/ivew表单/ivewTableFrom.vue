<template>
    <div class="table">
        <Table :columns="columns" :data="data" no-data-text="暂无数据" disabled-hover>
             <!-- 操作审核 -->
            <template 
                slot-scope="{ row, index }" 
                slot="showPay">
                <div v-if="row.BiddingType === 0">
                    <Button type="primary" class="ivu-primary-btn" @click="OnShowTrueClick(row)" >立即审核</Button>
                </div>
                <div v-else>
                    <Button type="primary" disabled>审核通过</Button>
                </div>
            </template>
            
        </Table>
    </div>
</template>

<script>
import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
    name: 'from',
    props: { 
        columns: {
            type: String,
            default: ''
        },
        data: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            
        };
    },
    //监听属性 类似于data概念
    computed: {
		//取
		...mapGetters("localSession", [""]),
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        //console.log(local.get('otcYouself'));
        
    },
    methods: {
        /**
         *  审核
         */
        OnShowTrueClick(i) {
            this.$emit('OnShowPayTrueClick', i);
        },
    }
};
</script>

<style lang="scss" scoped>

.table {
    font-size: 16px;
    span {
        display: inline-block;
        margin-right: 5px;
        vertical-align: middle;
    }
    .table-name {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        &:nth-child(1) {
            width: 30px;
            height: 30px;
            overflow: hidden;
            line-height: 29px;
            font-size: 1rem;
            text-align: center;
            border-radius: 50%;
            color: $color-white;
            background-color: $color-body-c;
            span {
                display: inline-block;
                width: 12px;
                overflow: hidden;
                white-space: nowrap;
                letter-spacing: 10px;
                margin: 0;
                font-weight: bold;
            }
        }
    }
    .btn {margin-right: 10px;}
    .m-play-img {
        img {
            display: inline-block;
            margin: auto 5px;
        }
    }
}

@media only screen and (max-width: 480px) {

}
</style>