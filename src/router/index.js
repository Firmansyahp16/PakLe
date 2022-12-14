import Landing from '../components/Landing.vue'
import Home from '../components/Home.vue'
import LogSign from '../components/LogSign.vue'
import Control from '../components/Control.vue'
import Pakan from '../components/Pakan.vue'
import Suhu from '../components/Suhu.vue'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '',
        component: Landing
    },
    {
        path: '/Home',
        component: Home
    },
    {
        path: '/LogSign',
        component: LogSign
    },
    {
        path: '/Control',
        component: Control
    },
    {
        path: '/Pakan',
        component: Pakan
    },
    {
        path: '/Suhu',
        component: Suhu
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router