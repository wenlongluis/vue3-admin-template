<!--
 * @Author: Yu Peng
 * @Date: 2023-08-02 15:25:41
 * @LastEditTime: 2023-08-24 16:41:17
 * @Description:
-->
<template>
	<div class="container">
		<h1 v-for="(item, index) of Array.from({ length: 10 })" :key="index">Bar页面</h1>
		<!-- <p>count：{{ props.count }}</p>
    <button @click="handleClike">向父组件传值</button> -->
	</div>
</template>
<script lang="ts" setup>
//父组件传入变量
// const props = defineProps<{
//   count?: number
// }>()

//向父组件传递事件
// const emit = defineEmits(['handleClick'])
// const handleClike = () => {
//   emit('handleClick', 'params')
// }
</script>
<style lang="less" scoped>
//导入全局变量
.container {
	width: 100%;
	position: relative;
	background-color: #fff;

	h1 {
		height: 25vh;
	}
}
</style>
