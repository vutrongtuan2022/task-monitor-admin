import axiosClient from '.';

const contractsFundServices = {
	detailContractFund: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/contractfund-detail`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailContractFundFundPaged: (
		data: {
			pageSize: number;
			page: number;
			keyword: string | null;
			status: number;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/contractfund-detail-contracts-paged`, data, {
			cancelToken: tokenAxios,
		});
	},
	getAdminContractFundPaged: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
			month: number | null;
			year: number | null;
			state: number | null;
			userUuid: string;
			projectUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/get-admin-contract-funds-paged`, data, {
			cancelToken: tokenAxios,
		});
	},
	contractFundByContractor: (
		data: {
			pageSize: number;
			page: number;
			keyword: string | null;
			status: number;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/get-contract-contract-fund-by-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},

	backStateContractFund: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ContractFund/admin-back-state-contract-fund`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default contractsFundServices;
