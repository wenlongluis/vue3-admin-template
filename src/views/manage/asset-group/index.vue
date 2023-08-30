<!--
 * @Author: Yu Peng
 * @Date: 2023-08-02 15:25:49
 * @LastEditTime: 2023-08-24 16:45:14
 * @Description: 纳管配置-资产组
-->
<template>
	<div class="container">
		<!-- 按钮操作区域 -->
		<div class="button-box">
			<!-- 新建按钮 -->
			<el-button type="primary" @click="handleAddClick"> 新建 </el-button>
			<!-- 批量操作按钮 -->
			<el-button type="" :plain="false" @click="handleAddList"> 批量新建 </el-button>
			<!-- 批量按钮，弹窗确认 -->
			<el-popconfirm title="请确认是否执行批量删除操作？" width="200" @confirm="handleDeleteConfirm">
				<template #reference>
					<el-button :type="buttonDisabled ? 'info' : ''" :plain="buttonDisabled" :disabled="buttonDisabled">批量删除</el-button>
				</template>
			</el-popconfirm>

			<!-- 搜索框 -->
			<el-input
				v-model="searchParams.search_text"
				class="search-input"
				clearable
				placeholder="名称、责任人、备注"
				:suffix-icon="Search"
				@keyup.enter="handleEnterKey"
			/>
		</div>

		<!-- 表格操作区域 -->
		<div class="table-box">
			<el-table :data="tableData" stripe :border="true" empty-text="无数据" max-height="600px" row-key="id" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="40" />
				<el-table-column prop="name" label="名称" />
				<el-table-column prop="ip" label="IP范围" />
				<el-table-column prop="person_name" label="责任人" />
				<el-table-column label="IP数量">
					<template #default="scope">
						<router-link :to="{ name: 'login' }">
							<span style="color: #3366ff; cursor: pointer; text-decoration: underline">{{ scope.row.ip_count }}</span>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column prop="createdAt" label="创建时间" width="200" />
				<el-table-column prop="updatedAt" label="更新时间" width="200" />
				<el-table-column fixed="right" label="操作" width="120">
					<template #default="scope">
						<el-button link type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-popconfirm title="请确认是否删除？" width="200" @confirm="handleDelete(scope.$index, scope.row)">
							<template #reference>
								<el-button link type="danger" size="small">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 分页栏 -->
		<div class="pagination-box">
			<el-button class="pagination-button" plain>GO</el-button>
			<el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:page-sizes="pageSizes"
				:background="false"
				layout="total, prev, pager, next,  sizes, jumper,slot"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			>
			</el-pagination>
		</div>

		<!-- 资产组表单抽屉组件 -->
		<asset-group-drawer ref="assetGroupDrawerRef" @handle-confirm="handleConfirm" @handle-cancel="handleCancel"></asset-group-drawer>
	</div>
</template>
<script lang="ts" setup>
//搜索图标
import { Search } from '@element-plus/icons-vue';

// //正则验证
// import regexpCode from '@global/regexp-code';

//导入路由组件
import { RouterLink } from 'vue-router';

//资产组表单抽屉组件
import AssetGroupDrawer from './AssetGroupDrawer.vue';

// //自查组表单类型
import type { Form as AssetGroupForm } from './AssetGroupDrawer.vue';

//引入分页hooks方法
import usePagination from '@/hooks/usePagination';

// 表格数据类型
interface TableItem {
	id: number;
	name: string;
	ip: string;
	person_name: string;
	person_id: number;
	ip_count: number;
	notes: string;
	createdAt: string;
	updatedAt: string;
}

//影响表格内容类型
interface SearchParams {
	page_num: number;
	page_size: number;
	search_text: string;
}

// 资产组抽屉组件实例
const assetGroupDrawerRef = ref<InstanceType<typeof AssetGroupDrawer>>();

//批量操作按钮不可用
const buttonDisabled = ref(true);

//表格数据
const tableData: Ref<TableItem[]> = ref([]);

/**
 * @description: 【api事件】查询列表数据
 */
const getTableList = async () => {
	//总页数
	total.value = 183;
	//加载后端数据
	tableData.value = [
		{
			id: 0,
			name: '东四研发中心',
			ip: '1.1.1.0/24',
			person_name: '张三',
			person_id: 1,
			ip_count: 23,
			notes: '测试',
			createdAt: '2022年12月08日 19:56:48',
			updatedAt: '2023年06月18日 08:29:08',
		},
		{
			id: 1,
			name: '研发一部',
			ip: '172.142.2.43,110.168.59.126,192.23.45.1/24',
			person_name: '冯部长',
			person_id: 2,
			ip_count: 184,
			notes: '算法冗余能力',
			createdAt: '2022年12月08日 19:56:48',
			updatedAt: '2023年11月15日 22:08:47',
		},
		{
			id: 2,
			name: '数据中心',
			ip: '65.1.1.189/30',
			person_name: '阿哈马提阿拉迪',
			person_id: 3,
			ip_count: 548,
			notes: '办公',
			createdAt: '2022年12月08日 19:56:48',
			updatedAt: '2023年06月18日 08:29:08',
		},
		{
			id: 3,
			name: '东四研发中心',
			ip: '1.1.1.0/24',
			person_name: '',
			person_id: 0,
			ip_count: 103,
			notes: '测试',
			createdAt: '2022年12月08日 19:56:48',
			updatedAt: '2023年06月18日 08:29:08',
		},
		{
			id: 4,
			name: '东四研发中心',
			ip: '1.1.1.0/24',
			person_name: '',
			person_id: 0,
			ip_count: 1,
			notes: '测试',
			createdAt: '2022年12月08日 19:56:48',
			updatedAt: '2023年06月18日 08:29:08',
		},
		{
			id: 5,
			name: '东四研发中心',
			ip: '192.168.193.53/24',
			person_name: '',
			person_id: 0,
			ip_count: 103,
			notes: '测试T',
			createdAt: '2023年04月29日 11:56:48',
			updatedAt: '2023年06月18日 08:29:08',
		},
		{
			id: 6,
			name: '东四研发中心',
			ip: '1.1.1.0/24',
			person_name: '赵六六',
			person_id: 5,
			ip_count: 192,
			notes: '测试',
			createdAt: '2022年12月08日 19:56:48',
			updatedAt: '2023年06月18日 08:29:08',
		},
		{
			id: 7,
			name: '东四研发中心',
			ip: '1.1.1.0/24',
			person_name: '',
			person_id: 0,
			ip_count: 1294,
			notes: '测试',
			createdAt: '2022年12月08日 19:56:48',
			updatedAt: '2023年06月18日 08:29:08',
		},
		{
			id: 8,
			name: '东四研发中心',
			ip: '1.1.1.0/24',
			person_name: '',
			person_id: 0,
			ip_count: 3,
			notes: '测试',
			createdAt: '2022年12月08日 19:56:48',
			updatedAt: '2023年06月18日 08:29:08',
		},
		{
			id: 8,
			name: '东四研发中心',
			ip: '1.1.1.0/24',
			person_name: '王五',
			person_id: 7,
			ip_count: 15,
			notes: '测试',
			createdAt: '2022年12月08日 19:56:48',
			updatedAt: '2023年06月18日 08:29:08',
		},
	];
};

//影响表格内容
const searchParams = reactive<SearchParams>({
	page_num: 1,
	page_size: 10,
	search_text: '',
});

//分页相关属性与方法
const { total, pageSizes, handleSizeChange, handleCurrentChange } = usePagination(searchParams, getTableList);

//表格每页显示条目数
const pageSize = ref(pageSizes[0]);

//表格当前页
const currentPage = ref(1);

//选中的列表项
const selectedList = ref<TableItem[]>([]);

/**
 * @description: 【事件】表格多选勾选改变触发：同步全局变量
 * @param {*} list
 * @return {*}
 */
const handleSelectionChange = (list: TableItem[]) => {
	selectedList.value = list;

	buttonDisabled.value = list.length <= 0;

	console.log('勾选改变了', selectedList.value);
};

/**
 * @description: 【事件】表格删除按钮触发：编辑表格内容
 * @return {*}
 */
const handleDelete = (index: number, row: TableItem) => {
	console.log('click index', index);
	console.log('click row', row);
};

/**
 * @description: 【事件】表格编辑按钮触发：编辑表格内容
 * @return {*}
 */
const handleEdit = (index: number, row: TableItem) => {
	console.log('click index', index);
	console.log('click row', row);

	//展开表单抽屉，并初始化表单
	assetGroupDrawerRef.value?.openDrawer(row);
};

/**
 * @description: 【事件】新建按钮被触发：弹出抽屉表单
 * @return {*}
 */
const handleAddClick = () => {
	//展开表单抽屉，并初始化表单
	assetGroupDrawerRef.value?.openDrawer();
};

/**
 * @description: 【事件】批量删除操作按钮确认：批量删除Key
 * @return {*}
 */
const handleDeleteConfirm = () => {
	console.log('批量删除选中项', selectedList.value);
};

/**
 * @description: 【事件】抽屉弹窗取消按钮触发：取消操作
 * @return {*}
 */
const handleCancel = () => {
	console.log('资产组表单抽屉关闭');
};

/**
 * @description: 【事件】抽屉弹窗确认/生成按钮触发：创建表格项
 * @return {*}
 */
const handleConfirm = (form: AssetGroupForm) => {
	console.log('创建或编辑的表单数据', form);

	//请求后端添加数据
	ElMessage.success('操作成功');
};

/**
 * @description: 【事件】点击批量新建按钮触发：唤起上传弹窗
 * @return {*}
 */
const handleAddList = () => {
	//唤起弹窗
	// uploadDialogRef.value?.operateUploadDialog(true);
};

/**
 * @description: 【事件】搜索框回车触发：根据关键字搜索
 * @return {*}
 */
const handleEnterKey = () => {
	alert(searchParams.search_text);
};

// 初始化加载数据
getTableList();

//页面渲染完成回调
onMounted(() => {
	//初始化
	console.log('页面初始化');
});
</script>
<style lang="less" scoped>
//导入全局变量
@import '@style/variables.module.less';
.container {
	width: 100%;

	//按钮操作区域
	.button-box {
		width: 100%;
		margin-bottom: 8px;
		display: flex;
		height: 30px;

		.search-input {
			width: 320px;
			//局右
			margin-left: auto;

			//宽度
			&:deep(.el-input__wrapper) {
				width: 296px;
			}
		}
	}

	//表格区域
	.table-box {
		width: 100%;
		box-sizing: border-box;
		padding: 8px;
		background-color: @common_nav_backgoundColor;
	}

	//分页区域
	.pagination-box {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		padding: 0 8px 8px 8px;
		background-color: @common_nav_backgoundColor;
		display: flex;
		//具右显示
		flex-direction: row-reverse;

		.pagination-button {
			margin-left: 16px;
		}
	}
}
</style>
