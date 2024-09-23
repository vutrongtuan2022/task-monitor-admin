export interface PropsBaseLayout {
	children: any;
	title: string;
}

export interface TContextBaseLayout {
	showFull?: boolean;
	setShowFull?: (boolean: boolean) => void;
}
