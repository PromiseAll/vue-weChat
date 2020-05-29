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
            <div style="width:430px;display:flex;justify-content:space-between;align-items:center">
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

                <div style="width:200px;display:flex;justify-content:center;align-items:center">
                    <span
                        style="fontSize:12px;fontWeight:600;margin:0 10px;color:#333;width:50px"
                    >搜索:</span>
                    <el-input
                        size="small"
                        placeholder="搜索微信号"
                        suffix-icon="el-icon-search"
                        v-model="search"
                        label="3245"
                    ></el-input>
                </div>
            </div>

            <div>
                <el-button type="success" size="small" @click="addVisible = true">添加</el-button>
                <el-button type="primary" size="small" @click="addsVisible = true">批量添加</el-button>
                <el-button type="danger" size="small" @click="()=>{updateWechat(classId,0,[])}">全部删除</el-button>
            </div>
        </el-row>
        <el-table
            :data="tableData.filter(data => !search || data.number.includes(search.trim()))"
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
            <el-table-column label="姓名" align="center" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.isDelete}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="()=>{updateWechat(classId,3,{number:scope.row.number})}"
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
            options: [],
            classId: "",
            tableData: [],
            addVisible: false,
            addWechat: "",
            addName: "",
            search: "",
            addsVisible: false,
            addsWechat: ""
        };
    },
    watch: {
        options() {
            this.tableData = this.options.filter(item => {
                if (item._id == this.classId) {
                    return true;
                }
                return false;
            })[0].wechat;
            console.log(this.tableData);
        },

        classId(newId, oldId) {
            this.tableData = this.options.filter(item => {
                if (item._id == newId) {
                    return true;
                }
                return false;
            })[0].wechat;
            console.log(this.tableData);
        }
    },
    methods: {
        getWechatClass() {
            this.$api
                .getWechatClass({
                    userId: "5eccb0dad40e3525d82a6004"
                })
                .then(({ data }) => {
                    this.options = data.result;
                    if (this.classId == "") {
                        this.classId = data.result[0]._id;
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
                    console.log(data);
                })
                .then(() => {
                    this.getWechatClass();
                    this.addVisible = false;
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
            console.log(arr3);
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