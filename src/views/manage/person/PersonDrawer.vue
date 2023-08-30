<!--
 * @Author: Yu Peng
 * @Date: 2023-08-15 14:28:23
 * @LastEditTime: 2023-08-15 16:28:08
 * @Description: 责任人新建编辑抽屉
-->

<template>
	<div class="person-drawer">
		<!-- 抽屉表单 -->
		<el-drawer v-model="drawerShow" size="480" title="新建责任人" :append-to-body="false">
			<!-- 抽屉内容 -->
			<div>
				<!-- 表单 -->
				<el-form ref="personFormRef" :model="form" :rules="rules" label-width="98" status-icon>
					<!-- 姓名 -->
					<el-form-item label="姓名：" prop="name">
						<el-input v-model="form.name" />
					</el-form-item>
					<!-- 电话号码 -->
					<el-form-item label="电话：" prop="phone">
						<el-input v-model="form.phone" />
					</el-form-item>
					<!-- 邮箱 -->
					<el-form-item label="邮箱：" prop="email">
						<el-input v-model="form.email" />
					</el-form-item>
					<!-- 部门 -->
					<el-form-item label="部门：" prop="department">
						<el-input v-model="form.department" />
					</el-form-item>

					<!-- 办公地点 -->
					<el-form-item label="办公地点：" prop="address">
						<el-input v-model="form.address" type="textarea" placeholder="" :autosize="{ minRows: 5 }" />
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
					<el-button type="primary" @click="handleConfirm">确定</el-button>
				</div>
			</template>
		</el-drawer>
	</div>
</template>
<script lang="ts" setup>
//Element plus 表单类型
import type { FormInstance, FormRules } from 'element-plus';

// 导入内部工具
import { testPhone, testEmail } from '@utils/index';

//表单类型
export interface Form {
	id: number;
	name: string;
	phone: string;
	email: string;
	department: string;
	address: string;
	notes: string;
}

//表单初始数据
const INIT_FORM: Form = {
	id: -1,
	name: '',
	phone: '',
	email: '',
	department: '',
	address: '',
	notes: '',
};

//抽屉展示标识符
const drawerShow: Ref<boolean> = ref(false);

//表单对象
const form: Form = reactive<Form>({
	...INIT_FORM,
});

//向父组件传递事件
const emit = defineEmits(['handleConfirm', 'handleCancel']);

//表单实例
const personFormRef: Ref<FormInstance | null> = ref(null);

//字段长度限制
const PARAMS_MAX_LENGTH = 150;

//表单验证规则
const rules = reactive<FormRules<Form>>({
	name: [{ required: true, max: PARAMS_MAX_LENGTH, message: '请输入有效名称', trigger: 'blur' }],
	phone: [
		{
			//验证电话号码有效性
			validator: (rule: any, value: string, callback: any) => {
				if (value.trim() === '') {
					//允许空
					callback();
					return;
				}

				//验证电话号码
				if (testPhone(value)) {
					callback();
				} else {
					callback(new Error('请输入有效的电话号码'));
				}
			},
			trigger: 'blur',
		},
	],
	email: [
		{
			//验证电话号码有效性
			validator: (rule: any, value: string, callback: any) => {
				if (value.trim() === '') {
					//允许空
					callback();
					return;
				}
				if (value.trim().length > PARAMS_MAX_LENGTH) {
					callback(new Error('请输入有效的邮箱地址'));
					return;
				}
				//验证邮箱
				if (testEmail(value)) {
					callback();
				} else {
					callback(new Error('请输入有效的邮箱地址'));
				}
			},
			trigger: 'blur',
		},
	],
	department: [{ required: false, max: PARAMS_MAX_LENGTH, message: '请输入有效部门', trigger: 'blur' }],
	address: [{ required: false, max: PARAMS_MAX_LENGTH, message: '请输入有效办公地点', trigger: 'blur' }],
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
 * @description: 【事件】抽屉弹窗确认按钮触发：创建表格项
 * @return {*}
 */
const handleConfirm = () => {
	//校验表单
	if (!personFormRef) return;
	personFormRef.value?.validate((valid) => {
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
	console.log('取消操作');

	//取消弹窗
	emit('handleCancel');

	//关闭弹窗
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
	personFormRef.value?.clearValidate();

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
// 抽屉样式
.person-drawer :deep(.el-overlay) {
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
				margin: @common_content_padding 0;
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
		padding: @common_content_padding;
		border-top: 1px solid @common_splitline_color;
	}
}
</style>
