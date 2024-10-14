import React from 'react';

import {ILastMonthReport, PropsPresentReport} from './interfaces';
import styles from './PresentReport.module.scss';
import DataWrapper from '~/components/common/DataWrapper';
import {QUERY_KEY, STATE_WORK_PROJECT, STATUS_CONFIG, STATUS_WORK_PROJECT, TYPE_OF_WORK} from '~/constants/config/enum';
import StateActive from '~/components/common/StateActive';
import Tippy from '@tippyjs/react';
import Table from '~/components/common/Table';
import FilterCustom from '~/components/common/FilterCustom';
import Search from '~/components/common/Search';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import Noti from '~/components/common/DataWrapper/components/Noti';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import Pagination from '~/components/common/Pagination';
import activityServices from '~/services/activityServices';

function PresentReport({dataDetailReportWork}: PropsPresentReport) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _state, _completeState} = router.query;

	const listReportPresent = useQuery(
		[QUERY_KEY.table_list_report_present, _page, _pageSize, _keyword, _state, _completeState, dataDetailReportWork],
		{
			queryFn: () =>
				httpRequest({
					http: activityServices.listActyvityLastMonth({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 20,
						keyword: (_keyword as string) || '',
						status: STATUS_CONFIG.ACTIVE,
						year: dataDetailReportWork?.year ? Number(dataDetailReportWork?.year) : null,
						month: dataDetailReportWork?.month ? Number(dataDetailReportWork?.month) : null,
						state: !!_state ? Number(_state) : null,
						projectUuid: (dataDetailReportWork?.project?.uuid as string) || '',
					}),
				}),
			select(data) {
				return data;
			},
			enabled: !!dataDetailReportWork,
		}
	);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h4>Danh sách công việc</h4>
			</div>
			<div className={styles.main_table}>
				<div className={styles.head_filt}>
					<div className={styles.main_search}>
						<div className={styles.search}>
							<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công việc' />
						</div>
						<div className={styles.filter}>
							<FilterCustom
								isSearch
								name='Trạng thái'
								query='_state'
								listFilter={[
									{
										id: STATE_WORK_PROJECT.NOT_PROCESSED,
										name: 'Chưa xử lý',
									},
									{
										id: STATE_WORK_PROJECT.PROCESSING,
										name: 'Đang xử lý',
									},
									{
										id: STATE_WORK_PROJECT.COMPLETED,
										name: 'Đã hoàn thành',
									},
								]}
							/>
						</div>
					</div>
				</div>
				<WrapperScrollbar>
					<DataWrapper
						data={listReportPresent?.data?.items || []}
						loading={listReportPresent.isLoading}
						noti={<Noti title='Dữ liệu trống!' des='Danh sách báo cáo hiện tại trống!' />}
					>
						<Table
							data={listReportPresent?.data?.items || []}
							column={[
								{
									title: 'STT',
									render: (data: ILastMonthReport, index: number) => <>{index + 1}</>,
								},
								{
									title: 'Tên công việc',
									render: (data: ILastMonthReport) => (
										<Tippy content={data?.name}>
											<p className={styles.name}>{data?.name || '---'}</p>
										</Tippy>
									),
								},
								{
									title: 'Giai đoạn thực hiện',
									render: (data: ILastMonthReport) => (
										<>
											{data?.stage == null && '---'}
											{data?.stage == 1 && 'Giai đoạn chuẩn bị đầu tư'}
											{data?.stage == 2 && 'Giai đoạn thực hiện đầu tư'}
											{data?.stage == 3 && 'Giai đoạn kết thúc đầu tư'}
										</>
									),
								},

								{
									title: 'Loại công việc',
									render: (data: ILastMonthReport) => (
										<>
											{data?.isWorkFlow == TYPE_OF_WORK.ARISE && 'Phát sinh'}
											{data?.isWorkFlow == TYPE_OF_WORK.HAVE_PLAN && 'Có kế hoạch'}
										</>
									),
								},
								{
									title: 'Megatype',
									render: (data: ILastMonthReport) => <>{data?.metaType || '---'}</>,
								},
								{
									title: 'Trạng thái',
									render: (data: ILastMonthReport) => (
										<StateActive
											stateActive={data?.state}
											listState={[
												{
													state: STATE_WORK_PROJECT.NOT_PROCESSED,
													text: 'Chưa xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#FDAD73',
												},
												{
													state: STATE_WORK_PROJECT.PROCESSING,
													text: 'Đang xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#16C1F3',
												},
												{
													state: STATE_WORK_PROJECT.COMPLETED,
													text: 'Đã hoàn thành',
													textColor: '#FFFFFF',
													backgroundColor: '#06D7A0',
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
						total={listReportPresent?.data?.pagination?.totalCount}
						dependencies={[_pageSize, _keyword, _state, _completeState]}
					/>
				</WrapperScrollbar>
			</div>
		</div>
	);
}

export default PresentReport;
