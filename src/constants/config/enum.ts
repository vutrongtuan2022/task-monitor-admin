export enum QUERY_KEY {
	detail_group_contractor,
	detail_branches,

	table_group_contractor,
	table_contractor,
	table_list_user,
	table_role,
	table_branches,
	table_list_account,

	dropdown_role,
	dropdown_category_group_contractor,
	dropdown_province,
	dropdown_district,
	dropdown_town,

	detail_contractor,
	detail_user,
	detail_account,
}

export enum TYPE_DATE {
	ALL = -1,
	TODAY = 1,
	YESTERDAY = 2,
	THIS_WEEK = 3,
	LAST_WEEK = 4,
	THIS_MONTH = 5,
	LAST_MONTH = 6,
	THIS_YEAR = 7,
	LAST_7_DAYS = 8,
	LUA_CHON = 9,
}

export enum TYPE_ACCOUNT {
	USER = 1,
	MANAGER,
	ADMIN,
}

export enum STATUS_ACCOUNT {
	NOT_HAVE = 0,
	HAVE = 1,
	LOCK = 2,
}

export enum STATUS_CONFIG {
	ACTIVE = 1,
	NOT_ACTIVE,
}

export enum TYPE_GENDER {
	MALE,
	FEMALE,
	OTHER,
}

export enum TYPE_WORK_STATUS {
	PREPARE = 0,
	DO,
	FINISH,
}
