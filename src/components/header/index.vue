<template>
    <div style="display:flex;justify-content:flex-end;align-items:center;height:60px">
        <el-row type="flex" justify="end">
            <div style="marginRight:10px">
                <el-avatar
                    size="small"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center">
                <div style="display:flex;justify-content:center;align-items:center">
                    <div style="width:140px;">
                        <el-select
                            v-model="currentUserId"
                            placeholder="选择用户"
                            size="small"
                            @change="()=>{setUserId({ userId: currentUserId });this.$message.success('切换用户成功')}"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item._id"
                                :label="item.nikeName"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            options: [],
            currentUserId: ""
        };
    },
    computed: {
        ...mapState(["userId"])
    },
    methods: {
        ...mapMutations(["setUserId"]),
        getUserList() {
            this.$api
                .getUserList({})
                .then(({ data }) => {
                    this.options = data.result;
                    if (this.currentUserId == "" && this.options.length !== 0) {
                        this.currentUserId = this.options[0]._id;
                        this.setUserId({ userId: this.currentUserId });
                    }
                })
                .catch(err => {
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