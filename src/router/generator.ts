/*
 * @Author: Yu Peng
 * @Date: 2022-11-24 16:54:28
 * @LastEditTime: 2023-08-24 10:41:14
 * @Description: 生成器，将路由信息转化为 vue-router识别的路径信息和侧边栏菜单信息
 */

import type { RouteRecordRaw } from 'vue-router';
import type { AppRoute, RouterGenerate, BreadcrumbItem, BreadcrumbGenerate, MenuTreeItem, MenuTreeGenerate, MenuGenerate } from './types';

// 全局用户数据仓库
import { useUserStore } from '@/stores/user';

/**
 * @description: 将自定义路由表转化为 vue-router 识别的路由表
 * @param {*} routeList 自定义路由表
 * @return {*}
 */
export const routerGenerate: RouterGenerate = (routeList = []) => {
	return routeList.reduce((prev: RouteRecordRaw[], current: AppRoute) => {
		if (current.meta.externalLink) {
			//如果是外部链接，不进入路由表
			return prev;
		}
		if (current.component) {
			//视图页面
			const currentRoute: RouteRecordRaw = {
				path: current.path,
				name: current.name,
				component: current.component,
				meta: current.meta,
				children: [],
			};
			if (current.alias) {
				currentRoute.alias = current.alias;
			}
			if (current.props) {
				currentRoute.props = current.props;
			}

			//如果存在子节点
			if (current.children && current.children.length > 0) {
				currentRoute.children = routerGenerate(current.children);
			}
			prev.push(currentRoute);
		} else {
			//导航节点，忽略自身节点内容，直接将子节点打入到同级中
			if (current.children && current.children.length > 0) {
				prev.push(...routerGenerate(current.children));
			}
		}
		return prev;
	}, []);
};

/**
 * @description: 将自定义路由表转化为 面包屑字典，{ name: 面包屑路径列表 }
 * @param {*} routeList 自定义路由表
 * @return {*}
 */
export const breadcrumbGenerate: BreadcrumbGenerate = (routeList = []) => {
	const breadcrumbResult: { [name: string]: BreadcrumbItem[] } = {};

	const handleRoute = (appRoute: AppRoute, breadcrumbList: BreadcrumbItem[] = []) => {
		const ownerBreadcrumbList = [...breadcrumbList];
		const BreadcrumbItem: BreadcrumbItem = {
			title: appRoute.meta.title,
			externalLink: appRoute.meta.externalLink,
			name: appRoute.name,
			isComponent: appRoute.component ? true : false,
			query: appRoute.meta.query,
		};
		ownerBreadcrumbList.push(BreadcrumbItem);

		if (appRoute.component) {
			breadcrumbResult[appRoute.name] = ownerBreadcrumbList;
		}
		if (appRoute.children && appRoute.children.length > 0) {
			//还存在子节点
			appRoute.children.forEach((item) => {
				handleRoute(item, ownerBreadcrumbList);
			});
		} else {
			//自身为最终节点，加入到最终字典中
			breadcrumbResult[appRoute.name] = ownerBreadcrumbList;
		}
	};

	routeList.forEach((appRoute) => {
		handleRoute(appRoute, []);
	});

	return breadcrumbResult;
};

/**
 * @description: 将自定义路由表转化为 当前用户权限下 侧边栏菜单
 * @param {*} routeList 自定义路由表
 * @return {*}
 */
export const menuGenerate: MenuGenerate = (routeList = []) => {
	// 全局用户状态仓库
	const userStore = useUserStore();

	// 用户拥有的菜单列表对象
	const menuIdObj = userStore.menuIdObj;

	const getMenuList = (routeList: AppRoute[]) => {
		//返回经过隐藏设置、权限过滤之后的菜单列表
		return routeList.reduce((prev: AppRoute[], current: AppRoute) => {
			//执行隐藏配置
			if (current.meta.hidden) {
				//导航栏中隐藏
				return prev;
			}

			if (current.children && current.children.length > 0) {
				//父节点
				//判断其下的子节点是否有权限
				const routeChildren = [...current.children];
				const hasChild = routeChildren.some((item) => {
					return menuIdObj[String(item.meta.id)];
				});
				if (!hasChild) {
					return prev;
				}
				//进入到子节点数组中
				current.children = getMenuList(routeChildren);
			} else {
				//子节点
				if (!current.meta.ignoreAuth && current.meta.id) {
					//权限过滤
					//权限过滤
					//没有权限访问该菜单
					if (!menuIdObj[String(current.meta.id)]) {
						return prev;
					}
				}
			}

			//将其加入到菜单栏
			prev.push(current);

			return prev;
		}, []);
	};

	return getMenuList(routeList);
};

/**
 * @description: 根据权限列表获取 权限菜单树
 * @param {AppRoute} routeList 菜单列表列表
 * @param {Record} menuIdObj 拥有的权限字典对象
 * @return {*}
 */
export const getMenuTree = (routeList: AppRoute[], menuIdObj: Record<string, boolean>) => {
	//菜单权限树

	//返回经过隐藏设置、权限过滤之后的菜单列表
	return routeList.reduce((prev: MenuTreeItem[], current: AppRoute) => {
		//执行隐藏配置
		if (current.meta.hidden) {
			//导航栏中隐藏
			return prev;
		}

		const treeItem: MenuTreeItem = {
			id: current.meta.id || 0,
			label: current.meta.title,
		};

		if (current.children && current.children.length > 0) {
			//父节点
			//判断其下的子节点是否有权限
			const routeChildren = [...current.children];
			const hasChild = routeChildren.some((item) => {
				return menuIdObj[String(item.meta.id)];
			});
			if (!hasChild) {
				return prev;
			}
			//进入到子节点数组中
			treeItem.children = getMenuTree(routeChildren, menuIdObj);
		} else {
			//子节点
			if (!current.meta.ignoreAuth && current.meta.id) {
				//权限过滤
				//权限过滤
				//没有权限访问该菜单
				if (!menuIdObj[String(current.meta.id)]) {
					return prev;
				}
			}
		}

		//将其加入到菜单栏
		prev.push(treeItem);

		return prev;
	}, []);
};

/**
 * @description: 获取当前用户权限下的菜单权限树
 * @param {*} routeList 输入的菜单栏
 * @return {*}
 */
export const menuTreeGenerate: MenuTreeGenerate = (routeList = []) => {
	// 全局用户状态仓库
	const userStore = useUserStore();

	// 用户拥有的菜单列表对象
	const menuIdObj = userStore.menuIdObj;

	//获取可分配的菜单权限
	return getMenuTree(routeList, menuIdObj);
};
