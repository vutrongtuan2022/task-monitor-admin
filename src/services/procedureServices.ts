import axiosClient from '.';

const procedureServices = {
	listTree: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Role/category-role`, data, {
			cancelToken: tokenAxios,
		});
	},
	addTask: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Role/category-role`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default procedureServices;
