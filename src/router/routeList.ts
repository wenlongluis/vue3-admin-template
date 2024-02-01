import NotFound from "@/views/NotFound/index.vue";
import Login from '@/views/Login/index.vue'
import Layout from "@/views/Layout/index.vue";
import HomeView from "@/views/HomeView.vue";
import type { RouteRecordRaw } from "vue-router";

const StaticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
      ignoreAuth: true,
    },
  },
  {
    // 404页面配置，将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
    meta: {
      title: '404',
      hidden: true,
      ignoreAuth: true,
    },
  },
]


const ConsoleRoutes: RouteRecordRaw[] = [
  {
    path: '/console',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      }
    ]
  },
]

const routes: RouteRecordRaw[] = [
  ...ConsoleRoutes,
  ...StaticRoutes
]

export default routes
