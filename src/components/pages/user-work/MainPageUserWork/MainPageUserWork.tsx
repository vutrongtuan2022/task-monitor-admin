import React, {useState} from 'react';
import Tippy from '@tippyjs/react';

import {IUserWork, PropsMainPageUserWork} from './interfaces';
import styles from './MainPageUserWork.module.scss';
import Search from '~/components/common/Search';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATE_REPORT_WORK, STATUS_CONFIG, STATUS_REPORT_WORK, TYPE_OF_WORK} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import FilterCustom from '~/components/common/FilterCustom';
import StateActive from '~/components/common/StateActive';
import activityServices from '~/services/activityServices';
import Progress from '~/components/common/Progress';

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

function MainPageUserWork({}: PropsMainPageUserWork) {
	const router = useRouter();
	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const {_page, _pageSize, _keyword, _year, _month, _state, _type} = router.query;

	const listUserActivities = useQuery([QUERY_KEY.table_list_user_activities, _page, _pageSize, _keyword, _year, _month, _state, _type], {
		queryFn: () =>
			httpRequest({
				http: activityServices.listUserActivities({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
					year: !!_year ? Number(_year) : null,
					month: !!_month ? Number(_month) : null,
					type: !!_type ? Number(_type) : null,
					state: !!_state ? Number(_state) : null,
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
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công việc, dự án' />
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
							name='Loại công việc'
							query='_type'
							listFilter={[
								{
									id: TYPE_OF_WORK.ARISE,
									name: 'Phát sinh',
								},
								{
									id: TYPE_OF_WORK.HAVE_PLAN,
									name: 'Có kế hoạch',
								},
							]}
						/>
					</div>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listUserActivities?.data?.items || []}
					loading={listUserActivities.isLoading}
					noti={<Noti title='Dữ liệu trống!' des='Danh sách trống!' />}
				>
					<Table
						fixedHeader={true}
						data={listUserActivities?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IUserWork, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Tháng báo cáo',
								fixedLeft: true,
								render: (data: IUserWork) => (
									<>
										{data?.month || '---'}/{data?.year || '---'}
									</>
								),
							},
							{
								title: 'Tên công trình',
								render: (data: IUserWork) => <>{data?.project?.name || '---'}</>,
							},
							{
								title: 'Tên công việc',
								render: (data: IUserWork, index: number) => (
									<>
										{(data?.activity && (
											<Tippy content={data?.activity?.name}>
												<p className={styles.name}>{data?.activity?.name || '---'}</p>
											</Tippy>
										)) ||
											'---'}
									</>
								),
							},
							{
								title: 'Giai đoạn thực hiện',
								render: (data: IUserWork) => (
									<span style={{color: '#2970FF'}}>
										{data?.stage == -1 && '---'}
										{data?.stage == 1 && 'Giai đoạn chuẩn bị đầu tư'}
										{data?.stage == 2 && 'Giai đoạn thực hiện đầu tư'}
										{data?.stage == 3 && 'Giai đoạn kết thúc đầu tư xây dựng'}
									</span>
								),
							},
							{
								title: 'Megatype',
								render: (data: IUserWork) => <>{data?.megatype || '---'}</>,
							},
							{
								title: 'Người báo cáo',
								render: (data: IUserWork) => <>{data?.reporter?.fullname || '---'}</>,
							},
							{
								title: 'Loại công việc',
								render: (data: IUserWork) => (
									<>
										{data?.isInWorkFlow && 'Có kế hoạch'}
										{!data?.isInWorkFlow && 'Phát sinh'}
									</>
								),
							},
							{
								title: 'Khó khăn vướng mắc',
								render: (data: IUserWork, index: number) => (
									<>
										{(data?.issue && (
											<Tippy content={data?.issue}>
												<p className={styles.name}>{data?.issue || '---'}</p>
											</Tippy>
										)) ||
											'---'}
									</>
								),
							},
							{
								title: 'Tiến độ công việc',
								render: (data: IUserWork) => <Progress percent={data?.progress} width={80} />,
							},
							{
								title: 'Trạng thái',
								fixedRight: true,
								render: (data: IUserWork) => (
									<StateActive
										stateActive={data?.activity?.state}
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
								render: (data: IUserWork) => (
									<StateActive
										isBox={false}
										stateActive={data?.deadlineState}
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
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 20}
					total={listUserActivities?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _year, _month, _state, _type]}
				/>
			</WrapperScrollbar>
		</div>
	);
}

export default MainPageUserWork;
