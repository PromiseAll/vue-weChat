<template>
    <div>
        <el-row type="flex" justify="end" style="padding:10px;marginTop:-20px">
            <el-button type="success" size="small">添加</el-button>
            <el-button type="primary" size="small">批量添加</el-button>
            <el-button type="danger" size="small">全部删除</el-button>
        </el-row>
        <el-table :data="tableData" style="width: 100%" algin="center">
            <el-table-column type="index" :index="indexMethod" algin="center"></el-table-column>
            <el-table-column prop="number" label="微信号" width="180" algin="center"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180" algin="center"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span>{{scope.row.isDelete}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 200333,
                    tag: "家"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1517 弄",
                    zip: 200333,
                    tag: "公司"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1519 弄",
                    zip: 200333,
                    tag: "家"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1516 弄",
                    zip: 200333,
                    tag: "公司"
                }
            ]
        };
    },
    methods: {
        indexMethod(index) {
            return index * 2;
        },
        getList() {
            this.axios({
                method: "post",
                url: "/user/myWechat",
                data: {
                    userId: "5eccb0dad40e3525d82a6003"
                }
            }).then(({ data }) => {
                console.log(data);
                this.tableData = data.result.wechat;
            });
        }
    },
    created() {
        this.getList();
    }
};
</script>

<style>
</style>