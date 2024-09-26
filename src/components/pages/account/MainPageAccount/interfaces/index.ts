export interface PropsMainPageAccount {}

export interface IAccount {
	role: {
		code: string;
		name: string;
		uuid: string;
	};
	user: {
		code: string;
		name: string;
		uuid: string;
	};
	updated: null;
	status: number;
	created: string;
	userName: string;
	uuid: string;
}
