export interface PropsTableReportWorkCurrent {}

export interface IReportWorkCurrent {
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
	isInWorkFlow: boolean;
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
	stage: number;
}
