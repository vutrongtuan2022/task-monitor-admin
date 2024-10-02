import axiosClient from '.';

const projectServices = {
	listProject: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			state: number | null;
			userUuid?: string;
			managerUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Project/get-page-list-project`, data, {
			cancelToken: tokenAxios,
		});
	},

	updateStatus: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Project/update-status-project`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default projectServices;
