import {Buildings2, Data, DocumentText1, ElementEqual, Receipt21, ReceiptItem, TagUser, UserOctagon} from 'iconsax-react';
import icons from '../images/icons';
import {TYPE_DATE} from './enum';

export const MAXIMUM_FILE = 10; //MB

export const allowFiles = [
	'application/pdf',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'image/jpeg',
	'image/jpg',
	'image/png',
];

export enum PATH {
	Any = 'any',

	Login = '/auth/login',
	ForgotPassword = '/auth/forgot-password',

	Profile = '/profile',
	ChangePassword = '/change-password',

	Home = '/',

	Project = '/project',
	ProjectCreate = '/project/create',
	ProjectInfo = '/project/infor-project',
	ProjectContractor = '/project/infor-contractor',
	ProjectDisbursementProgress = '/project/disbursement-progress',
	ProjectWorkReport = '/project/work-report',

	UpdateInfoProject = '/project/update/infor-project',
	UpdateInfoCapital = '/project/update/info-capital',
	UpdateInfoContractor = '/project/update/infor-contractor',

	Task = '/task',
	CreateTask = '/task/create',

	Branch = '/branch',
	Contractor = '/contractor',
	GroupContractor = '/group-contractor',
	User = '/user',
	Account = '/account',
}

export const Menu: {
	title: string;
	path: string;
	pathActive?: string;
	icon: any;
}[] = [
	{
		title: 'Tổng quan',
		path: PATH.Home,
		pathActive: PATH.Home,
		icon: ElementEqual,
	},
	{
		title: 'Quản lý dự án',
		path: PATH.Project,
		pathActive: PATH.Project,
		icon: DocumentText1,
	},
	{
		title: 'Quản lý quy trình',
		path: PATH.Task,
		pathActive: PATH.Task,
		icon: ReceiptItem,
	},
	{
		title: 'Quản lý chi nhánh',
		path: PATH.Branch,
		pathActive: PATH.Branch,
		icon: Data,
	},
	{
		title: 'Quản lý nhóm nhà thầu',
		path: PATH.GroupContractor,
		pathActive: PATH.GroupContractor,
		icon: Buildings2,
	},
	{
		title: 'Quản lý nhà thầu',
		path: PATH.Contractor,
		pathActive: PATH.Contractor,
		icon: Receipt21,
	},
	{
		title: 'Quản lý nhân viên',
		path: PATH.User,
		pathActive: PATH.User,
		icon: UserOctagon,
	},
	{
		title: 'Quản lý tài khoản',
		path: PATH.Account,
		pathActive: PATH.Account,
		icon: TagUser,
	},
];

export const KEY_STORE = 'task-monitor-admin';

export const ListOptionTimePicker: {
	name: string;
	value: number;
}[] = [
	{
		name: 'Hôm nay',
		value: TYPE_DATE.TODAY,
	},
	{
		name: 'Tuần này',
		value: TYPE_DATE.THIS_WEEK,
	},
	{
		name: 'Tuần trước',
		value: TYPE_DATE.LAST_WEEK,
	},
	{
		name: 'Tháng này',
		value: TYPE_DATE.THIS_MONTH,
	},
	{
		name: 'Tháng trước',
		value: TYPE_DATE.LAST_MONTH,
	},
	{
		name: 'Năm này',
		value: TYPE_DATE.THIS_YEAR,
	},
	{
		name: 'Lựa chọn',
		value: TYPE_DATE.LUA_CHON,
	},
];
