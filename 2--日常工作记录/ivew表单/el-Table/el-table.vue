<template>
    <!-- 
        label	显示的标题
        prop	对应列内容的字段名,数据名称

        tableDate   后台数据
        tableHead   表头
     -->
    <div>
        <el-table
            :data="tableDate"
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleRowChange"
            stripe
            >
        <div v-for="(item,index) in tableHead" :key="index">
            <!-- 表格 -->
            <el-table-column 
                v-if="item.solat==0"
                :label="item.header"
                :prop="item.dataSourse" />
            <!-- solat 自定义表格 -->
            <el-table-column
                v-if="item.solat==2"
                :label="item.header"
                :width="typeof(item.width)==='undefined'?'':item.width"
                :prop="item.dataSourse"
                >
                <template slot-scope="scope">
                    <span v-if="typeof(scope.row[item.dataSourse])==='undefined'"></span>
                    <span v-else>
                        <span v-for="(items, index) in item.start" :key="index">
                            <span v-if=" scope.row[item.dataSourse].toString()===index.toString()">
                                {{items}}
                                {{scope.row[item.dataSourse]}}
                            </span>
                        </span>
                    </span>
                </template>
            </el-table-column>
            <!--理财配置-->
            <el-table-column v-if="item.solat==3" align="center" :label="item.header">
                <template slot-scope="scope">
                    <el-button type="primary" @click="item.onclike.copyreader(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    type="success"
                    v-if="scope.row.enable===0"
                    @click="item.onclike.putaway(scope.$index, scope.row)"
                    >上架</el-button>
                    <el-button
                    type="warning"
                    v-if="scope.row.enable===1"
                    @click="item.onclike.putout(scope.$index, scope.row)"
                    >下架</el-button>
                    <el-button type="danger" @click="item.onclike.delete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </div>

        <!--
        cloro{
            不赋值 白色
            primary 蓝色
            success 绿色
            info 灰色
            warning 黄色
            danger 红色
        }
        -->
        <!--按钮-->
        <el-table-column v-if="operation.length!=0" :width="buttonWidth" align="center" label="操作">
            <template slot-scope="scope">
            <el-button
                v-for="(item, index) in operation"
                :key="index"
                :type="item.cloro"
                @click="item.onclike(scope.$index, scope.row)"
            >{{item.text}}</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import qrCode from "@components/qrcode/code";

export default {
    components: {
        qrCode
    },
    props: {
        tableDate: Array,
        tableHead: Array,
        operation: Array,
        ifSelection: Boolean,
        buttonWidth: String
    },

    methods: {
        handleRowChange() {
            this.$emit("selection", this.$refs.multipleTable.selection);
        },
        download() {
            var oQrcode = document
                .getElementById("qrUrl")
                .getElementsByTagName("img");
            var a = document.createElement("a");
            var event = new MouseEvent("click");
            a.download = "二维码";
            a.href = oQrcode[0].src;
            a.dispatchEvent(event);
        }
    }
};
</script>
