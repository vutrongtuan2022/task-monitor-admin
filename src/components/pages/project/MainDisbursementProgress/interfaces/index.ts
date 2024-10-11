export interface PropsMainDisbursementProgress {}

export interface IDetailProgressFundProject {
	countYearly: number;
	countInProject: number;
	totalYearly: number;
	totalInProject: number;
	categoryProjectDTO: {
		code: string;
		name: string;
		state: number;
		uuid: string;
	};
}
