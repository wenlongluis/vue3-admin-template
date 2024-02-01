<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :lang="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<style scoped>
</style>
