import axiosClient from '.';

const contractorcatServices = {
	getListContractorCat: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractorCat/get-page-list-Contractor-Cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	categoryCat: (
		data: {
			keyword: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractorCat/category-contractor-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
};
export default contractorcatServices;
