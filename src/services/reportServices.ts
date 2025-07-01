import axiosClient from '.';

const reportServices = {
	listReport: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			month: number | null;
			year: number | null;
			state: number | null;
			completeState: number | null;
			reporterUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Report/admin-get-page-list-report`, data, {
			cancelToken: tokenAxios,
		});
	},
	listReportPlanNextMonth: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			month: number | null;
			year: number | null;
			completeState: number | null;
			reporterUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Report/admin-get-page-list-planning-report`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailReport: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Report/user-get-report-detail`, data, {
			cancelToken: tokenAxios,
		});
	},

	backStateReport: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Report/back-state-report`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default reportServices;
