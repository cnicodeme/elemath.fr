import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    {
        path: '/cp/suite-de-nombres/',
        name: 'cp-suite-de-nombres',
        component: () => import('@/views/cp/SuiteNombres')
    },
    {
        path: '/cp/suite-et-nombres/:range/:quantity',
        name: 'cp-suite-et-nombres-params',
        component: () => import('@/views/cp/SuiteNombres')
    },
    {
        path: '/cp/chiffres-et-nombres/',
        name: 'cp-chiffres-et-nombres',
        component: () => import('@/views/cp/ChiffresEtNombres')
    },
    {
        path: '/cp/chiffres-et-nombres/:range/:quantity',
        name: 'cp-chiffres-et-nombres-params',
        component: () => import('@/views/cp/ChiffresEtNombres')
    },
    {
        path: '/cp/lettres-vers-nombres/',
        name: 'cp-lettres-vers-nombres',
        component: () => import('@/views/cp/LettresVersNombre')
    },
    {
        path: '/cp/lettres-vers-nombres/:range/:quantity',
        name: 'cp-lettres-vers-nombres-params',
        component: () => import('@/views/cp/LettresVersNombre')
    },
    {
        path: '/cp/nombres-avant-apres/',
        name: 'cp-nombres-avant-apres',
        component: () => import('@/views/cp/NombresAvantApres')
    },
    {
        path: '/cp/nombres-avant-apres/:range/:quantity',
        name: 'cp-nombres-avant-apres-params',
        component: () => import('@/views/cp/NombresAvantApres')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
