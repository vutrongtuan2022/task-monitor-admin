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
import {QUERY_KEY, STATE_REPORT_WORK, STATUS_CONFIG, STATUS_REPORT_WORK} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import FilterCustom from '~/components/common/FilterCustom';
import StateActive from '~/components/common/StateActive';
import IconCustom from '~/components/common/IconCustom';
import {Eye} from 'iconsax-react';
import reportServices from '~/services/reportServices';
import Moment from 'react-moment';

const generateYearsArray = (): number[] => {
	const currentYear = new Date().getFullYear();
	const startYear = currentYear - 15;
	const endYear = currentYear + 15;

	const years = [];
	for (let year = startYear; year <= endYear; year++) {
		years.push(year);
	}
	return years;
};

function MainPageReportWork({}: PropsMainPageReportWork) {
	const router = useRouter();
	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const {_page, _pageSize, _keyword, _year, _month, _state, _completeState} = router.query;

	const listReport = useQuery([QUERY_KEY.table_list_report, _page, _pageSize, _keyword, _year, _month, _state, _completeState], {
		queryFn: () =>
			httpRequest({
				http: reportServices.listReport({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
					year: !!_year ? Number(_year) : null,
					month: !!_month ? Number(_month) : null,
					state: !!_state ? Number(_state) : null,
					completeState: !!_completeState ? Number(_completeState) : null,
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
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên dự án, ID' />
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
									id: STATE_REPORT_WORK.NOT_PROCESSED,
									name: 'Chưa xử lý',
								},
								{
									id: STATE_REPORT_WORK.PROCESSING,
									name: 'Đang xử lý',
								},
								{
									id: STATE_REPORT_WORK.COMPLETED,
									name: 'Đã hoàn thành',
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
									id: STATUS_REPORT_WORK.NOT_DONE,
									name: 'Chưa thực hiện',
								},
								{
									id: STATUS_REPORT_WORK.ON_SCHEDULE,
									name: 'Đúng tiến độ',
								},
								{
									id: STATUS_REPORT_WORK.SLOW_PROGRESS,
									name: 'Chậm tiến độ',
								},
							]}
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
								render: (data: IReportWork) => <>{data?.nameProject}</>,
							},
							{
								title: 'Người báo cáo',
								render: (data: IReportWork) => <>{data?.nameReporter}</>,
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
								title: 'Ngày gửi báo cáo',
								render: (data: IReportWork) => (
									<>{data?.created ? <Moment date={data?.created} format='DD/MM/YYYY' /> : '---'}</>
								),
							},
							{
								title: 'Trạng thái',
								fixedRight: true,
								render: (data: IReportWork) => (
									<StateActive
										stateActive={data?.state}
										listState={[
											{
												state: STATE_REPORT_WORK.NOT_PROCESSED,
												text: 'Chưa xử lý',
												textColor: '#FFFFFF',
												backgroundColor: '#F37277',
											},
											{
												state: STATE_REPORT_WORK.PROCESSING,
												text: 'Đang xử lý',
												textColor: '#FFFFFF',
												backgroundColor: '#4BC9F0',
											},
											{
												state: STATE_REPORT_WORK.COMPLETED,
												text: 'Đã hoàn thành',
												textColor: '#FFFFFF',
												backgroundColor: '#06D7A0',
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
										stateActive={data?.status}
										listState={[
											{
												state: STATUS_REPORT_WORK.NOT_DONE,
												text: 'Chưa thực hiện',
												textColor: '#FF852C',
												backgroundColor: '#FF852C',
											},
											{
												state: STATUS_REPORT_WORK.ON_SCHEDULE,
												text: 'Đúng tiến độ',
												textColor: '#005994',
												backgroundColor: '#005994',
											},
											{
												state: STATUS_REPORT_WORK.SLOW_PROGRESS,
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
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 20}
					total={listReport?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _year, _month, _state, _completeState]}
				/>
			</WrapperScrollbar>
		</div>
	);
}

export default MainPageReportWork;
