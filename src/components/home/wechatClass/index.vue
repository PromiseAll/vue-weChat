<template>
    <div>
        <!-- 添加弹窗  -->

        <el-dialog title="添加分组" :visible.sync="DialogVisible" width="400px" center>
            <el-input v-model="className" placeholder="请输入微信组名"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="createWechatClass" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <!-- ---------- -->

        <el-row type="flex" justify="end" style="padding:10px;marginTop:-20px">
            <div>
                <el-button type="success" size="small" @click="DialogVisible=true">添加分组</el-button>
            </div>
        </el-row>
        <el-table :data="tableData" style="width: 100%" algin="center">
            <el-table-column label="序号" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{scope.$index}}</span>
                </template>
            </el-table-column>
            <el-table-column label="组名" align="center" width="280">
                <template slot-scope="scope">
                    <span>{{scope.row.className}}</span>
                </template>
            </el-table-column>
            <el-table-column label="微信号数" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.wechat.length}}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建日期" align="center" width="280">
                <template slot-scope="scope">
                    <span>{{scope.row.date}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="deleteWechatClass(scope.row._id)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    data() {
        return {
            DialogVisible: false,
            className: "",
            tableData: []
        };
    },
    computed: {
        ...mapState(["userId"])
    },
    watch: {
        userId() {
            this.getWechatClass();
        }
    },
    methods: {
        getWechatClass() {
            this.$api
                .getWechatClass({
                    userId: this.userId
                })
                .then(({ data }) => {
                    if (data.code) {
                        this.tableData = data.result;
                    }
                });
        },
        createWechatClass() {
            this.$api
                .createWechatClass({
                    userId: this.userId,
                    className: this.className
                })
                .then(({ data }) => {
                    this.DialogVisible = false;
                })
                .then(() => {
                    this.getWechatClass();
                });
        },
        deleteWechatClass(_id) {
            this.$api
                .deleteWechatClass({
                    _id
                })
                .then(({ data }) => {
                    console.log(data);
                })
                .then(() => {
                    this.getWechatClass();
                });
        }
    },
    created() {
        this.getWechatClass();
    }
};
</script>

<style>
</style>