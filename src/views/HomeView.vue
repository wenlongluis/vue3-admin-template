<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
const size = 'small'
const color = '#000'
</script>

<template>
  <main>
    <el-button>click me</el-button>
    <el-icon :size="size" :color="color">
      <IconEpPlus />
    </el-icon>
    <el-icon>
      <icon-ep-aim />
    </el-icon>
    <TheWelcome />
  </main>
</template>
