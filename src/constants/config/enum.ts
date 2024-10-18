export enum QUERY_KEY {
	table_group_contractor,
	table_contractor,
	table_task_cat,
	table_list_user,
	table_role,
	table_branches,
	table_list_account,
	table_list_activity_project,
	table_list_project_fund,
	table_list_contractor_project,
	table_list_report,
	table_list_user_activities,
	table_list_report_last_month,
	table_list_report_present,
	table_project_fund_all,
	table_plan_next_month,
	table_list_report_work_last_month,
	table_list_work_report,
	table_work_report_overview,
	table_next_plan_report_overview,

	dropdown_role,
	dropdown_group_contractor,
	dropdown_contractor,
	dropdown_province,
	dropdown_district,
	dropdown_town,
	dropdown_branches,
	dropdown_task_cat,
	dropdown_user,
	dropdown_manager,
	dropdown_can_bo_chuyen_quan,
	table_overview_report,

	detail_contractor,
	detail_user,
	detail_account,
	detail_task,
	detail_project,
	detail_progress_project,
	detail_progress_fund_project,
	detail_general_update_project,
	detail_budget_project,
	detail_contractor_project,
	detail_update_contractor_project,
	detail_group_contractor,
	detail_branches,
	detail_report_work,
	detail_report_overview,
	detail_project_report_overview,
	detail_disbursement_report_overview,
	detail_plan_next_month,
	detail_project_fund,
	detail_profile,
	detail_profile_update,

	tree_task,
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

export enum STATE_PROJECT {
	PREPARE = 1,
	DO,
	FINISH,
}

export enum STATE_WORK_PROJECT {
	NOT_PROCESSED,
	PROCESSING,
	COMPLETED,
}

export enum STATUS_WORK_PROJECT {
	NOT_DONE,
	ON_SCHEDULE,
	SLOW_PROGRESS,
}

export enum TYPE_OF_WORK {
	ARISE,
	HAVE_PLAN,
}

export enum STATE_REPORT_WORK {
	NOT_PROCESSED,
	PROCESSING,
	COMPLETED,
}

export enum STATE_REPORT {
	REJECTED,
	REPORTED,
	PLANNING,
	PENDING_APPROVAL,
	IN_PROGRESS,
}

export enum STATE_COMPLETE_REPORT {
	NOT_DONE,
	ON_SCHEDULE,
	SLOW_PROGRESS,
}

export enum STATUS_DISBURSEMENT_PROJECT {
	NOT_APPROVED,
	APPROVED,
	REJECTED,
}

export enum STATE_REPORT_DISBURSEMENT {
	NOT_APPROVED,
	APPROVED,
	REJECTED,
}
