<script setup lang="ts">
const COMMON_TITLE = '通用管理平台'
</script>

<template>
  <div class="header-container">
    <div class="content-box">
      <img src="@/assets/logo.svg" alt="" class="logo" />
      <h1 class="title">{{ COMMON_TITLE }}</h1>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  line-height: 60px;

  .content-box {
    width: 350px;
    display: flex;
  }

  .logo {
    width: 100px;
  }

  .title {
    flex: 1;
    font-size: 20px;
  }
}
</style>
