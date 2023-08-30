<!--
 * @Author: Yu Peng
 * @Date: 2022-12-12 14:49:18
 * @LastEditTime: 2023-08-14 14:15:42
 * @FilePath: /admin-demo-vite3-vue3/src/views/table/table.vue
 * @Description: 
 * 
 * 
-->

<template>
	<div class="table-box">
		<h1>表格展示</h1>
		<!-- <n-data-table class="n-data-table" :bordered="false" :single-line="false" :columns="columns" :data="data" :pagination="pagination" /> -->

		<el-button type="primary"> 结算 </el-button>
	</div>
</template>
<!-- <script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { routeList } from '@/router/route-list';
import { h } from 'vue';
// import { NText, NButton, useMessage } from 'naive-ui';
// import type { DataTableColumns } from 'naive-ui';

// const message = useMessage();

type RowData = {
	id: number;
	name: string;
	desc: string;
	price: number;
	count: number;
};

const totalCost = ref(0);

//创建列
const createColumns = ({
	addCount,
	subCount,
}: {
	addCount: (rowData: RowData) => void;
	subCount: (rowData: RowData) => void;
}): DataTableColumns<RowData> => {
	return [
		{
			title: '名称',
			key: 'name',
		},
		{
			title: '描述',
			key: 'desc',
		},
		{
			title: '价格',
			key: 'price',
		},
		{
			title: '操作',
			key: 'actions',
			render(row) {
				return [
					h(
						NButton,
						{
							size: 'small',
							onClick: () => addCount(row),
						},
						{ default: () => '+' }
					),
					h(
						NText,
						{
							style: {
								margin: '0 20px',
							},
						},
						{ default: () => row.count }
					),
					h(
						NButton,
						{
							size: 'small',
							onClick: () => subCount(row),
						},
						{ default: () => '-' }
					),
				];
			},
		},
	];
};

//创建数据
const createData = (): RowData[] => [
	{
		id: 2324,
		name: '铅笔',
		desc: '2B铅笔，结实耐用',
		price: 15.5,
		count: 0,
	},
	{
		id: 4233,
		name: '胶水',
		desc: '哥俩好胶水，速干型',
		price: 9.9,
		count: 0,
	},
	{
		id: 8001,
		name: '剪刀',
		desc: '卡内基牌剪刀，锋利',
		price: 20,
		count: 0,
	},
];

const data = reactive(createData());
const columns = createColumns({
	addCount(rowData) {
		console.log('rowData', rowData);
		rowData.count++;
		totalCost.value += rowData.price;
	},
	subCount(rowData) {
		console.log('rowData', rowData);
		if (rowData.count > 0) {
			rowData.count--;
			totalCost.value -= rowData.price;
		}
	},
});

const pagination = {
	pageSize: 10,
};

const getCost = () => {
	message.info('结算花销' + totalCost.value);
};

const route = useRoute();

onMounted(() => {
	console.log('route', route);
	console.log('routeList', routeList);
});
</script>
<style lang="less" scoped>
.table-box {
	width: 100%;
	height: 100%;
	padding: 16px;

	.n-data-table {
		margin-top: 20px;
	}
}
</style> -->
