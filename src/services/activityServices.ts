import axiosClient from '.';

const activityServices = {
	listActivity: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			projectUuid: string;
			activityType: number | null;
			state: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-list-activity`, data, {
			cancelToken: tokenAxios,
		});
	},
	listUserActivities: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			month: number | null;
			year: number | null;
			state: number | null;
			type: number | null;
			reporterUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/admin-get-paged-user-activities`, data, {
			cancelToken: tokenAxios,
		});
	},
	listActyvityLastMonth: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			state: number | null;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-list-user-activity-last-month`, data, {
			cancelToken: tokenAxios,
		});
	},
	listActyvityInReport: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			state: number | null;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Activity/get-page-activity-in-report`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default activityServices;
