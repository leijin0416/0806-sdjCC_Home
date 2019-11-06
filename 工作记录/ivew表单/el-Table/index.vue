<template>
  <div>
    <el-dialog title="导出中" :visible.sync="dialogVisible" :before-close="handleClose" width="30%">
      <el-progress
        :text-inside="true"
        :stroke-width="30"
        :percentage="loading"
        :color="customColorMethod"
        status="success"
      ></el-progress>
    </el-dialog>
    <div class="maintop">
      <el-button @click="Excel()" type="success" style="float:right;margin-left:100px;">导出表Excel</el-button>
    </div>
    <tables :tableHead="infoTableHead" :tableDate="inforTableData" :operation="operation"></tables>
    <el-pagination
      background
      :total="sumpage"
      @current-change="handleCurrentChange"
      :current-page="param.page"
      layout="prev, pager, next"
      style="float:left"
    ></el-pagination>
    <el-select
      v-model="param.size"
      @change="paramChange"
      placeholder="请选择"
      style="float:left;width:100px;"
    >
      <el-option :label="'10条'" :value="10"></el-option>
      <el-option :label="'30条'" :value="30"></el-option>
      <el-option :label="'50条'" :value="50"></el-option>
      <el-option :label="'100条'" :value="100"></el-option>
    </el-select>
  </div>
</template>
<style>
</style>
<script>
// http://47.56.118.85:8085/api/
import { export_json_to_excel } from "@/config/excel/Export2Excel";
import tables from "@components/table/customTables";

export default {
    components: {
        tables
    },
    data() {
        return {
            inforTableData: [],
            infoTableHead: [
                {
                    header: "订单编号",
                    dataSourse: "orderId",
                    solat: 0
                },
                {
                    header: "收件人",
                    dataSourse: "name",
                    solat: 0
                },
                {
                    header: "联系方式",
                    dataSourse: "phone",
                    solat: 0
                },
                {
                    header: "状态",
                    dataSourse: "state",
                    solat: 2,
                    start: {
                        "-2": "取消订单",
                        "-1": "待支付",
                        "0": "待发货",
                        "1": "待确认",
                        "2": "已确认",
                        "3": "已完成"
                    }
                }
            ],
            operation: [
                {
                    cloro: "success",
                    text: "详细资料",
                    onclike: (index, data) => {
                        this.$store.state.closeShade = true;
                        this.$store.state.info = data;
                    }
                },
                {
                    cloro: "danger",
                    text: "取消订单",
                    onclike: (index, data) => {
                        this.$http
                        .post("/shop/admin/goods/cancelOrder", { fId: data.orderId })
                        .then(res => {
                            if (res.data.code === 200) {
                            this.$alerts("success", "取消成功");
                            this.api();
                            } else {
                            this.$alerts("error", "取消失败");
                            }
                        });
                    }
                }
            ],
            moneyFrom: {},
            param: {
                page: 1,
                size: 10,
                shopcode: sessionStorage.getItem("code"),
                state: null // 关键字
            },
            sumpage: 1,
            dialogVisible: false,
            loading: 0,
            customColorMethod: [
                { color: "#f56c6c", percentage: 20 },
                { color: "#e6a23c", percentage: 40 },
                { color: "#5cb87a", percentage: 60 },
                { color: "#67c23a", percentage: 80 },
                { color: "#67c23a", percentage: 100 }
            ]
        }
    },
    mounted() {
        this.api();
    },
    methods: {
        // 数据
        api() {
            this.$http.post("/shop/admin/goods/orders", this.param).then(res => {
                this.inforTableData = res.data.data.data;
                this.sumpage = res.data.data.totalpage * 10;
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        // 异步请求Excel数据
        async asyncapi(pagesize) {
            let data = [];
            let tHeader = [
                "订单编号",
                "收件人",
                "联系方式",
                "收货地址",
                "商品名称及规格",
                "实付积分",
                "实付代币",
                "付款时间",
                "状态"
            ];
            let filterVal = [
                "orderId",
                "name",
                "phone",
                "address",
                "goodsskus",
                "sumintegralnum",
                "sumprice",
                "paytime",
                "state"
            ];
            let page = {
                page: 1,
                size: 10,
                shopcode: sessionStorage.getItem("code"),
                state: null // 关键字
            };
            for (let index = 1; index <= pagesize; index++) {
                if (!this.dialogVisible) {
                return;
                }
                page.page = index;
                await this.$http.post("/shop/admin/goods/orders", page).then(res => {
                data.push(...res.data.data.data);
                // eslint-disable-next-line eqeqeq
                if (index == pagesize) {
                    data = this.formatJson(filterVal, data);
                }
                });
                this.loading = Number(((index / pagesize) * 100).toFixed(2));
            }
            export_json_to_excel(tHeader, data, "列表excel");
            this.dialogVisible = false;
        },
        handleClose() {
            this.$confirm("确认关闭？")
                .then(_ => {
                this.dialogVisible = false;
                })
                .catch(_ => {});
        },
        // 导出Excel
        Excel() {
        this.$http
            .post("/shop/admin/goods/orders", {
            page: 1,
            size: 10,
            shopcode: sessionStorage.getItem("code"),
            state: null // 关键字
            })
            .then(res => {
            this.$show(
                "导出页数",
                "输入要导出的页数,每页100条",
                "text",
                "0",
                "",
                ""
            ).then(pagesize => {
                if (/^[1-9]\d*$/.test(pagesize)) {
                if (pagesize < 0 || pagesize > res.data.data.totalpage) {
                    this.$alerts("error", "超过页数");
                } else {
                    this.loading = 0;
                    this.dialogVisible = true;
                    this.asyncapi(pagesize);
                }
                } else {
                this.$alerts("error", "输入正确的数字");
                }
            });
            });
        },
    }
};
</script>
