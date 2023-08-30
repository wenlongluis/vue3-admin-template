<!--
 * @Author: Yu Peng
 * @Date: 2023-08-02 11:11:01
 * @LastEditTime: 2023-08-24 11:12:58
 * @Description: 管理页面（包含标签页）
-->

<template>
	<div class="view-container">
		<!-- 页面标题 -->
		<h1 class="page-title">管理页面</h1>
		<!-- 标签栏 -->
		<el-tabs v-model="activeName" class="page-tabs">
			<el-tab-pane class="page-tabs-pane" label="资产组" name="asset">
				<!-- 纳管配置 资产组 -->
				<Asset />
			</el-tab-pane>
			<el-tab-pane class="page-tabs-pane" label="责任人" name="person">
				<!-- 纳管配置 责任人 -->
				<Person />
			</el-tab-pane>
		</el-tabs>

		<!-- 直接内容区（没有标签栏） -->
		<!-- <div class="page-content">内容区</div> -->
	</div>
</template>
<script lang="ts" setup>
import Asset from './asset-group/index.vue';
import Person from './person/index.vue';
//当前tab选项
const activeName = ref('asset');
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
		display: block;
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
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		overflow: auto;
		padding: 0 @common_content_padding @common_content_padding @common_content_padding;
		background-color: @common_backgoundColor;
	}

	// .page-content {
	// 	padding: @common_content_padding;
	// 	width: 100%;
	// }
}
</style>
