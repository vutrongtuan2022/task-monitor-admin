import axiosClient from '.';

const roleServices = {
	listRole: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Role/category-role`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default roleServices;
