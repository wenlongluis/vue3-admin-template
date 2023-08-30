<!--
 * @Author: Yu Peng
 * @Date: 2023-08-18 16:43:09
 * @LastEditTime: 2023-08-24 14:47:04
 * @Description: 资产组新建组件
-->

<template>
	<div class="asset-group-drawer">
		<!-- 抽屉表单 -->
		<el-drawer v-model="drawerShow" size="480" title="新建资产组">
			<!-- 抽屉内容 -->
			<div class="drawer-content">
				<!-- 表单 -->
				<el-form ref="assetGroupFormRef" :model="form" :rules="rules" label-width="98" class="demo-ruleForm" status-icon>
					<!-- 名称 -->
					<el-form-item label="名称：" prop="name">
						<el-input v-model="form.name" />
					</el-form-item>
					<!-- 访问白名单 -->
					<el-form-item label="IP段：" prop="ip">
						<el-input v-model="form.ip" type="textarea" placeholder="例如: 192.168.1.1/24,255.1.1.1" :autosize="{ minRows: 5 }" />
						<p style="line-height: 24px; font-size: 12px; color: #8c8c8c">用子网掩码格式，可输入IP和IP段，用“,”分割不同IP(段)</p>
					</el-form-item>
					<!-- 名称 -->
					<el-form-item label="责任人：" prop="person_id">
						<el-select v-model="form.person_id" filterable placeholder="请选择" no-data-text="空" clearable style="flex: 1">
							<el-option v-for="item in personOptions" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
						<el-button type="primary" style="margin-left: 12px; font-weight: normal" :icon="Plus" @click="handleOpenPersonDrawer"
							>新建责任人</el-button
						>
					</el-form-item>
					<!-- 备注 -->
					<el-form-item label="备注：" prop="notes">
						<el-input v-model="form.notes" type="textarea" :autosize="{ minRows: 5 }" />
					</el-form-item>
				</el-form>
			</div>
			<!-- 抽屉底部 -->
			<template #footer>
				<div style="flex: auto">
					<el-button @click="handleCancel">取消</el-button>
					<el-button type="primary" @click="handleConfirm">{{ form.id < 0 ? '生成' : '确定' }}</el-button>
				</div>
			</template>

			<!-- 责任人表单抽屉组件 -->
			<person-drawer ref="personDrawerRef" @handle-confirm="handlePersonConfirm"></person-drawer>
		</el-drawer>
	</div>
</template>
<script lang="ts" setup>
//搜索图标
import { Plus } from '@element-plus/icons-vue';

//Element plus 表单类型
import type { FormInstance, FormRules } from 'element-plus';

//正则验证
import regexpCode from '@global/regexp-code';

//责任人表单抽屉
import PersonDrawer from './../person/PersonDrawer.vue';

//责任人表单类型
import type { Form as PersonForm } from './../person/PersonDrawer.vue';

//表单类型
export interface Form {
	id: number;
	name: string;
	ip: string;
	notes: string;
	person_id: number | string;
}

// 责任人抽屉表单组件实例
const personDrawerRef = ref<InstanceType<typeof PersonDrawer>>();

//责任人选择列表
const personOptions: Ref<
	{
		value: number;
		label: string;
	}[]
> = ref([
	{
		value: 1,
		label: '张三',
	},
	{
		value: 2,
		label: '冯部长',
	},
	{
		value: 3,
		label: '阿哈马提阿拉迪',
	},
	{
		value: 7,
		label: '王五',
	},
	{
		value: 8,
		label: '赵六',
	},
	{
		value: 9,
		label: '张一二',
	},
	{
		value: 10,
		label: '王一一',
	},
]);

//向父组件传递事件
const emit = defineEmits<{
	(e: 'handleConfirm', formData: Form): void;
	(e: 'handleCancel'): void;
}>();

//抽屉弹出标识
const drawerShow = ref(false);

//表单实例
const assetGroupFormRef: Ref<FormInstance | null> = ref(null);

//字段长度限制
const PARAMS_MAX_LENGTH = 150;

//表单初始数据
const INIT_FORM: Form = {
	id: -1,
	name: '',
	person_id: '',
	ip: '',
	notes: '',
};

//表单数据
const form = reactive<Form>({
	...INIT_FORM,
});

//表单验证规则
const rules = reactive<FormRules<Form>>({
	name: [
		{ required: true, max: PARAMS_MAX_LENGTH, message: '请输入有效名称', trigger: 'blur' },
		// { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
	],
	ip: [
		{ required: true, message: '请输入有效IP地址', trigger: 'blur' },
		{
			//验证ip表单有效性
			validator: (rule: any, value: string, callback: any) => {
				const ipList = value.split(',');

				const validRes = ipList.every((item) => {
					return (
						regexpCode.IPV4_OR_IPV6.test(item.trim()) || regexpCode.IPV4_MASK_ONLY.test(item.trim()) || regexpCode.IPV6_MASK_ONLY.test(item.trim())
					);
				});

				if (validRes) {
					callback();
				} else {
					callback(new Error('请输入有效的IP列表'));
				}
			},
			trigger: 'blur',
		},
	],
	notes: [
		{
			required: false,
			max: PARAMS_MAX_LENGTH,
			message: '请输入有效备注',
			trigger: 'blur',
		},
	],
});

/**
 * @description: 【事件】点击创建或编辑的责任人表单确认按钮触发：新建责任人并加入到本业下拉列表中
 * @param {*} form
 * @return {*}
 */
const handlePersonConfirm = (form: PersonForm) => {
	console.log('创建或编辑的责任人表单数据', form);

	//请求后端

	//更新下拉列表
	personOptions.value.unshift({
		value: 100,
		label: form.name,
	});

	//请求后端添加数据
	ElMessage.success('操作成功');
};

/**
 * @description: 【事件】点击新建责任人按钮触发：展开新建责任人抽屉
 * @return {*}
 */
const handleOpenPersonDrawer = () => {
	//展开表单抽屉，并初始化表单
	personDrawerRef.value?.openDrawer();
};

/**
 * @description: 【事件】抽屉弹窗确认按钮触发：创建表格项
 * @return {*}
 */
const handleConfirm = () => {
	//校验表单
	if (!assetGroupFormRef) return;
	assetGroupFormRef.value?.validate((valid) => {
		if (!valid) {
			console.log('error submit!');
			return false;
		}
		//确认弹窗，返回清空响应式的表单数据
		emit('handleConfirm', toRaw(form));

		//关闭弹窗
		drawerShow.value = false;
	});
};

/**
 * @description: 【事件】抽屉弹窗取消按钮触发：取消操作
 * @return {*}
 */
const handleCancel = () => {
	console.log('取消');

	drawerShow.value = false;
};

/**
 * @description: 【暴露】打开表单抽屉
 * @param {*} parentForm 要传入表单的数据，不传时为初始化表单
 * @return {*}
 */
const openDrawer = (parentForm: Form = INIT_FORM) => {
	//初始化表单数据
	Object.assign(form, parentForm);

	//清空校验结果
	assetGroupFormRef.value?.clearValidate();

	//展开表单抽屉
	drawerShow.value = true;
};

defineExpose({
	openDrawer,
	INIT_FORM,
});
</script>
<style lang="less" scoped>
//导入全局变量
@import '@style/variables.module.less';
.asset-group-drawer :deep(.el-overlay) {
	//抽屉顶部
	.el-drawer__header {
		box-sizing: border-box;
		height: @common_nav_height;
		justify-content: center;
		padding: 0 @common_content_padding;
		border-bottom: 1px solid @common_splitline_color;
		margin-bottom: 0;

		// 标题
		.el-drawer__title {
			color: @common_text_color;
			font-size: 16px;
			font-weight: 600;
		}
	}

	//抽屉内容区
	.el-drawer__body {
		padding: @common_content_padding;

		.result-box {
			width: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;

			.result-icon {
				display: block;
				margin-top: 40px;
			}

			.result-info {
				display: block;
				font-size: 16px;
				margin: 16px 0;
			}

			.result-key-button {
				display: block;
				width: 100%;
				margin-bottom: 16px;
			}
		}
	}

	//抽屉底部
	.el-drawer__footer {
		padding: 16px;
		border-top: 1px solid @common_splitline_color;
	}
}
</style>
