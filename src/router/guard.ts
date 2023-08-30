import type { Router } from 'vue-router';
import { useUserStore } from '@/stores/user';

/**
 * @description: 全局前置路由导航守卫
 * @param {Router} router
 * @return {*}
 */
export const createRouterGuard = (router: Router) => {
	router.beforeEach((to) => {
		//获取全局用户
		const userStore = useUserStore();

		if (!userStore.user.token && to.name !== 'login' && to.name !== 'notfound') {
			//未登录，需要跳转到登录页
			return { name: 'login' };
		}

		// 用户拥有的菜单列表对象
		const menuIdObj = userStore.menuIdObj;

		// 权限检查
		// 注意：会合并父级到子集的所有meta，从父级向下检查每一层
		if (to.matched) {
			for (const routeItem of to.matched) {
				if (!routeItem.meta.ignoreAuth && routeItem.meta.id) {
					if (!routeItem.meta || !menuIdObj[String(routeItem.meta.id)]) {
						// alert('当前用户身份无法查看，请重新登录');
						//没有权限查看，需要跳转到登录页
						return { name: 'login' };
					}
				}
			}
		}
	});
};
