import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '@/store/auth'

import childrenAutoresRouter from '@/modules/autores/router'
import childrenEditorialesRouter from '@/modules/editoriales/router'
import childrenLibrosRouter from '@/modules/libros/router'

const routes = [
    {
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
        meta: {
            title: 'Login',
            auth: false
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: {
            title: 'Home',
            auth: true
        }
    },
    {
        path: '/autores',
        component: () => import(/* webpackChunkName: "autores" */ '@/views/Autores.vue'),
        children: [
            ...childrenAutoresRouter
        ]
    },
    {
        path: '/editoriales',
        component: () => import(/* webpackChunkName: "editoriales" */ '@/views/Editoriales.vue'),
        children: [
            ...childrenEditorialesRouter
        ]
    },
    {
        path: '/libros',
        component: () => import(/* webpackChunkName: "libros" */ '@/views/Libros.vue'),
        children: [
            ...childrenLibrosRouter
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    let { title } = to.meta

    document.title = title

    if (to.matched.some(record => record.meta.auth)) {
        if (!authStore.loggedIn) {
            next({ path: '/login' });
        } else {
            next();
        }
    } else if (to.matched.some(record => !record.meta.auth)) {
        if (!authStore.loggedIn) {
            next();
        } else {
            document.title = title;
            next({ path: '/home' });
        }
    }

})

export default router