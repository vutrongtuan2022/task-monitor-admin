import {IDetailReportWork} from '../../../interfaces';

export interface PropsPresentReport {
	dataDetailReportWork: IDetailReportWork | null;
}

export interface ILastMonthReport {
	name: string;
	stage: number;
	parentUuid: string;
	metaType: string;
	isWorkFlow: number;
	state: number;
}
