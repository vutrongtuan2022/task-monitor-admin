import axiosClient from '.';

const userServices = {
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
		return axiosClient.post(`/Project/get-all-project`, data, {
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

export default userServices;
