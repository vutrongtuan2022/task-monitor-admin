import axiosClient from '.';

const userServices = {
	listUser: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/get-page-list-user`, data, {
			cancelToken: tokenAxios,
		});
	},

	updateStatus: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/update-status`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertUser: (
		data: {
			uuid: string;
			code: string;
			fullName: string;
			email: string;
			gender: number;
			phone: string;
			birthday: string;
			address: string;
			matp: string;
			maqh: string;
			xaid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/upsert-user`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailUser: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/detail-user`, data, {
			cancelToken: tokenAxios,
		});
	},
	addAccountUser: (
		data: {
			uuid: string;
			accountUsername: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/add-account-user`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default userServices;
