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
	table_list_report_disbursement,
	table_contract_fund_detail,
	table_contract_fund_detail_contractor,
	table_contractors_detail,
	table_contract_report_disbursement,
	table_contract_for_project,
	table_contract_fund_for_overview,
	table_contract_by_activity,
	table_contract_by_appendices,
	table_update_contractor_cat,
	table_project_for_contractor,
	table_contractor_cat_by_contractor,
	table_update_contractor_cat_by_contractor,
	table_requester_contractor,
	table_csct,
	table_pn_contract,
	table_contract_fund_by_contractor,
	table_contract_fund_for_overview_contractor,
	table_contract_fund_detail_paged,
	table_contractfund_detail_paged_contract_contract_fund,

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
	dropdown_project,
	dropdown_contractor_in_project,
	dropdown_activity_in_project,

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
	detail_contract,
	detail_report_disbursement,
	detail_progress_contract_fund_project,
	detail_activity_contract,
	detail_contractor_for_admin,
	detail_contract_addium,
	detail_contract_addendum,
	detail_csct,

	tree_task,
	count_unseen_noti,
	list_notify,
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

export enum STATUS_WORK_PROJECT {
	NOT_DONE,
	ON_SCHEDULE,
	SLOW_PROGRESS,
}

export enum TYPE_OF_WORK {
	ARISE,
	HAVE_PLAN,
}

export enum STATE_WORK {
	NOT_PROCESSED,
	PROCESSING,
	COMPLETED,
	REJECTED,
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
	NOT_REPORT, // Chưa báo cáo
	REPORTED, // Đã báo cáo || Chưa duyệt
	APPROVED, // Đã duyệt
	REJECTED, // Đã từ chối
}

export enum STATE_REPORT_DISBURSEMENT_OVERVIEW {
	NOT_APPROVED,
	APPROVED,
	REJECTED,
}

export enum TYPE_WORK {
	TASK,
	SUB_TASK,
	SUB_SUB_TASK,
}

export enum SORT_TYPE {
	DECREASE = 1,
	INCREASE,
}

export enum STATE_NOTIFY {
	NOT_READ,
	READ,
}

export enum STATE_CONTRACT_WORK {
	EXPIRED, //HẾT HẠN
	PROCESSING, //ĐANG THỰC HIỆN
	END, //HỦY
}

export enum TYPE_NOTIFY {
	PROJECT = 1,
	REPORT,
	CONTRACT,
	OVERVIEW,
	CONTRACT_FUND,
	APPROVAL_CONTRACTOR,
}

export enum TYPE_SPECIAL {
	NORMAL,
	SENIOR,
}

export enum STATE_APPROVED {
	NOT_REPORTED, // 0: chưa duyệt
	APPROVED, //1: đã duyệt
	REJECTED, //2: đã từ chối
}

export enum STATUS_CSCT {
	NUMBER_ISSUED = 1, // Đã cấp số
	PENDING_APPROVAL, // Chờ phê duyệt
	APPROVED, // Đã phê duyệt
	REJECTED, // Bị từ chối
}
