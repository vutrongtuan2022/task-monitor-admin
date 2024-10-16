export interface PropsMainPlanNextMonth {}

export interface IReportWork {
	project: {
		code: string;
		name: string;
		state: number;
		uuid: string;
	};
	reporter: {
		fullname: string;
		code: string;
		uuid: string;
	};
	month: number;
	year: number;
	completed: string;
	created: string;
	totalActivity: number;
	completedActivity: number;
	title: string;
	state: number;
	status: number;
	uuid: string;
}
