export interface PropsMainPageApprove {
	uuid: string;
	contractor: {
		uuid: string;
		code: string;
		name: string;
	};
	contractorCat: {
		uuid: string;
		id: number;
		code: string;
		name: string;
		isDefault: number;
	};
	user: {
		uuid: string;
		fullname: string;
		code: string;
	};
	timeCreated: '2025-02-19';
	status: number;
}
