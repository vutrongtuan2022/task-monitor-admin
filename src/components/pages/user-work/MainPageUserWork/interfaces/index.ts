export interface PropsMainPageUserWork {}

export interface IUserWork {
	activity: {
		name: string;
		state: number;
		uuid: string;
	};
	project: {
		code: string;
		name: string;
		state: number;
		uuid: string;
	};
	isInWorkFlow: true;
	month: number;
	year: number;
	issue: string;
	progress: number;
	reporter: {
		fullname: string;
		code: string;
		uuid: string;
	};
	deadlineState: number;
	dayDelayed: number;
	stage: number;
}
