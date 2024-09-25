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
	upsertContractor: (
		data: {
			uuid: string;
			code: string;
			name: string;
			type: number | null;
			note: string;
			matp: string;
			maqh: string;
			xaid: string;
			address: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contractor/upsert-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
};
export default contractorServices;
