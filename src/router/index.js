import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
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

export default router;
