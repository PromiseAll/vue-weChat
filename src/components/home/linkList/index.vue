<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="日期" width="280" align="center">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
        </el-table-column>
        <el-table-column label="链接" width="180" align="center">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <p>链接: {{ scope.row.url }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.url }}</el-tag>
                    </div>
                </el-popover>
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
</template>

<script>
export default {
    data() {
        return {
            tableData: []
        };
    },
    methods: {
        getList() {
            this.axios({
                method: "post",
                url: "/link/list",
                data: {
                    userId: "5ecb83a9f6e8ae091cd00c3d"
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    this.tableData = data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    },
    created() {
        this.getList();
    }
};
</script>

<style>
</style>