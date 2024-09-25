import axiosClient from '.';

const contractorServices = {
	listContractor: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			type: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/get-page-list-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
};
export default contractorServices;
