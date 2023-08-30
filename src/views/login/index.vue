<template>
	<div class="login-container">
		<img class="logo" src="/avatar.png" alt="logo" />
		<h1 class="title">{{ COMMON_TITLE }}</h1>
		<div class="login-content">
			<!-- 登录框 -->
			<h2 class="login-title">登录</h2>
			<el-form ref="formRef" :model="formValue" :rules="rules" label-postion="left" size="large">
				<el-form-item prop="name">
					<el-input v-model="formValue.name" placeholder="用户名" />
				</el-form-item>
				<el-form-item prop="pwd">
					<el-input v-model="formValue.pwd" type="password" placeholder="密码" show-password @keyup.enter="handleEnterKey" />
				</el-form-item>
				<el-form-item>
					<el-button class="logiel-button" type="primary" :disabled="loading" :loading="loading" @click="handleValidateClick(formRef)">
						登录
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';

import { useRouter } from 'vue-router';
import { useUserStore } from '@stores/user';
import { login } from '@api/index';
import { ref } from 'vue';
import { reactive } from 'vue';

//用户仓库
const userStore = useUserStore();

//全局路由
const router = useRouter();

//等待标识
const loading = ref(false);

//导航栏标题
const COMMON_TITLE = import.meta.env.VITE_APP_TITLE;

//表单数据类型
interface FormValue {
	name: string;
	pwd: string;
	phone?: string;
}

//表单组件
const formRef = ref<FormInstance>();

//表单数据
const formValue = reactive<FormValue>({
	name: '',
	pwd: '',
	phone: '',
});

const rules = reactive<FormRules<FormValue>>({
	name: [
		{
			required: true,
			message: '请输入用户名称',
			trigger: 'blur',
		},
	],
	pwd: [
		{
			required: true,
			message: '请输入密码',
			trigger: 'blur',
		},
	],
});

/**
 * @description: 处理登录验证
 * @param {*} formRef
 * @return {*}
 */
const handleValidateClick = async (formRef: FormInstance | undefined) => {
	loading.value = true;
	if (!formRef) {
		return;
	}
	await formRef.validate(async (valid, fields) => {
		if (valid) {
			console.log('前端验证通过');

			//登录用户
			const userParams = {
				name: formValue.name,
				pwd: formValue.pwd,
			};
			//前端验证通过
			let user = await login(userParams);
			// 正式环境登录
			if (user) {
				//提示操作
				ElMessage.success('登录成功');
				console.log('登录成功', user);
				//写入到全局状态仓库中
				userStore.user = user;
				//跳转到首页中
				router.push({
					name: 'home',
				});
			} else {
				console.log('登录失败');
				// message.error('登录失败');
				ElMessage.warning('登录失败，请检查用户名和密码');
			}
		} else {
			console.log('登录验证错误', fields);
			// message.error('登录失败');
		}
		loading.value = false;
	});
};

/**
 * @description: 输入框回车键触发
 * @return {*}
 */
const handleEnterKey = () => {
	//调用登录函数
	handleValidateClick(formRef.value);
};
</script>
<style lang="less" scoped>
.login-container {
	width: 100vw;
	height: 100vh;
	background: #f3f4f7;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;

	.logo {
		width: 64px;
		margin-top: -60px;
	}

	.title {
		color: #3366ff;
		font-weight: 700;
		font-size: 24px;
		// text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
		font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol';
	}

	.login-content {
		width: clamp(300px, 90vw, 400px);
		height: 280px;
		margin-top: 20px;
		border-radius: 4px;
		background-color: #fff;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		padding: 20px;

		.login-title {
			font-weight: 600;
			font-size: 18px;
			margin-bottom: 20px;
		}

		.login-button {
			width: 100%;
			margin-top: 10px;
		}
	}
}
</style>
