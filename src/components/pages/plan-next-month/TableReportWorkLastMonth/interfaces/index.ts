export interface PropsTableReportWorkLastMonth {}

export interface IReportWorkLastMonth {
	activityUuid: string;
	name: string;
	megaType: string;
	isInWorkFlow: boolean;
	state: number;
	stage: number;

	reportUuid: string;
	activity: {
		uuid: string;
		name: string;
		state: number;
	};
	project: {
		uuid: string;
		code: string;
		name: string;
		state: number;
	};

	month: number;
	year: number;
	issue: string;
	progress: number;
	reporter: {
		uuid: string;
		fullname: string;
		code: string;
	};
	megatype: string;
	deadlineState: number;
	dayDelayed: number;
	digitalizedState: number;
}
