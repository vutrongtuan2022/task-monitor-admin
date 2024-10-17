import axiosClient from '.';

const overviewServices = {
	listOverview: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			year: number | null;
			month: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/OverviewReport/get-page-list-overview-report`, data, {
			cancelToken: tokenAxios,
		});
	},
};
export default overviewServices;
