export default function useModal<T>() {
	// 弹窗或抽屉的ref属性
	const modalRef = ref();

	// 打开弹窗或抽屉 组件内部实现open方法并暴露出来
	const open = (record?: T) => {
		modalRef.value?.open(record);
	};

	// 关闭弹窗或抽屉 组件内部实现close方法并暴露出来
	const close = () => {
		modalRef.value?.close();
	};

	return {
		modalRef,
		open,
		close,
	};
}
