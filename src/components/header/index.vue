<template>
    <div style="display:flex;justify-content:flex-end;align-items:center;height:60px">
        <el-row type="flex" justify="end" align="middle">
            <div style="marginRight:10px">
                <el-avatar
                    size="small"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
            </div>
            <div
                style="display:flex;justify-content:space-between;align-items:center"
                v-if="isRoot"
            >
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
                                :label="item.nickName"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <span v-else>{{this.nickName}}</span>
            <el-button type="warning" size="small" style="marginLeft:10px" @click="loginOut()">注销</el-button>
        </el-row>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            options: [],
            currentUserId: "",
            nickName: ""
        };
    },
    computed: {
        ...mapState(["userId", "isRoot"])
    },
    methods: {
        ...mapMutations(["setUserId"]),
        getUserList() {
            this.$api
                .getUserList({})
                .then(({ data }) => {
                    this.options = data.result;
                    if (this.currentUserId == "" && this.options.length !== 0) {
                        let userIdTemp = localStorage.getItem("userId");
                        let is = this.options.some(
                            item => item._id == userIdTemp
                        );
                        if (is) {
                            this.currentUserId = userIdTemp;
                            this.setUserId({ userId: userIdTemp });
                        } else {
                            this.currentUserId = this.options[0]._id;
                            this.setUserId({ userId: this.currentUserId });
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getUser() {
            this.$api.getUserList({ _id: this.userId }).then(({ data }) => {
                this.nickName = data.result.nickName;
            });
        },
        loginOut() {
            localStorage.setItem("userId", "");
            localStorage.setItem("isRoot", "");
            localStorage.setItem("isLogin", "");
            this.$router.push("/login");
        }
    },
    created() {
        if (this.isRoot) {
            this.getUserList();
        } else {
            this.getUser();
        }
    }
};
</script>

<style>
</style>