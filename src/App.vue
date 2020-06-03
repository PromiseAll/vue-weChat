<template>
    <div id="App">
        <router-view></router-view>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    methods: {
        ...mapMutations(["setUserId", "setIsRoot"])
    },
    created() {
        if (localStorage.getItem("isRoot") == "") {
            this.setIsRoot({ isRoot: false });
        } else {
            this.setIsRoot({ isRoot: true });
        }

        if (
            localStorage.getItem("userId") == "" ||
            localStorage.getItem("userId") == null
        ) {
            this.setUserId({ userId: "" });
        } else {
            this.setUserId({ userId: localStorage.getItem("userId") });
        }
    }
};
</script>
<style lang="less">
* {
    padding: 0;
    margin: 0;
}
.el-popconfirm__main {
    margin-bottom: 10px;
}

.el-message {
    top: 5px !important;
}
#app {
    min-width: 1440px;
}
</style>
