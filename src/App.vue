<script setup lang="ts">
//组件内容国际化：中文
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>

<template>
  <!-- UI全局配置 -->
  <el-config-provider :locale="zhCn">
    <!-- 容器 -->
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
