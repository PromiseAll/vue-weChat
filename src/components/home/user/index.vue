<template>
    <div>
        <el-dialog title="添加用户" :visible.sync="addVisible" width="500px" center>
            <el-input v-model="addNikeName" placeholder size="small"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" size="small">取消</el-button>
                <el-button type="primary" @click="addUser" size="small">添加</el-button>
            </span>
        </el-dialog>

        <el-row type="flex" justify="space-between" style="padding:10px;marginTop:-20px">
            <div style="width:430px;display:flex;justify-content:space-between;align-items:center"></div>
            <div>
                <el-button type="success" size="small" @click="addVisible = true">添加用户</el-button>
            </div>
        </el-row>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="序号" width="180" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="昵称" width="280" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.nikeName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-popconfirm
                        title="确定删除用户所有数据吗？"
                        @onConfirm="deleteUser(scope.row._id)"
                        confirmButtonType="danger"
                    >
                        <el-button slot="reference" size="mini" type="danger">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            addVisible: false,
            addNikeName: ""
        };
    },
    methods: {
        getUserList() {
            this.$api
                .getUserList({})
                .then(({ data }) => {
                    this.tableData = data.result;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addUser() {
            this.$api
                .addUser({ nikeName: this.addNikeName })
                .then(({ data }) => {
                    if (data.code == 1) {
                        this.addVisible = false;
                        this.getUserList();
                        this.$message.success("添加用户成功");
                        return;
                    }
                    this.$message.error("添加用户失败");
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteUser(_id) {
            this.$api
                .deleteUser({ _id })
                .then(({ data }) => {
                    if (data.code == 1) {
                        this.$message.success("删除成功");
                        this.getUserList();
                        return;
                    }
                    this.$message.error("删除失败");
                })
                .catch(err => {
                    this.$message.error("删除失败");
                    console.log(err);
                });
        }
    },
    created() {
        this.getUserList();
    }
};
</script>

<style>
</style>