/*
 * @Author: Yu Peng
 * @Date: 2023-08-08 12:15:44
 * @LastEditTime: 2023-08-23 11:11:46
 * @Description: 通用工具仓库
 */

/**
 * @description: 复制内容到粘贴板
 * @param {string} val 要复制的字符串
 * @return {*}
 */
export const copyText = async (val: string) => {
	if (navigator.clipboard && navigator.permissions) {
		await navigator.clipboard.writeText(val);
	} else {
		const textArea: any = document.createElement('textArea');
		textArea.value = val;
		textArea.style.width = '0';
		textArea.style.position = 'fixed';
		textArea.style.left = '-200vw';
		textArea.style.top = '-200%';
		textArea.setAttribute('readonly', 'readonly');
		document.body.appendChild(textArea);
		textArea?.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);
	}
};

/**
 * @description: 验证电话号字符串是否有效，通过返回true
 * @param {string} phoneValue
 * @return {*}
 */
export const testPhone = (phoneValue: string) => {
	//固定电话正则
	const FIXED_PHONE_REGEXP = /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/;
	//移动电话号码正则
	const MOBILE_PHONE_REGEXP = /^(?:(?:\+|00)86)?1\d{10}$/;

	if (MOBILE_PHONE_REGEXP.test(phoneValue) || FIXED_PHONE_REGEXP.test(phoneValue)) {
		return true;
	} else {
		return false;
	}
};

/**
 * @description: 验证邮箱字符串是否有效，通过返回true
 * @param {string} emailValue
 * @return {*}
 */
export const testEmail = (emailValue: string) => {
	//邮箱正则
	const EMAIL_REGEXP = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

	return EMAIL_REGEXP.test(emailValue);
};

/**
 * @description: 日期时间格式化
 * @param {*} fmt 格式
 * @param {*} date 日期Date对象
 * @return {*}
 */
export const dateFormat = (fmt = 'YYYY-mm-dd HH:MM:SS', date: Date = new Date()) => {
	let ret;
	const opt: Record<string, string> = {
		'Y+': date.getFullYear().toString(), // 年
		'm+': (date.getMonth() + 1).toString(), // 月
		'd+': date.getDate().toString(), // 日
		'H+': date.getHours().toString(), // 时
		'M+': date.getMinutes().toString(), // 分
		'S+': date.getSeconds().toString(), // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (const k in opt) {
		ret = new RegExp('(' + k + ')').exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
		}
	}
	return fmt;
};

/**
 * @description: 验证密码连续性，存在大于3位连续数字或字母（正序或倒序）
 * @param {*} pwdValue
 * @return {*}
 */
export const testPwdContinuous = (pwdValue: string) => {
	if (pwdValue.length < 3) {
		return true;
	}
	for (let i = 1; i < pwdValue.length - 1; i++) {
		const firstIndex = pwdValue.charCodeAt(i - 1);
		const secondIndex = pwdValue.charCodeAt(i);
		const thirdIndex = pwdValue.charCodeAt(i + 1);
		if (thirdIndex - secondIndex == 1 && secondIndex - firstIndex == 1) {
			return false;
		}
		if (secondIndex - thirdIndex == 1 && firstIndex - secondIndex == 1) {
			return false;
		}
	}

	return true;
};
