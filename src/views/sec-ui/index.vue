<!--
 * @Author: Yu Peng
 * @Date: 2023-08-02 11:11:01
 * @LastEditTime: 2023-08-24 16:04:22
 * @Description: 基础模板（包含标签页）
-->

<template>
  <div class="view-container">
    <h2 class="title">Button 按钮</h2>
    <el-card class="demo-block">
      <el-button type="primary">主要按钮</el-button>
      <el-button>辅助按钮</el-button>
      <el-button type="danger">警示按钮</el-button>
      <el-button type="primary" :icon="Search">Search</el-button>
    </el-card>

    <h2 class="title">Tabs 标签页</h2>
    <el-card class="demo-block">
      <el-tabs v-model="activeTab" class="page-tabs">
        <el-tab-pane class="page-tabs-pane" label="用户管理" name="asset"> 用户管理 </el-tab-pane>
        <el-tab-pane class="page-tabs-pane" label="角色管理" name="person"> 角色管理 </el-tab-pane>
      </el-tabs>
    </el-card>

    <h2 class="title">Table 表格</h2>
    <el-card class="demo-block">
<!--      <el-table :data="tableData" stripe :border="true" empty-text="无数据" row-key="id" @selection-change="handleSelectionChange">-->
<!--        <el-table-column fixed type="selection" width="40" />-->
<!--        <el-table-column fixed prop="name" label="姓名" width="150" />-->
<!--        <el-table-column prop="phone" label="电话" width="150" />-->
<!--        <el-table-column prop="email" label="邮箱" width="220" />-->
<!--        <el-table-column prop="department" label="部门" width="150" />-->
<!--        <el-table-column prop="address" label="办公地点" show-overflow-tooltip />-->
<!--        <el-table-column prop="notes" label="备注" width="100" />-->
<!--        <el-table-column prop="createdAt" label="创建时间" width="200" />-->
<!--      </el-table>-->
    </el-card>

    <h2 class="title">Pagination 分页</h2>
    <el-card class="demo-block">
      <div class="pagination-box">
        <el-button class="pagination-button" plain>GO</el-button>
<!--        <el-pagination-->
<!--          v-model:current-page="searchParams.page_num"-->
<!--          v-model:page-size="searchParams.page_size"-->
<!--          :page-sizes="pageSizes"-->
<!--          :background="false"-->
<!--          layout="total, prev, pager, next,  sizes, jumper,slot"-->
<!--          :total="total"-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--        >-->
<!--        </el-pagination>-->
      </div>
    </el-card>

  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import { Search } from '@element-plus/icons-vue';
const activeTab = ref('asset');



</script>
<style lang="less" scoped>

</style>
