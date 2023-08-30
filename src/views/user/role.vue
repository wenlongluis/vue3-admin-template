<!--
 * @Author: Yu Peng
 * @Date: 2022-12-11 11:24:08
 * @LastEditTime: 2023-07-28 10:24:08
 * @Description: 
-->
<template>
	<div class="use-box">
		<h1>用户管理-权限管理</h1>
		<el-button type="primary"> Primary </el-button>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const internalInstance = getCurrentInstance();
console.log(internalInstance?.appContext.config.globalProperties.$http);

onMounted(() => {
	console.log('route', route);
});
</script>
