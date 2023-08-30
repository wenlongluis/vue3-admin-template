<!--
 * @Author: Yu Peng
 * @Date: 2022-12-11 11:24:08
 * @LastEditTime: 2023-08-03 18:03:57
 * @Description: 404页面
-->
<template>
	<div class="notfund-container">
		<h1 class="title">404 页面走丢了</h1>
		<p class="desc">
			<el-button type="primary" @click="goMain"> 返回首页 </el-button>
		</p>
	</div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 * @description: 返回首页
 * @param {*}
 * @return {*}
 */
const goMain = () => {
	router.push({
		name: 'dashboard',
	});
};
</script>
<style lang="less" scoped>
.notfund-container {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	.title {
		font-size: 24px;
		margin-bottom: 10px;
	}

	.desc {
		margin-bottom: 60px;
	}
}
</style>
