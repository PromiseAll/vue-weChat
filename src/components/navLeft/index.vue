<template>
    <div>
        <p class="title">微信推送管理</p>
        <el-col :span="24">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>在推微信</span>
                    </template>
                    <router-link to="/home/wechat" tag="el-menu-item" index="1-1">微信管理</router-link>
                    <router-link to="/home/wechatClass" tag="el-menu-item" index="1-1">分组管理</router-link>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>在推微信</span>
                    </template>
                    <router-link to="/home/linkList" tag="el-menu-item" index="1-3">链接列表</router-link>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>用户管理</span>
                    </template>
                    <router-link to="/home/userList" tag="el-menu-item" index="1-3">用户列表</router-link>
                    <router-link to="/home/linkAdd" tag="el-menu-item" index="1-3">添加链接</router-link>
                </el-submenu>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style lang="less" scoped>
.title {
    line-height: 60px;
}
</style>