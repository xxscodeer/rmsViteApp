import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router';
import login from '../components/login.vue'
import home from '../components/home.vue'


const routerList:Array<RouteRecordRaw>= [
    {path:"/login",name:"login",component:login},
    {path:"/",redirect:"/login"},
    {path:"/home",name:"home",component:home}
]

const router=createRouter({
    history:createWebHistory(),
    routes:routerList
})
export default router;