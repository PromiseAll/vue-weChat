<template>
    <div>
        <p class="title">微信推送管理</p>
        <el-col :span="24">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#252a34"
                text-color="#eee"
                active-text-color="#08d9d6"
            >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-chat-dot-round"></i>
                        <span>在推微信</span>
                    </template>
                    <el-menu-item index="1-1">
                        <router-link to="/home/wechat" tag="p">微信管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <router-link to="/home/wechatClass" tag="p">分组管理</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-link"></i>
                        <span>在推链接</span>
                    </template>
                    <el-menu-item index="2-1">
                        <router-link to="/home/linkList" tag="p">链接管理</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-user"></i>
                        <span>管理用户</span>
                    </template>
                    <el-menu-item index="3-1">
                        <router-link to="/home/userList" tag="p">用户列表</router-link>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
export default {
    methods: {}
};
</script>

<style lang="less" scoped>
.title {
    line-height: 60px;
    color: white;
    font-size: 20px;
}
p {
    width: 100%;
}
</style>