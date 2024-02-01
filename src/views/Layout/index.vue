<script setup lang="ts">
import Header from "@/views/Layout/components/Header.vue";
import SideBar from "@/views/Layout/components/SideBar.vue";

</script>

<template>
  <el-container class="layout-container">
    <el-header class="header">
      <Header />
    </el-header>
    <el-container>
      <el-aside class="layout-side" width="200px">
        <SideBar />
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}
.header {
  --el-header-padding: 0;
  border-bottom: 1px solid #e1e1e1;
}
.layout-side {
  border-right: 1px solid var(--el-border-color);
}
</style>
