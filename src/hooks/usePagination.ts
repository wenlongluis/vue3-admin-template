export default function usePagination(searchParams: any, getTableList: any) {
	// 表格支持每页显示条目数列表
	const pageSizes = [10, 20, 50, 100];
	//表格总条目数
	const total = ref(0);

	/**
	 * @description: 【事件】每页显示条目数改变时：更新table内容（重置pageNum=1，避免条目数过大时后续页码无数据）
	 * @param {*} pageSize 每页显示条目数
	 * @return {*}
	 */
	const handleSizeChange = (pageSize: number) => {
		searchParams.page_num = 1;
		searchParams.page_size = pageSize;
		getTableList();
	};

	/**
	 * @description: 【事件】页数改变时：更新table内容
	 * @param {*} pageNum 分页页码
	 * @return {*}
	 */
	const handleCurrentChange = (pageNum: number) => {
		searchParams.page_num = pageNum;
		getTableList();
	};

	return {
		total,
		pageSizes,
		handleSizeChange,
		handleCurrentChange,
	};
}
