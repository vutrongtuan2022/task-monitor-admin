import axiosClient from '.';

const projectFundServices = {
	listProjectFund: (
		data: {
			pageSize: number;
			page: number;
			projectUuid: string;
			approved: number | null;
			status: number;
			year: number | null;
			month: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectFund/get-page-list-project-fund`, data, {
			cancelToken: tokenAxios,
		});
	},
	listProjectFundAll: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			year: number | null;
			month: number | null;
			approved: number | null;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectFund/get-page-list-project-fund-all`, data, {
			cancelToken: tokenAxios,
		});
	},
	detaulProjectFund: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectFund/get-detail-project-fund`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default projectFundServices;
