import React from 'react';

import {IReportWork, PropsMainPlanNextMonth} from './interfaces';
import styles from './MainPlanNextMonth.module.scss';
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
import {Eye} from 'iconsax-react';
import reportServices from '~/services/reportServices';
import Moment from 'react-moment';
import {generateYearsArray} from '~/common/funcs/selectDate';
import userServices from '~/services/userServices';
import {PATH} from '~/constants/config';
import Tippy from '@tippyjs/react';

function MainPlanNextMonth({}: PropsMainPlanNextMonth) {
	const router = useRouter();
	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const {_page, _pageSize, _keyword, _year, _month, _completeState, _reporterUuid} = router.query;

	const listReport = useQuery(
		[QUERY_KEY.table_plan_next_month, _page, _pageSize, _keyword, _year, _month, _completeState, _reporterUuid],
		{
			queryFn: () =>
				httpRequest({
					http: reportServices.listReportPlanNextMonth({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 10,
						keyword: (_keyword as string) || '',
						status: STATUS_CONFIG.ACTIVE,
						year: !!_year ? Number(_year) : null,
						month: !!_month ? Number(_month) : null,
						completeState: !!_completeState ? Number(_completeState) : null,
						reporterUuid: _reporterUuid as string,
					}),
				}),
			select(data) {
				return data;
			},
		}
	);

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
								title: 'Người báo cáo',
								render: (data: IReportWork) => <>{data?.reporter?.fullname}</>,
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
								title: 'Ngày tạo báo cáo',
								render: (data: IReportWork) => (
									<>{data?.created ? <Moment date={data?.created} format='DD/MM/YYYY' /> : '---'}</>
								),
							},
							{
								title: 'Trạng thái',
								render: (data: IReportWork) => (
									<StateActive
										stateActive={data?.state}
										listState={[
											{
												state: STATE_REPORT.PLANNING,
												text: 'Lên kế hoạch',
												textColor: '#fff',
												backgroundColor: '#5B70B3',
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
											href={`${PATH.PlanNextMonth}/${data?.uuid}`}
											type='edit'
											icon={<Eye fontSize={20} fontWeight={600} />}
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
					dependencies={[_pageSize, _keyword, _year, _month, _completeState, _reporterUuid]}
				/>
			</WrapperScrollbar>
		</div>
	);
}

export default MainPlanNextMonth;
