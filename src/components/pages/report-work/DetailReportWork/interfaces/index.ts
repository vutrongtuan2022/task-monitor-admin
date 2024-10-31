export interface PropsDetailReportWork {}

export interface IDetailReportWork {
	note: string;
	brachFeedback: any;
	rejectedReason: string;
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
	completeState: any;
	completed: string;
	created: string;
	totalActivity: number;
	completedActivity: number;
	title: string;
	state: number;
	status: number;
	uuid: string;
}
