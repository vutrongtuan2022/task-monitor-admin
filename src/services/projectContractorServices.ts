import axiosClient from '.';

const projectContractorServices = {
	detailContractorProject: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectContractor/admin-get-for-modify-project-contractor`, data, {
			cancelToken: tokenAxios,
		});
	},
	addContractorProject: (
		data: {
			projectUuid: string;
			contractorUuids: string[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ProjectContractor/credel-project-contractors`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default projectContractorServices;
