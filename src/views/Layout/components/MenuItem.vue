<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";

const props = defineProps<{
  menuList?: RouteRecordRaw[];
}>();
</script>

<template>
  <!-- 菜单列表渲染 -->
  <template v-for="(item, index) in menuList" :key="index">
    <template v-if="item.children && item.children.length > 0">
      <!-- 有子项 -->
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon v-if="item.meta!.icon"><SvgIcon :icon-class="item.meta!.icon"></SvgIcon></el-icon>
          <span>{{ item.meta!.title }}</span>
        </template>
        <!-- 递归子项 -->
        <menu-item :menu-list="item.children"></menu-item>
      </el-sub-menu>
    </template>
    <template v-else-if="item.component !== undefined">
      <!-- 纯组件页 -->
      <el-menu-item :index="item.path">
        <!-- 子菜单 -->
        <el-icon v-if="item.meta!.icon"><SvgIcon :icon-class="item.meta!.icon"></SvgIcon></el-icon>
        <template #title>{{ item.meta!.title }}</template>
      </el-menu-item>
    </template>
  </template>
</template>

<style scoped>

</style>
