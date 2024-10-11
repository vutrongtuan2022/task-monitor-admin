import axiosClient from '.';

const projectFundServices = {
	listProjectFund: (
		data: {
			pageSize: number;
			page: number;
			projectUuid: string;
			approved: number | null;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectFund/get-page-list-project-fund`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default projectFundServices;
