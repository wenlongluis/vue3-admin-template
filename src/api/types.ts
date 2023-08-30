/*
 * @Author: Yu Peng
 * @Date: 2023-08-18 16:14:29
 * @LastEditTime: 2023-08-22 15:30:32
 * @Description: 用户全局仓库类型
 */
export interface ResData {
	code: number;
	msg: string;
	data: {
		[key: string]: any;
	};
}

//用户类型数据
export interface User {
	// 用户id
	id: number;
	// 登录token
	token: string;
	// 用户昵称
	nickName: string;
	//头像地址
	avatar?: string;
	//角色名称
	roleName: string;
	//菜单id列表
	menuIdList: number[];
}

/**
 * @description: 登录函数
 * @return {*}
 */
export interface Login {
	(userInfo: { name: string; pwd: string }): Promise<User | null>;
}

export interface IPageResult<T> {
	list: T[];
	total: number;
}
