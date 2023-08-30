/*
 * @Author: Yu Peng
 * @Date: 2022-12-11 11:24:08
 * @LastEditTime: 2023-08-24 11:29:24
 * @Description: 用户全局仓库
 */
import { defineStore } from 'pinia';
import type { User } from '@/api/types';


//默认用户对象
// const defaultUser: User = {
// 	id: -1,
// 	token: '',
// 	nickName: '',
// 	avatar: '',
// 	roleName: '',
// 	menuIdList: [],
// };

// 测试时，建议打开此项，方便穿越权限拦截
const defaultUser: User = {
	id: 51,
	token: 'Jafizo30ifn3=8fe202di81hn2d9ty',
	nickName: '用户abc',
	avatar: '',
	roleName: '超级管理员',
	menuIdList: [10, 20, 31, 32, 33, 40, 50, 61, 62, 63],
};

//定义并导出全局状体容器
export const useUserStore = defineStore('user', {
	/**
	 * 全局状态对象
	 */
	state: () => {
		return {
			user: defaultUser as User,
		};
	},

	/**
	 * 获取器，类似于计算属性，用来获取一个或多个状态的封装数据，具有缓存功能
	 */
	getters: {
		// 使用传参写法，自动类型推导（推荐）
		// 菜单id字典对象，用于做权限过滤
		menuIdObj(state) {
			return state.user.menuIdList.reduce((prev: Record<string, boolean>, cur) => {
				prev[String(cur)] = true;
				return prev;
			}, {});
		},
	},

	/*
	 * 全局状态处理函数，主要用于逻辑复用操作，支持同步和异步修改全局状态
	 */
	actions: {
		/**
		 * @description: 清空用户信息
		 * @return {*}
		 */
		clearUserInfo() {
			this.user = { ...defaultUser };
		},
	},
});
