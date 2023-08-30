import { ITableBase, ISearchBase } from './common';

// 用户输入表单字段
export interface IForm {
	id?: number | null;
	ip: string; // ip
	notes: string; // 备注
}

// 用户输入 + 系统生成字段
export interface ITableItem extends IForm, ITableBase {
	status: number; // 状态
	ip_version: number; // ip 类型
	country: string; // 国家
	province: string; // 省份
	city: string; // 城市
	asset_group_ids: number[]; // 资源组
	owner_ids: number[]; // 责任人
	device_type: number; // 设备类型
	service_num: number; // 服务数量
	domain_num: number; // 域名数量
	site_num: number; // 站点数量
	discovery_at: number; // 站点数量
}

// 用户搜索字段
export interface ISearchParams extends ISearchBase {
	ip: string;
	source: number | null;
	status: number | null;
	ip_version: number | null;
	device_type: number | null;
	country: string;
	province: string;
	city: string;
	asset_group_id: number | null;
	owner_id: number | null;
	updated_at_start: number | null;
	updated_at_end: number | null;
}
