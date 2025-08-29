import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// import pages
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
