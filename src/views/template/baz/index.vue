<!--
 * @Author: Yu Peng
 * @Date: 2023-08-02 15:25:49
 * @LastEditTime: 2023-08-04 11:15:59
 * @Description:
-->
<template>
	<div class="container">
		<h1>Baz页面</h1>
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
}
</style>
