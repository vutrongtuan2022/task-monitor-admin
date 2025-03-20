export interface PropsDialog {
	open: boolean;
	title: string | React.ReactNode;
	note?: string | React.ReactNode;
	icon?: any;
	onClose: () => any;
	onSubmit: () => any;
	titleCancel?: string;
	titleSubmit?: string;
	type?: 'primary' | 'error' | 'warning';
}
