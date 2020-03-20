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
        path: '/cp/',
        component: () => import('@/views/cp/Main'),
        children: [
            {
                path: 'suite-de-nombres/',
                name: 'cp-suite-de-nombres',
                meta: {
                    title: 'Suite de nombres'
                },
                component: () => import('@/views/cp/SuiteNombres')
            },
            {
                path: 'suite-de-nombres/:range/:quantity',
                name: 'cp-suite-de-nombres-params',
                meta: {
                    title: 'Suite de nombres'
                },
                component: () => import('@/views/cp/SuiteNombres')
            },
            {
                path: 'chiffres-et-nombres/',
                name: 'cp-chiffres-et-nombres',
                meta: {
                    title: 'Chiffres et nombres'
                },
                component: () => import('@/views/cp/ChiffresEtNombres')
            },
            {
                path: 'chiffres-et-nombres/:range/:quantity',
                name: 'cp-chiffres-et-nombres-params',
                meta: {
                    title: 'Chiffres et nombres'
                },
                component: () => import('@/views/cp/ChiffresEtNombres')
            },
            {
                path: 'lettres-vers-nombres/',
                name: 'cp-lettres-vers-nombres',
                meta: {
                    title: 'Lettres vers nombres'
                },
                component: () => import('@/views/cp/LettresVersNombre')
            },
            {
                path: 'lettres-vers-nombres/:range/:quantity',
                name: 'cp-lettres-vers-nombres-params',
                meta: {
                    title: 'Lettres vers nombres'
                },
                component: () => import('@/views/cp/LettresVersNombre')
            },
            {
                path: 'nombres-avant-apres/',
                name: 'cp-nombres-avant-apres',
                meta: {
                    title: 'Nombres avant/après'
                },
                component: () => import('@/views/cp/NombresAvantApres')
            },
            {
                path: 'nombres-avant-apres/:range/:quantity',
                name: 'cp-nombres-avant-apres-params',
                meta: {
                    title: 'Nombres avant/après'
                },
                component: () => import('@/views/cp/NombresAvantApres')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
