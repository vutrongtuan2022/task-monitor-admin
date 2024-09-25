export interface PropsCreateContractor {
	onClose: () => void;
}

export interface IFormCreateContractor {
	code: string;
	name: string;
	type: number | null;
	note: string;
	matp: string;
	maqh: string;
	xaid: string;
	address: string;
}
