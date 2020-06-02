<template>
    <div>
        <el-dialog title="添加链接" :visible.sync="addVisible" width="500px" center>
            <el-input v-model="addName" placeholder="备注" size="small"></el-input>
            <el-input v-model="addUrl" placeholder="http://" size="small" style="marginTop:15px"></el-input>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" size="small">取消</el-button>
                <el-button type="primary" @click="addLink" size="small">添加</el-button>
            </span>
        </el-dialog>

        <el-row type="flex" justify="space-between" style="padding:10px;marginTop:-20px">
            <div style="width:430px;display:flex;justify-content:space-between;align-items:center"></div>
            <div>
                <el-button type="success" size="small" @click="addVisible = true">添加链接</el-button>
            </div>
        </el-row>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="序号" width="80" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="备注" width="100" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="链接" width="400" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" :href="scope.row.url" target="_blank">{{scope.row.url}}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="最近浏览量" width="250" align="center">
                <template slot-scope="scope">
                    <el-tag size="mini" type="warning">{{scope.row.hoursFlow}}/时</el-tag>
                    <el-tag
                        size="mini"
                        style="marginLeft:10px"
                        type="warning"
                    >{{scope.row.dayFlow}}/天</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="微信推送" width="130" align="center">
                <template slot-scope="scope">
                    <div style="display:flex;justify-content:center;align-items:center">
                        <div style="width:140px;">
                            <el-select
                                v-model="scope.row.wechatId"
                                placeholder="请选择"
                                size="small"
                                @change="linkWechatId(scope.row._id,scope.row.wechatId)"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item._id"
                                    :label="item.className"
                                    :value="item._id"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-popconfirm title="确定删除吗？" @onConfirm=" deleteLink(scope.row._id)">
                        <el-button slot="reference" size="mini" type="danger">删除</el-button>
                    </el-popconfirm>
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
            tableData: [],
            addVisible: false,
            addUrl: "",
            addName: "",
            classId: "",
            options: []
        };
    },
    computed: {
        ...mapState(["userId"])
    },
    watch: {
        userId() {
            this.getWechatClass();
            this.getList();
        }
    },
    methods: {
        getWechatClass() {
            this.$api
                .getWechatClass({
                    userId: this.userId
                })
                .then(({ data }) => {
                    if (data.code == 1) {
                        this.options = data.result;
                    }
                });
        },
        getList() {
            this.$api
                .getLinkList({
                    userId: this.userId
                })
                .then(({ data }) => {
                    if (data.code) {
                        this.tableData = data.result;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addLink() {
            this.$api
                .addLink({
                    userId: this.userId,
                    url: this.addUrl.trim(),
                    name: this.addName
                })
                .then(({ data }) => {
                    if (data.code == 1) {
                        this.$message.success("添加成功");
                        this.addVisible = false;
                        this.getWechatClass();
                        this.getList();
                        return;
                    }
                    this.$message.error("错了哦，添加失败");
                })
                .catch(err => {
                    console.log(err);
                });
        },

        //删除链接
        deleteLink(_id) {
            this.$api
                .deleteLink({
                    _id
                })
                .then(({ data }) => {
                    if (data.code == 1) {
                        this.$message.success("删除链接成功");
                        this.getWechatClass();
                        this.getList();
                        return;
                    }
                    this.$message.error("删除链接失败");
                })
                .catch(err => {
                    this.$message.error("删除链接失败");
                    console.log(err);
                });
        },
        //更改绑定微信号组
        linkWechatId(linkId, wechatId) {
            this.$api
                .linkWechatId({
                    _id: linkId,
                    wechatId
                })
                .then(({ data }) => {
                    if (data.code == 1) {
                        this.$message.success("链接绑定微信号分组成功");
                        this.getWechatClass();
                        this.getList();
                        return;
                    }
                    this.$message.error("绑定失败");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        //获取微信分组
        this.getWechatClass();
        //获取链接
        this.getList();
    }
};
</script>

<style>
</style>