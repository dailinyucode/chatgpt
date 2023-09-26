import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { getToken } from '@/utils/constant';
import { useUserStore } from '@/store/user';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'LoginPage',
        meta: {
            title: '登录',
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('@/pages/login/index.vue')
    },
    {
        path: '/gpt',
        name: 'Gpt',
        meta: {
            title: 'gpt聊天页面',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/gpt/index.vue')
    },
    {
        path: '/blog',
        name: 'BlogPage',
        meta: {
            title: '博客首页',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/blog/index.vue')
    },
    {
        path: '/',
        name: 'Index',
        meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('@/pages/index.vue')
    },
    {
        path: '/vueUse',
        name: 'VueUse',
        meta: {
            title: 'vueUse demo',
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('@/pages/vueUse.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

//添加路由拦截器
router.beforeEach(async (to, from, next) => {
    //判断是否需要认证
    if (to.meta.requireAuth) {
        //查看是否有token
        if (!getToken()) {
            return router.push({
                path: '/login'
            });
        }
        //查看用户信息是否存在 不存在就去加载用户信息
        const userInfo = useUserStore();
        console.log('用户信息：', userInfo.id, userInfo);
        if (!userInfo.id) {
            await userInfo.getUserInfo();
        }
        next();
    } else {
        next();
    }
});
export default router;
