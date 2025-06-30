import React, {useState} from 'react';

import {IReportWork, PropsMainPageReportWork} from './interfaces';
import styles from './MainPageReportWork.module.scss';
import Search from '~/components/common/Search';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATE_REPORT, STATUS_CONFIG, STATE_COMPLETE_REPORT, TYPE_ACCOUNT} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import FilterCustom from '~/components/common/FilterCustom';
import StateActive from '~/components/common/StateActive';
import IconCustom from '~/components/common/IconCustom';
import {DriverRefresh, Eye} from 'iconsax-react';
import reportServices from '~/services/reportServices';
import Moment from 'react-moment';
import {generateYearsArray} from '~/common/funcs/selectDate';
import userServices from '~/services/userServices';
import Tippy from '@tippyjs/react';
import Button from '~/components/common/Button';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import Popup from '~/components/common/Popup';
import FormExportExcel from '../FormExportExcel';
import Dialog from '~/components/common/Dialog';

function MainPageReportWork({}: PropsMainPageReportWork) {
	const router = useRouter();
	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const [isExportPopupOpen, setExportPopupOpen] = useState(false);
	const [refeshUuid, setRefeshUuid] = useState(false);

	const {_page, _pageSize, _keyword, _year, _month, _state, _completeState, _reporterUuid} = router.query;

	const {data: listUser} = useQuery([QUERY_KEY.dropdown_user], {
		queryFn: () =>
			httpRequest({
				http: userServices.categoryUser({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					roleUuid: '',
					type: TYPE_ACCOUNT.USER,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listReport = useQuery(
		[QUERY_KEY.table_list_report, _page, _pageSize, _keyword, _year, _month, _state, _completeState, _reporterUuid],
		{
			queryFn: () =>
				httpRequest({
					http: reportServices.listReport({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 10,
						keyword: (_keyword as string) || '',
						status: STATUS_CONFIG.ACTIVE,
						year: !!_year ? Number(_year) : null,
						month: !!_month ? Number(_month) : null,
						state: !!_state ? Number(_state) : null,
						completeState: !!_completeState ? Number(_completeState) : null,
						reporterUuid: _reporterUuid as string,
					}),
				}),
			select(data) {
				return data;
			},
		}
	);

	const handleCloseExport = () => {
		setExportPopupOpen(false);
	};

	const handleOpenExport = () => {
		setExportPopupOpen(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công trình' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Năm'
							query='_year'
							listFilter={years?.map((v) => ({
								id: v,
								name: `Năm ${v}`,
							}))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Tháng'
							query='_month'
							listFilter={months?.map((v) => ({
								id: v,
								name: `Tháng ${v}`,
							}))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_state'
							listFilter={[
								{
									id: STATE_REPORT.REJECTED,
									name: 'Bị từ chối',
								},
								{
									id: STATE_REPORT.REPORTED,
									name: 'Đã duyệt',
								},
								{
									id: STATE_REPORT.PENDING_APPROVAL,
									name: 'Đã báo cáo',
								},
								{
									id: STATE_REPORT.IN_PROGRESS,
									name: 'Chưa báo cáo',
								},
							]}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Tình trạng'
							query='_completeState'
							listFilter={[
								{
									id: STATE_COMPLETE_REPORT.NOT_DONE,
									name: 'Chưa thực hiện',
								},
								{
									id: STATE_COMPLETE_REPORT.ON_SCHEDULE,
									name: 'Đúng tiến độ',
								},
								{
									id: STATE_COMPLETE_REPORT.SLOW_PROGRESS,
									name: 'Chậm tiến độ',
								},
							]}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Người báo cáo'
							query='_reporterUuid'
							listFilter={listUser?.map((v: any) => ({
								id: v?.uuid,
								name: v?.fullname,
							}))}
						/>
					</div>
					<div className={styles.btn}>
						<Button rounded_8 w_fit p_8_16 green bold onClick={handleOpenExport}>
							<Image src={icons.exportExcel} alt='icon down' width={20} height={20} />
							Xuất DSNV chưa báo cáo
						</Button>
					</div>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listReport?.data?.items || []}
					loading={listReport.isLoading}
					noti={<Noti title='Dữ liệu trống!' des='Danh sách trống!' />}
				>
					<Table
						fixedHeader={true}
						data={listReport?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IReportWork, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Tên công trình',
								fixedLeft: true,
								render: (data: IReportWork) => (
									<Tippy content={data?.project?.name}>
										<p className={styles.name}>{data?.project?.name}</p>
									</Tippy>
								),
							},
							{
								title: 'Kế hoạch tháng',
								render: (data: IReportWork) => (
									<>
										<span>
											Tháng {data?.month} - {data?.year}
										</span>
									</>
								),
							},
							{
								title: 'Người báo cáo',
								render: (data: IReportWork) => <>{data?.reporter?.fullname}</>,
							},
							{
								title: 'Lãnh đạo phụ trách',
								render: (data: IReportWork) => <>{data?.project?.leader?.fullname}</>,
							},
							{
								title: 'Số công việc thực hiện',
								render: (data: IReportWork) => (
									<>
										<span style={{color: '#2970FF'}}>{data?.completedActivity}</span>/<span>{data?.totalActivity}</span>
									</>
								),
							},

							{
								title: 'Ngày gửi báo cáo',
								render: (data: IReportWork) => (
									<>{data?.completed ? <Moment date={data?.completed} format='DD/MM/YYYY' /> : '---'}</>
								),
							},
							{
								title: 'Trạng thái',
								render: (data: IReportWork) => (
									<StateActive
										stateActive={data?.state}
										listState={[
											{
												state: STATE_REPORT.REJECTED,
												text: 'Bị từ chối',
												textColor: '#fff',
												backgroundColor: '#EE464C',
											},
											{
												state: STATE_REPORT.REPORTED,
												text: 'Đã duyệt',
												textColor: '#fff',
												backgroundColor: '#16C1F3',
											},
											{
												state: STATE_REPORT.PENDING_APPROVAL,
												text: 'Đã báo cáo',
												textColor: '#fff',
												backgroundColor: '#06D7A0',
											},
											{
												state: STATE_REPORT.IN_PROGRESS,
												text: 'Chưa báo cáo',
												textColor: '#fff',
												backgroundColor: '#FF852C',
											},
										]}
									/>
								),
							},
							{
								title: 'Tình trạng',
								render: (data: IReportWork) => (
									<StateActive
										isBox={false}
										stateActive={data?.completeState}
										listState={[
											{
												state: STATE_COMPLETE_REPORT.NOT_DONE,
												text: 'Chưa thực hiện',
												textColor: '#FF852C',
												backgroundColor: '#FF852C',
											},
											{
												state: STATE_COMPLETE_REPORT.ON_SCHEDULE,
												text: 'Đúng tiến độ',
												textColor: '#005994',
												backgroundColor: '#005994',
											},
											{
												state: STATE_COMPLETE_REPORT.SLOW_PROGRESS,
												text: 'Chậm tiến độ',
												textColor: '#EE464C',
												backgroundColor: '#EE464C',
											},
										]}
									/>
								),
							},
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IReportWork) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											href={`/report-work/${data?.uuid}`}
											type='edit'
											icon={<Eye fontSize={20} fontWeight={600} />}
											tooltip='Xem chi tiết'
										/>
										<IconCustom
											onClick={() => setRefeshUuid(true)}
											type='edit'
											icon={<DriverRefresh fontSize={20} fontWeight={600} />}
											tooltip='Xem chi tiết'
										/>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 10}
					total={listReport?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _year, _month, _state, _completeState, _reporterUuid]}
				/>
			</WrapperScrollbar>
			<Popup open={isExportPopupOpen} onClose={handleCloseExport}>
				<FormExportExcel onClose={handleCloseExport} />
			</Popup>
			<Dialog
				type='error'
				open={!!refeshUuid}
				onClose={() => setRefeshUuid(false)}
				title={'Refesh dữ liệu'}
				note={'Bạn có chắc chắn muốn refesh dữ liệu này?'}
				onSubmit={() => {}}
			/>
		</div>
	);
}

export default MainPageReportWork;
