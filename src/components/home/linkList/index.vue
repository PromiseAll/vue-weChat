<template>
    <div>
        <el-dialog title="添加链接" :visible.sync="addVisible" width="500px" center>
            <el-input v-model="addUrl" placeholder="http://" size="small"></el-input>
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
            <el-table-column label="备注" width="180" align="center">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="链接" width="280" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>链接: {{ scope.row.url }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.url }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="微信推送" width="180" align="center">
                <template>
                    <div style="display:flex;justify-content:center;align-items:center">
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
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
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
import { mapState, mapMutations } from "vuex";

export default {
    data() {
        return {
            tableData: [],
            addVisible: false,
            addUrl: "",
            classId: "",
            options: []
        };
    },
    computed: {
        ...mapState(["userId"])
    },
    watch: {
        userId() {
            this.getList();
        }
    },
    methods: {
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
                    url: this.addUrl.trim()
                })
                .then(({ data }) => {
                    if (data.code) {
                        console.log(data);
                    }
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
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