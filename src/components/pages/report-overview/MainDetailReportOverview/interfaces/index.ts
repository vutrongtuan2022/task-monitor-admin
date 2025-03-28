export interface PropsMainDetailReportOverview {}

export interface IDetailReportOverview {
	uuid: string;
	month: number;
	year: number;
	project: {
		uuid: string;
		code: string;
		name: string;
		state: number;
		leader: {
			fullname: string;
			code: string;
			uuid: string;
		};
	};
	report: {
		uuid: string;
		title: string;
		state: number;
		status: number;
		month: number;
		year: number;
		project: {
			uuid: string;
			code: string;
			name: string;
			state: number;
			leader: {
				fullname: string;
				code: string;
				uuid: string;
			};
		};
		reporter: {
			uuid: string;
			fullname: string;
			code: string;
		};
		completeState: number;
		completed: string;
		created: string;
		totalActivity: number;
		completedActivity: number;
	};
	fundReport: {
		uuid: string;
		monthReport: string;
		realeaseBudget: number;
		totalInvest: number;
		annualBudget: number;
		annualAccumAmount: number;
		projectAccumAmount: number;
		fundProgress: number;
		created: string;
		reporter: {
			uuid: string;
			fullname: string;
			code: string;
		};
		approved: number;
		status: number;
		note: string;
		feedback: string;
		project: {
			uuid: string;
			code: string;
			name: string;
			state: number;
			leader: {
				fullname: string;
				code: string;
				uuid: string;
			};
		};
	};
	reporter: {
		uuid: string;
		fullname: string;
		code: string;
	};
	updated: string;
	created: string;
	status: number;
	nextYear: number;
	nextMonth: number;
}
