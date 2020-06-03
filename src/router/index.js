import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/', // 默认进入路由
        redirect: '/home', //重定向
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        children: [
            {
                path: 'wechat',
                name: 'wechat',
                component: () => import('@/components/home/wechat'),
            },
            {
                path: 'wechatClass',
                name: 'wechatClass',
                component: () => import('@/components/home/wechatClass'),
            },
            {
                path: 'linkList',
                name: 'LinkList',
                component: () => import('@/components/home/linkList'),
            },
            {
                path: 'userList',
                name: 'userList',
                component: () => import('@/components/home/user'),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
];

const router = new VueRouter({
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/home') != -1) {
        let isLogin = localStorage.getItem('isLogin');
        if (isLogin == '' || isLogin == null) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;
