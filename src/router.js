import { createRouter, createWebHashHistory } from 'vue-router'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
// 2. 创建路由对象
const router = createRouter({
        history: createWebHashHistory(),
        routes: [
            { path: '/', redirect: '/users', },
            { path: '/users', component: UserList },
            { path: '/users/:id', component: UserDetail, props: true },
        ],
    })
    // 3. 向外共享路由实例对象
export default router