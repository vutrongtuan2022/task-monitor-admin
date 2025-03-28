export interface PropsDetailPlanNextMonth {}

export interface IDetailPlanNextMonth {
	project: {
		code: string;
		name: string;
		state: number;
		uuid: string;
		branch: {
			code: string;
			name: string;
			uuid: string;
		};
	};
	reporter: {
		fullname: string;
		code: string;
		uuid: string;
	};
	month: number;
	year: number;
	completeState: any;
	completed: string;
	created: string;
	totalActivity: number;
	completedActivity: number;
	title: string;
	state: number;
	status: number;
	uuid: string;
	note: string;
	rejectedReason: string;
}
