export interface PropsTableContractFund {}

export interface IContractFund {
	uuid: string;
	releasedMonth: number;
	releasedYear: number;
	projectAmount: number;
	reverseAmount: number;
	totalAmount: number;
	creator: {
		uuid: string;
		fullname: string;
		code: string;
	};
	created: string;
	state: number;
}
