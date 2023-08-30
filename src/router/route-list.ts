/*
 * @Author: Yu Peng
 * @Date: 2022-11-25 18:23:03
 * @LastEditTime: 2023-08-24 11:13:25
 * @Description: 自定义路由表，用于转化为vue-router路由和侧边栏菜单
 */

//引用的图标
// import { PersonOutline, ClipboardOutline, RadioOutline, ListOutline, PieChartOutline } from '@vicons/ionicons5';
import type { AppRoute } from './types';

//主页
const Home = () => import('@/views/layout/index.vue');

//登录页
const Login = () => import('@/views/login/index.vue');

/* ---菜单列表--- */
//中国
const China = () => import('@/views/country/china.vue');
//美国
const Usa = () => import('@/views/country/usa.vue');
//日本
const Japan = () => import('@/views/country/japan.vue');

/* ---用户页面--- */
//用户管理
const User = () => import('@/views/user/user.vue');

/* ---图表实例--- */
//折线图
const Line = () => import('@/views/chart/line.vue');
//折线图
const Bar = () => import('@/views/chart/bar.vue');
//折线图
const Pie = () => import('@/views/chart/pie.vue');

//广告数据
const NotFound = () => import('@/views/not-found/index.vue');

/* ---表格展示--- */
//订单管理
const Table = () => import('@/views/table/table.vue');

/* ---模板--- */
const Template = () => import('@/views/template/index.vue');

/* ---管理页面--- */
const Manage = () => import('@/views/manage/index.vue');

//输出当前路由
export const currentPath = '/dashboard';

//全局自定义路由信息表
export const routeList: AppRoute[] = [
	{
		path: '/',
		name: 'home',
		alias: '/home',
		component: Home,
		meta: {
			title: '首页',
			hidden: false,
			ignoreAuth: true,
		},
		children: [
			{
				//系统表盘
				path: '/dashboard',
				name: 'dashboard',
				component: Template,
				meta: {
					title: '基础模板',
					icon: 'dashboard',
					hidden: false,
					ignoreAuth: false,
					id: 10,
				},
			},
			{
				//表格示例
				path: '/table',
				name: 'table',
				component: Table,
				meta: {
					title: '表格示例',
					//图标，对应src/icon/*.svg
					icon: 'work',
					//隐藏
					hidden: false,
					//是否忽略验证
					ignoreAuth: false,
					//菜单id
					id: 20,
				},
			},
			{
				//标题展示
				path: '/country',
				name: 'country',
				meta: {
					title: '标题',
					icon: 'asset',
					hidden: false,
					//是否忽略验证
					ignoreAuth: false,
					//菜单id
					id: 30,
				},
				children: [
					{
						//人员管理页面
						path: '/country/china',
						name: 'country_china',
						component: China,
						meta: {
							title: '中国',
							hidden: false,
							//是否忽略验证
							ignoreAuth: false,
							//菜单id
							id: 31,
						},
					},
					{
						//权限管理页面
						path: '/country/usa',
						name: 'country_usa',
						component: Usa,
						meta: {
							title: '美国',
							hidden: false,
							//是否忽略验证
							ignoreAuth: false,
							//菜单id
							id: 32,
						},
					},
					{
						//权限管理页面
						path: '/contry/japan',
						name: 'contry_japan',
						component: Japan,
						meta: {
							title: '日本',
							hidden: false,
							//是否忽略验证
							ignoreAuth: false,
							//菜单id
							id: 33,
						},
					},
				],
			},
			{
				//风险列表
				path: '/user',
				name: 'user',
				component: User,
				meta: {
					title: '用户管理',
					icon: 'risk',
					hidden: false,
					//是否忽略验证
					ignoreAuth: false,
					//菜单id
					id: 40,
				},
			},
			{
				//报告列表
				path: '/manage',
				name: 'manage',
				component: Manage,
				meta: {
					title: '管理页面',
					icon: 'report',
					hidden: false,
					//是否忽略验证
					ignoreAuth: false,
					//菜单id
					id: 50,
				},
			},
			{
				//系统管理
				path: '/chart',
				name: 'chart',
				meta: {
					title: '图表展示',
					icon: 'set',
					hidden: false,
					//是否忽略验证
					ignoreAuth: false,
					//菜单id
					id: 60,
				},
				children: [
					{
						//纳管配置
						path: '/chart/bar',
						name: 'chart_bar',
						component: Bar,
						meta: {
							title: '柱状图',
							hidden: false,
							//是否忽略验证
							ignoreAuth: false,
							//菜单id
							id: 61,
						},
					},
					{
						//漏扫任务
						path: '/chart/line',
						name: 'chart_line',
						component: Line,
						meta: {
							title: '折线图',
							hidden: false,
							//是否忽略验证
							ignoreAuth: false,
							//菜单id
							id: 62,
						},
					},
					{
						//漏扫任务
						path: '/chart/pie',
						name: 'chart_pie',
						component: Pie,
						meta: {
							title: '饼状图',
							hidden: false,
							//是否忽略验证
							ignoreAuth: false,
							//菜单id
							id: 63,
						},
					},
				],
			},
		],
	},
	{
		//登录页
		path: '/login',
		name: 'login',
		component: Login,
		props: true,
		meta: {
			title: '登录页',
			hidden: true,
			ignoreAuth: true,
		},
		children: [],
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
];
