import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'
import { routeList } from './route-list';
import { routerGenerate } from './generator';
// import { createRouterGuard } from './guard';

export const routes: RouteRecordRaw[] = routerGenerate(routeList)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

//设置路由守卫
// createRouterGuard(router);

export default router
