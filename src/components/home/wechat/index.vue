<template>
    <div>
        <!-- 添加弹窗 -->
        <el-dialog title="添加微信" :visible.sync="addVisible" width="300px" center>
            <el-input v-model="addWechat" placeholder="微信号" size="small"></el-input>
            <el-input v-model="addName" placeholder="备注" size="small" style="marginTop:20px"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" size="small">取消</el-button>
                <el-button
                    type="primary"
                    @click="()=>{updateWechat(classId,1,{number:addWechat,name:addName,isDelete:false})}"
                    size="small"
                >添加</el-button>
            </span>
        </el-dialog>
        <!-- 批量添加弹窗 -->
        <el-dialog title="批量添加" :visible.sync="addsVisible" width="500px" center>
            <el-input type="textarea" :rows="10" placeholder="微信号 姓名(一行一个数据)" v-model="addsWechat"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addsVisible = false" size="small">取消</el-button>
                <el-button
                    type="primary"
                    @click="()=>{updateWechat(classId,2,addsToWechat())}"
                    size="small"
                >添加</el-button>
            </span>
        </el-dialog>
        <!-- 全部删除弹窗 -->

        <el-row type="flex" justify="space-between" style="padding:10px;marginTop:-20px">
            <div style="width:700px;display:flex;justify-content:space-between;align-items:center">
                <span
                    style="fontSize:12px;fontWeight:600;margin:0 0px;color:#333"
                >共 {{tableData.length}} 个数据</span>

                <div style="display:flex;justify-content:center;align-items:center">
                    <span style="fontSize:12px;fontWeight:600;margin:0 10px;color:#333">选择分组:</span>
                    <div style="width:140px;">
                        <el-select v-model="classId" placeholder="请选择" size="small">
                            <el-option
                                v-for="item in options"
                                :key="item._id"
                                :label="item.className"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </div>
                </div>

                <div style="display:flex;justify-content:center;align-items:center">
                    <span style="fontSize:12px;fontWeight:600;margin:0 10px;color:#333">筛选分类:</span>
                    <div style="width:100px;">
                        <el-select v-model="wechatStatus" placeholder="请选择" size="small">
                            <el-option :key="0" label="全部" :value="0"></el-option>
                            <el-option :key="1" label="上线" :value="1"></el-option>
                            <el-option :key="2" label="下线" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
                <div style="width:200px;display:flex;justify-content:center;align-items:center">
                    <span
                        style="fontSize:12px;fontWeight:600;margin:0 10px;color:#333;width:50px"
                    >搜索:</span>
                    <el-input
                        size="small"
                        placeholder="搜索当前微信号"
                        v-model="search"
                        label
                        :clearable="true"
                    ></el-input>
                </div>
            </div>

            <div>
                <el-button type="success" size="small" @click="addVisible = true">添加</el-button>
                <el-button type="primary" size="small" @click="addsVisible = true">批量添加</el-button>
                <el-popconfirm
                    title="确定删除全部微信号嘛？此操作将不可恢复"
                    @onConfirm="()=>{updateWechat(classId,0,[])}"
                    confirmButtonType="danger"
                    style="marginLeft:10px"
                >
                    <el-button slot="reference" size="small" type="danger">全部删除</el-button>
                </el-popconfirm>
            </div>
        </el-row>
        <el-table
            :data="wechatData.filter(data => !search || data.number.includes(search.trim()))"
            style="width: 100%"
            algin="center"
        >
            <el-table-column label="序号" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                </template>
            </el-table-column>
            <el-table-column label="微信号" align="center" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.number}}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名" align="center" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="添加时间" align="center" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.addDate}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" width="180">
                <template slot-scope="scope">
                    <el-tag v-if="!scope.row.isDelete" type="success" size="medium">上线</el-tag>
                    <el-tag v-else type="info" size="medium">下线</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        @click="()=>{updateWechat(classId,4,{id:scope.row.id,isDelete:!scope.row.isDelete})}"
                        size="mini"
                        :type="scope.row.isDelete?'success':'info'"
                    >{{scope.row.isDelete?'上线':'下线'}}</el-button>

                    <el-popconfirm
                        style="marginLeft:10px"
                        title="确定删除吗？"
                        @onConfirm="()=>{updateWechat(classId,3,{id:scope.row.id})}"
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
import { mapState, mapMutations } from "vuex";

export default {
    data() {
        return {
            options: [],
            classId: "",
            tableData: [],
            wechatStatus: 0, //筛选分类状态 0全部 1上线 2下线
            addVisible: false,
            addWechat: "",
            addName: "",
            search: "",
            addsVisible: false,
            addsWechat: ""
        };
    },
    computed: {
        ...mapState(["userId"]),
        wechatData() {
            return this.tableData.filter(wechat => {
                switch (this.wechatStatus) {
                    case 0:
                        return true;
                        break;
                    case 1:
                        if (!wechat.isDelete) {
                            return true;
                        }
                        break;
                    case 2:
                        if (wechat.isDelete) {
                            return true;
                        }
                        break;
                    default:
                        return false;
                        break;
                }
            });
        }
    },
    watch: {
        userId() {
            this.classId = "";
            this.getWechatClass();
        },
        options() {
            if (this.options.length == 0) {
                return;
            }
            let wechatData = this.options.filter(item => {
                if (item._id == this.classId) {
                    return true;
                }
                return false;
            });

            if (wechatData.length == 0) {
                return;
            } else {
                this.tableData = wechatData[0].wechat;
            }
        },

        classId(newId, oldId) {
            if (this.options.length == 0) {
                return;
            }
            let wechatData = this.options.filter(item => {
                if (item._id == newId) {
                    return true;
                }
                return false;
            });
            if (wechatData.length == 0) {
                this.tableData = wechatData;
            } else {
                this.tableData = wechatData[0].wechat;
            }
        }
    },
    methods: {
        getWechatClass() {
            this.$api
                .getWechatClass({
                    userId: this.userId
                })
                .then(({ data }) => {
                    if (data.code && data.result.length) {
                        this.options = data.result;
                        if (this.classId == "") {
                            this.classId = data.result[0]._id;
                        }
                    }
                });
        },
        updateWechat(_id, type, wechat) {
            this.$api
                .updateWechat({
                    _id,
                    type,
                    wechat
                })
                .then(({ data }) => {
                    if (data.code == 1) {
                        this.addWechat = "";
                        this.addsWechat = "";
                        this.addVisible = false;
                        this.addsVisible = false;
                        this.$message.success("更新数据成功");
                        return;
                    }
                    this.$message.error("更新数据失败");
                })
                .then(() => {
                    this.getWechatClass();
                });
        },
        addsToWechat() {
            let arr1 = this.addsWechat.trim().split("\n");
            let arr2 = arr1.filter(item => item != "");
            let arr3 = arr2.map(item => {
                let isDelete = false;
                let i = item
                    .trim()
                    .replace(/\s+/g, " ")
                    .split(" ");
                return {
                    number: i[0],
                    name: i[1],
                    isDelete
                };
            });
            return arr3;
        }
    },
    created() {
        this.getWechatClass();
    }
};
</script>

<style>
</style>