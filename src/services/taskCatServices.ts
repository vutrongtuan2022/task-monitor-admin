import axiosClient from '.';

const taskCatServices = {
	categoryTaskCat: (
		data: {
			keyword: string;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/TaskCat/category-task-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	listTaskCat: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/TaskCat/get-page-list-task-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateStatusTaskCat: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/TaskCat/update-status-task-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailTaskCat: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/TaskCat/detail-task-cat`, data, {
			cancelToken: tokenAxios,
		});
	},
	listParentTask: (
		data: {
			uuid: string;
			type: number;
			stage: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/TaskCat/get-list-parent-task`, data, {
			cancelToken: tokenAxios,
		});
	},
	importTaskExcel: (data: {name: any; FileData: any; Type: any}, tokenAxios?: any) => {
		return axiosClient.post(`/TaskCat/import_excel`, data, {
			cancelToken: tokenAxios,
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: 'text/plain',
			},
		});
	},
};

export default taskCatServices;
