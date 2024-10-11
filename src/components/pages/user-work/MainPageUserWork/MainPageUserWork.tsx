import React, {useState} from 'react';
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';

import {IBranches, PropsMainPageUserWork} from './interfaces';
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
import branchesServices from '~/services/branchesServices';
import clsx from 'clsx';
import FilterCustom from '~/components/common/FilterCustom';
import StateActive from '~/components/common/StateActive';

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

	const {_page, _pageSize, _keyword} = router.query;

	const [uuidDescription, setUuidDescription] = useState<string>('');

	const listBranches = useQuery([QUERY_KEY.table_branches, _page, _pageSize, _keyword], {
		queryFn: () =>
			httpRequest({
				http: branchesServices.getListBranches({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
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
							query='_activityType'
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
					data={listBranches?.data?.items || []}
					loading={listBranches.isLoading}
					noti={<Noti title='Dữ liệu trống!' des='Danh sách công việc của nhân viên trống!' />}
				>
					<Table
						fixedHeader={true}
						data={listBranches?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IBranches, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Tháng báo cáo',
								fixedLeft: true,
								render: (data: IBranches) => <>{data?.code}</>,
							},
							{
								title: 'Tên công trình',
								render: (data: IBranches) => <>{data?.name}</>,
							},
							{
								title: 'Tên công việc',
								render: (data: IBranches) => <>{data?.address || '---'}</>,
							},
							{
								title: 'Giai đoạn thực hiện',
								render: (data: IBranches) => <>{data?.address || '---'}</>,
							},
							{
								title: 'Megatype',
								render: (data: IBranches) => <>{data?.address || '---'}</>,
							},
							{
								title: 'Người báo cáo',
								render: (data: IBranches) => <>{data?.address || '---'}</>,
							},
							{
								title: 'Loại công việc',
								render: (data: IBranches) => <>{data?.address || '---'}</>,
							},
							{
								title: 'Khó khăn vướng mắc',
								render: (data: IBranches) => (
									<TippyHeadless
										maxWidth={'100%'}
										interactive
										onClickOutside={() => setUuidDescription('')}
										visible={uuidDescription == data?.uuid}
										placement='bottom'
										render={(attrs) => (
											<div className={styles.main_description}>
												<p>{data?.note}</p>
											</div>
										)}
									>
										<Tippy content='Xem chi tiết mô tả'>
											<p
												onClick={() => {
													if (!data.note) {
														return;
													} else {
														setUuidDescription(uuidDescription ? '' : data.uuid);
													}
												}}
												className={clsx(styles.description, {[styles.active]: uuidDescription == data.uuid})}
											>
												{data?.note || '---'}
											</p>
										</Tippy>
									</TippyHeadless>
								),
							},
							{
								title: 'Tiến độ công việc',
								render: (data: IBranches) => <>{data?.address || '---'}</>,
							},
							{
								title: 'Trạng thái',
								fixedRight: true,
								render: (data: IBranches) => (
									<StateActive
										stateActive={1}
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
								render: (data: IBranches) => (
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
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 20}
					total={listBranches?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword]}
				/>
			</WrapperScrollbar>
		</div>
	);
}

export default MainPageUserWork;
