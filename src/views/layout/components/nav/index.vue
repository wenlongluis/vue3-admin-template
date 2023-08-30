<template>
	<!-- 顶部导航条 -->
	<div class="nav-container">
		<!-- 顶部内容区 -->
		<div class="content-box">
			<img src="/logo.png" alt="" class="logo" />
			<h1 class="title">{{ COMMON_TITLE }}</h1>
		</div>

		<!-- 用户操作区 -->
		<el-dropdown class="user-box">
			<span>
				<div class="user-info">
					<!-- 头像 -->
					<img class="avatar" src="/avatar.png" alt="头像" />
					<div class="user-text">
						<span class="nick-name">云堤古天乐</span>
						<span class="user-desc">南京市国海区风江路</span>
					</div>
					<el-icon class="el-icon-right">
						<arrow-down />
					</el-icon>
				</div>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item :icon="User" disabled>身份：{{ userStore.user.roleName || '未知' }}</el-dropdown-item>
					<el-dropdown-item :icon="SwitchButton" @click="handleLayout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup lang="ts">
import { ArrowDown, User, SwitchButton } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@stores/user';

//路由对象
const router = useRouter();
//用户对象仓库
const userStore = useUserStore();

//导航栏标题
const COMMON_TITLE = import.meta.env.VITE_APP_TITLE;

/**
 * @description: 退出登录，跳转到登录页
 * @param {*} key
 * @return {*}
 */
const handleLayout = () => {
	//清空用户信息
	userStore.clearUserInfo();
	//跳转到登录页
	router.push({ name: 'login' });
};
</script>

<style lang="less" scoped>
.nav-container {
	width: 100%;
	height: 100%;
	display: flex;
	padding: 0 16px;

	.content-box {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;

		.logo {
			width: 102px;
			display: inline-block;
		}

		.title {
			display: inline-block;
			font-family: 'PingFang SC Medium', 'Helvetica Neue', Helvetica, 'Microsoft YaHei', Arial, 'Hiragino Sans GB';
			font-size: 18px;
			line-height: 28px;
			font-weight: bold;
			margin: 0 24px;
		}
	}

	.user-box {
		margin-right: 26px;
		max-width: 200px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		.user-info {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			overflow: hidden;
			// justify-content: center;
			.avatar {
				display: block;
				width: 24px;
				height: 24px;
				border-radius: 50%;
				margin-right: 8px;
			}

			.user-text {
				width: 60px;
				height: 30px;
				margin-right: 8px;
				font-size: 12px;
			}

			.nick-name {
				// height: 50%;
				width: 100%;
				line-height: 12px;
				display: inline-block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 4px;
				font-weight: bold;
				color: #262626;
			}

			.user-desc {
				// height: 50%;
				width: 100%;
				line-height: 12px;
				display: inline-block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: var(--el-text-color-regular);
			}
		}
	}
}
</style>
