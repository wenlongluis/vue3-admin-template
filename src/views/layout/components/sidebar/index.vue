<template>
	<div class="sidebar-container" :class="isCollapse ? 'sidebar-container-collapsed' : ''">
		<!-- 菜单栏导航区域 -->
		<div class="menu-box">
			<!-- 菜单栏内容组件 -->
			<el-menu :default-active="defaultActive" class="menu" :collapse="isCollapse" :router="true" :collapse-transition="false">
				<!-- 菜单子项，组件内部递归 -->
				<menu-item :menu-list="menuList"></menu-item>
			</el-menu>
		</div>

		<!-- 底部操作区域 -->
		<div class="bottom-box" :class="isCollapse ? 'bottom-box-closed' : ''" @click="handleCollapse">
			<el-text>
				<el-icon class="bottom-icon">
					<svg-icon icon-class="menu_close"></svg-icon>
				</el-icon>
				<span class="bottom-text">收起菜单</span>
			</el-text>
		</div>
	</div>
</template>
<script lang="ts" setup>
import type { AppRoute } from '@/router/types';
import { routeList } from '@/router/route-list';
import SvgIcon from '@/components/SvgIcon.vue';
import MenuItem from './MenuItem.vue';
//菜单生成函数
import { menuGenerate } from '@/router/generator';
import { useRoute } from "vue-router";

//菜单选择项的key（在本系统中默认路由表的path值）
const route = useRoute();
const defaultActive = route.path;

//菜单是否折叠
const isCollapse = ref(false);

//初始化菜单栏选项
const menuList: AppRoute[] = menuGenerate(routeList[0].children || []);

/**
 * @description: 折叠和打开菜单栏
 * @return {*}
 */
const handleCollapse = () => {
	isCollapse.value = !isCollapse.value;
};
</script>

<style lang="less">
//element plus 基础样式
:root {
	--el-menu-item-height: 48px;
}
</style>

<style lang="less" scoped>
@common_sidebar_width: 200px;
@common_splitline_color : #E6EAEF;

.sidebar-container {
	width: @common_sidebar_width;
	height: 100%;
	display: flex;
	flex-direction: column;
	transition: width 0.2s ease 0s;
	box-sizing: border-box;

	.menu-box {
		flex: 1;
		width: 100%;
		box-sizing: border-box;
		overflow: auto;
	}

	//深度作用选择器，深入到element plus UI
	.menu-box :deep(.el-menu) {
		border-right: none;
	}

	//标题加粗
	// .menu-box :deep(.el-menu .el-sub-menu__title) {
	// 	font-weight: 500;
	// }
	// .menu-box :deep(.el-menu .el-menu-item) {
	// 	font-weight: 500;
	// }

	.bottom-box {
		width: @common_sidebar_width;
		height: 56px;
		border-top: 2px solid @common_splitline_color;
		display: flex;
		align-items: center;
		color: #000;
		cursor: pointer;
		background: url('/menu_bg.png') 100% 100% / contain no-repeat;

		.bottom-icon {
			margin-left: 20px;
			margin-right: 8px;
			transition: transform 0.3s ease 0s;
		}
	}

	//侧边栏收起，底部样式
	.bottom-box-closed {
		.bottom-icon {
			transform: rotate(180deg);
		}

		.bottom-text {
			visibility: hidden;
		}
	}
}

.sidebar-container-collapsed {
	width: 68px;
}
</style>
