import regexpCode from '@global/regexp-code';

export const checkIPV4OrV6 = (value: string) => {
	const checked = regexpCode.IPV4_OR_IPV6.test(value.trim());
	return checked;
};

export const validIPV4OrV6 = (rule: any, value: string, callback: any) => {
	if (checkIPV4OrV6(value)) {
		callback();
	} else {
		callback(new Error('请输入正确的ip地址'));
	}
};
