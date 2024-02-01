<script setup lang="ts">

</script>

<template>
  <div>
    <el-menu
      default-active="1-1"
      class="side-menu-vertical"
      :collapse="false"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><i-ep-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><i-ep-document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><i-ep-setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>

    <div >收起</div>
  </div>

</template>

<style scoped>
.side-menu-vertical {
  border-right: none;
}
</style>
