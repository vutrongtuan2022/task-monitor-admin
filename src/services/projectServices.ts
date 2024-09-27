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
		return axiosClient.post(`/Project/update-status`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertProject: (
		data: {
			uuid: string;
			fullName: string;
			email: string;
			gender: number;
			phone: string;
			birthday: string | null;
			address: string;
			matp: string;
			maqh: string;
			xaid: string;
			note: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Project/upsert-user`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailProject: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Project/detail-user`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default userServices;
