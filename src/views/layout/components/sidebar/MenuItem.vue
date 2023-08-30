<!--
 * @Author: Yu Peng
 * @Date: 2023-07-28 14:02:50
 * @LastEditTime: 2023-07-28 15:25:48
 * @Description: 菜单子项，递归使用
-->
<template>
	<!-- 菜单列表渲染 -->
	<template v-for="(item, index) in menuList" :key="index">
		<template v-if="item.children && item.children.length > 0">
			<!-- 有子项 -->
			<el-sub-menu :index="item.path">
				<template #title>
					<el-icon v-if="item.meta.icon"><SvgIcon :icon-class="item.meta.icon"></SvgIcon></el-icon>
					<span>{{ item.meta.title }}</span>
				</template>
				<!-- 递归子项 -->
				<menu-item :menu-list="item.children"></menu-item>
			</el-sub-menu>
		</template>
		<template v-else-if="item.component !== undefined">
			<!-- 纯组件页 -->
			<el-menu-item :index="item.path">
				<!-- 子菜单 -->
				<el-icon v-if="item.meta.icon"><SvgIcon :icon-class="item.meta.icon"></SvgIcon></el-icon>
				<template #title>{{ item.meta.title }}</template>
			</el-menu-item>
		</template>
	</template>
</template>
<script lang="ts" setup>
import { AppRoute } from '@/router/types';
//父组件传入变量
const props = defineProps<{
	menuList?: AppRoute[];
}>();

console.log('渲染的菜单项', props.menuList);

//向父组件传递事件
// const emit = defineEmits(['handleClick'])
// const handleClike = () => {
//   emit('handleClick', 'params')
// }
</script>
