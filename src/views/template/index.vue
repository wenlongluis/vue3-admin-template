<!--
 * @Author: Yu Peng
 * @Date: 2023-08-02 11:11:01
 * @LastEditTime: 2023-08-24 16:04:22
 * @Description: 基础模板（包含标签页）
-->

<template>
	<div class="view-container">
		<!-- 页面标题 -->
		<h1 class="page-title">页面标题</h1>
		<!-- 标签栏 -->
		<el-tabs v-model="activeName" class="page-tabs" @tab-click="handleCheckTab">
			<el-tab-pane class="page-tabs-pane" label="标签一" name="foo"><Foo /></el-tab-pane>
			<el-tab-pane class="page-tabs-pane" label="标签二" name="bar"> <Bar /> </el-tab-pane>
			<el-tab-pane class="page-tabs-pane" label="标签三" name="baz"><Baz /></el-tab-pane>
		</el-tabs>

		<!-- 直接内容区（没有标签栏） -->
		<!-- <div class="page-content">内容区</div> -->
	</div>
</template>
<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus';
import Foo from './foo/index.vue';
import Bar from './bar/index.vue';
import Baz from './baz/index.vue';

//默认tab选项
const activeName = ref('foo');

/**
 * @description: 切换tab页面事件
 * @param {*} tab
 * @param {*} event
 * @return {*}
 */
const handleCheckTab = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};
</script>
<style lang="less" scoped>
//导入全局变量
@import '@style/variables.module.less';

.view-container {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;

	.page-title {
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-weight: bold;
		font-size: 16px;
		padding: 0 @common_content_padding;
		display: inline-block;
		background-color: @common_nav_backgoundColor;
	}

	.page-tabs {
		width: 100%;
		//内容区域高度为 容器高度-(标题栏+标签栏高度)
		height: calc(100% - @common_content_top_height);
		//控制tab切换调颜色
		--el-border-color-light: @common_nav_backgoundColor;

		.page-tabs-pane {
			width: 100%;
			height: 100%;
		}
	}

	//控制tab导航条样式
	.page-tabs :deep(.el-tabs__nav-wrap) {
		padding: 0 @common_content_padding;
		background-color: @common_nav_backgoundColor;
	}
	.page-tabs :deep(.el-tabs__item) {
		font-weight: 500;
	}

	.page-tabs :deep(.el-tabs__content) {
		width: 100%;
		height: 100%;
		overflow: auto;
		padding: 0 @common_content_padding @common_content_padding @common_content_padding;
		background-color: @common_backgoundColor;
		box-sizing: border-box;
	}

	.page-content {
		padding: @common_content_padding;
		width: 100%;
	}
}
</style>
