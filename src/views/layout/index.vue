<template>
	<div class="layout-container">
		<!-- 顶部导航栏 -->
		<div class="nav-box">
			<navbar />
		</div>

		<!-- 主页面区 -->
		<div class="main-box">
			<!-- 侧边栏 -->
			<div class="sidebar-box">
				<sidebar />
			</div>
			<!-- 视图容器 -->
			<div class="content-box">
				<!-- 视图区 -->
				<div class="view-box">
					<router-view v-slot="{ Component }">
						<!-- 增加过渡动画 -->
						<transition name="fade" mode="out-in">
							<component :is="Component" />
						</transition>
					</router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Sidebar from './components/sidebar/index.vue';
import navbar from './components/nav/index.vue';

onMounted(() => {
	// console.log('css modules', variables);
});
</script>

<style lang="css">
body,
#app {
	width: 100%;
	height: 100%;
}
/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>

<style lang="less" scoped>
//导入全局变量

// 文字颜色
@common_backgoundColor : #F3F4F7;
@common_text_color : #262626;
// 页面最小宽度
@common_min_width:800px;
// 页面最小高度
@common_min_height:600px;
// 侧边栏背景
@common_sidebar_backgoundColor : #FFFFFF;
// 侧边栏宽度
@common_sidebar_width: 200px;
// 顶部导航栏
@common_nav_backgoundColor : #FFFFFF;
// 顶部导航栏高度
@common_nav_height:48px;
// 主页面视图容器
@common_view_backgoundColor : #F3F4F7;
// 分割线颜色
@common_splitline_color : #E6EAEF;
// 内容区页面边距
@common_content_padding: 16px;
// 标题和标签占用高度
@common_content_top_height: 95px;

.layout-container {
	width: 100%;
	height: 100%;
	min-width: 800px;
	min-height: 600px;
	position: relative;
	overflow: hidden;
	display: flex;
	background-color: @common_backgoundColor;
	flex-direction: column;

	.nav-box {
		width: 100%;
		height: @common_nav_height;
		background-color: @common_nav_backgoundColor;
		border-bottom: 2px solid @common_splitline_color;
	}

	.main-box {
		flex: 1;
		box-sizing: border-box;
		display: flex;
		// flex-direction: column;
		overflow: hidden;

		.sidebar-box {
			height: 100%;
			overflow: hidden;
			background-color: @common_sidebar_backgoundColor;
			position: relative;
			border-right: 2px solid @common_splitline_color;
		}

		.content-box {
			box-sizing: border-box;
			width: 100%;
			flex: 1;
			overflow: hidden;

			// pointer-events: none;
			// position: relative;

			.view-box {
				// color: #333;
				width: 100%;
				height: 100%;
				position: relative;
				background-color: @common_view_backgoundColor;
				overflow: auto;
			}
		}
	}
}
</style>
