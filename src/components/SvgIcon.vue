<!--
 * @Author: Yu Peng
 * @Date: 2023-07-28 11:02:08
 * @LastEditTime: 2023-07-28 11:31:44
 * @Description: 自定义图标通用组件，注意：如果需要更改图标颜色需要将下载的每个.svg图标中path路径里所有的“fill='*****(颜色值)'”直接删除，传参绑定color即可，如上
-->

<template>
	<svg aria-hidden="true" class="svg-icon" :style="`width:${size};height:${size}`">
		<use :xlink:href="symbolId" :fill="color" />
	</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	prefix: {
		type: String,
		default: 'icon',
	},
	iconClass: {
		type: String,
		default: '',
	},
	color: {
		type: String,
		default: '',
	},
	size: {
		type: String,
		default: '16px',
	},
});

const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`);
</script>

<style lang="less" scoped>
.svg-icon {
	fill: currentColor; //currentColor变量表示当前图标color值
}
</style>
