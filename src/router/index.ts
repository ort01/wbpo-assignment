import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/notes/:id',
            name: 'details',
            component: () => import('../views/DetailsView.vue'),
            props: true
        },
    ]
})

export default router