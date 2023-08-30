<!--
 * @Author: Yu Peng
 * @Date: 2023-08-02 15:25:49
 * @LastEditTime: 2023-08-24 10:07:50
 * @Description: 纳管配置-责任人
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
					<el-button :type="buttonDisabled ? 'info' : ''" :plain="buttonDisabled" :disabled="buttonDisabled"> 批量删除 </el-button>
				</template>
			</el-popconfirm>

			<!-- 搜索框 -->
			<!-- <el-input v-model="searchText" class="search-input" placeholder="名称、责任人、备注" :suffix-icon="Search" @keyup.enter="handleEnterKey" /> -->
		</div>

		<!-- 表格操作区域 -->
		<div class="table-box">
			<el-table :data="tableData" stripe :border="true" empty-text="无数据" max-height="600px" row-key="id" @selection-change="handleSelectionChange">
				<el-table-column fixed type="selection" width="40" />
				<el-table-column fixed prop="name" label="姓名" width="150" />
				<el-table-column prop="phone" label="电话" width="150" />
				<el-table-column prop="email" label="邮箱" width="220" />
				<el-table-column prop="department" label="部门" width="150" />
				<el-table-column prop="address" label="办公地点" />
				<el-table-column prop="notes" label="备注" width="100" />
				<el-table-column prop="createdAt" label="创建时间" width="200" />
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

		<!-- 表单抽屉 -->
		<person-drawer ref="personDrawerRef" @handle-confirm="handleConfirm" @handle-cancel="handleCancel"></person-drawer>
	</div>
</template>
<script lang="ts" setup>
//责任人表单抽屉组件
import PersonDrawer from './PersonDrawer.vue';

//责任人表单类型
import type { Form } from './PersonDrawer.vue';

//引入分页hooks方法
import usePagination from '@/hooks/usePagination';

// 责任人抽屉表单组件实例
const personDrawerRef = ref<InstanceType<typeof PersonDrawer>>();

// 批量操作按钮不可用
const buttonDisabled = ref(true);

//影响表格内容类型
interface SearchParams {
	page_num: number;
	page_size: number;
}

// 表格数据类型
interface TableItem {
	id: number;
	name: string;
	phone: string;
	email: string;
	department: string;
	address: string;
	notes: string;
	createdAt: string;
}

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
			name: '阿依努尔·阿迪江',
			phone: '134203030006',
			email: 'jmartin@gigazoom.info',
			department: '运维部',
			address: '浙江省杭州市下城区测试大厦105',
			notes: '办公',
			createdAt: '2022年12月08日 16:09:48',
		},
		{
			id: 1,
			name: '张三',
			phone: '152030309090',
			email: 'zhangsan@163.com',
			department: '研发部',
			address: '北京市朝阳区朝外大街中国人寿大厦13-09',
			notes: '研发',
			createdAt: '2023年05月19日 09:16:20',
		},
		{
			id: 2,
			name: '王星星',
			phone: '196000123943',
			email: 'zhangsan@163.com',
			department: 'IT部',
			address: '湖南省长兴区渡江大楼15层1511',
			notes: '',
			createdAt: '2023年07月01日 12:16:20',
		},
		{
			id: 3,
			name: '张武',
			phone: '134203030006',
			email: 'jmartin@gigazoom.info',
			department: '运维部',
			address: '浙江省杭州市下城区测试大厦105',
			notes: '备用补充',
			createdAt: '2022年12月08日 16:09:48',
		},
		{
			id: 4,
			name: '李四',
			phone: '134203030006',
			email: 'jmartin@gigazoom.info',
			department: '人力资源部',
			address: '浙江省杭州市下城区测试大厦105',
			notes: '办公',
			createdAt: '2022年12月08日 16:09:48',
		},
		{
			id: 5,
			name: '王五',
			phone: '134203030006',
			email: 'jmartin@gigazoom.info',
			department: '运维部',
			address: '浙江省杭州市下城区测试大厦105',
			notes: '办公',
			createdAt: '2022年12月08日 16:09:48',
		},
		{
			id: 6,
			name: '赵六六',
			phone: '134203030006',
			email: 'jmartin@gigazoom.info',
			department: '运维部',
			address: '浙江省杭州市下城区测试大厦105',
			notes: '办公',
			createdAt: '2022年12月08日 16:09:48',
		},
		{
			id: 7,
			name: '司马欧阳',
			phone: '134203030006',
			email: 'jmartin@gigazoom.info',
			department: '运维部',
			address: '浙江省杭州市下城区测试大厦105',
			notes: '办公',
			createdAt: '2022年12月08日 16:09:48',
		},
		{
			id: 8,
			name: 'Tom Cat',
			phone: '134203030006',
			email: 'jmartin@gigazoom.info',
			department: '支持部',
			address: '浙江省杭州市下城区测试大厦105',
			notes: '',
			createdAt: '2022年12月08日 16:09:48',
		},
		{
			id: 9,
			name: '周杰',
			phone: '134203030006',
			email: 'jmartin@gigazoom.info',
			department: '运维部',
			address: '浙江省杭州市下城区测试大厦105',
			notes: 'test',
			createdAt: '2022年12月08日 16:09:48',
		},
	];
};

//影响表格内容
const searchParams = reactive<SearchParams>({
	page_num: 1,
	page_size: 10,
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
	personDrawerRef.value?.openDrawer(row);
};

/**
 * @description: 【事件】新建按钮被触发：弹出抽屉表单
 * @return {*}
 */
const handleAddClick = () => {
	//展开表单抽屉，并初始化表单
	personDrawerRef.value?.openDrawer();
};

/**
 * @description: 【事件】抽屉弹窗确认按钮触发：创建表格项
 * @return {*}
 */
const handleConfirm = (form: Form) => {
	console.log('创建或编辑的表单数据', form);

	//请求后端添加数据
	ElMessage.success('操作成功');
};

/**
 * @description: 【事件】抽屉弹窗取消按钮触发：取消操作
 * @return {*}
 */
const handleCancel = () => {
	console.log('取消抽屉');
};

/**
 * @description: 【事件】批量删除操作按钮确认：批量删除Key
 * @return {*}
 */
const handleDeleteConfirm = () => {
	console.log('批量删除选中项', selectedList.value);
};

/**
 * @description: 【事件】点击批量新建按钮触发：唤起上传弹窗
 * @return {*}
 */
const handleAddList = () => {
	//唤起弹窗
	// uploadDialogRef.value?.operateUploadDialog(true);
};

// /**
//  * @description: 【事件】搜索框回车触发：根据关键字搜索
//  * @return {*}
//  */
// const handleEnterKey = () => {
// 	alert(searchText.value);
// };

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
