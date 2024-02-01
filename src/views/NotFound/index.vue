<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter()

function goHome() {
  router.push('/console')
}
</script>

<template>
  <el-result class="not-found-wrapper" title="404" sub-title="页面不存在" icon="warning">
<!--    <template #icon>-->
<!--      <el-image-->
<!--        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"-->
<!--      />-->
<!--    </template>-->
    <template #extra>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </template>
  </el-result>
</template>

<style scoped>
.not-found-wrapper {
  height: 100vh;
}
</style>
