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
import {QUERY_KEY, STATUS_CONFIG, STATE_COMPLETE_REPORT, TYPE_OF_WORK, TYPE_ACCOUNT, TYPE_WORK, STATE_WORK} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import FilterCustom from '~/components/common/FilterCustom';
import StateActive from '~/components/common/StateActive';
import activityServices from '~/services/activityServices';
import Progress from '~/components/common/Progress';
import {generateYearsArray} from '~/common/funcs/selectDate';
import userServices from '~/services/userServices';
import projectServices from '~/services/projectServices';
import IconCustom from '~/components/common/IconCustom';
import {Eye} from 'iconsax-react';
import {PATH} from '~/constants/config';

function MainPageUserWork({}: PropsMainPageUserWork) {
	const router = useRouter();
	const years = generateYearsArray();
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const {_page, _pageSize, _keyword, _year, _month, _state, _reporterUuid, _type, _project} = router.query;

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

	const {data: listProject} = useQuery([QUERY_KEY.dropdown_project], {
		queryFn: () =>
			httpRequest({
				http: projectServices.categoryProject({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listUserActivities = useQuery(
		[QUERY_KEY.table_list_user_activities, _page, _pageSize, _keyword, _year, _month, _state, _type, _reporterUuid, _project],
		{
			queryFn: () =>
				httpRequest({
					http: activityServices.listActivityForActionNew({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 10,
						keyword: (_keyword as string) || '',
						status: STATUS_CONFIG.ACTIVE,
						state: !!_state ? Number(_state) : null,
						year: !!_year ? Number(_year) : null,
						month: !!_month ? Number(_month) : null,
						type: !!_type ? Number(_type) : null,
						projectUuid: (_project as string) || '',
						userUuid: (_reporterUuid as string) || '',
					}),
				}),
			select(data) {
				return data;
			},
		}
	);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công việc' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Dự án'
							query='_project'
							listFilter={listProject?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
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
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_state'
							listFilter={[
								{
									id: STATE_WORK.NOT_PROCESSED,
									name: 'Chưa xử lý',
								},
								{
									id: STATE_WORK.PROCESSING,
									name: 'Đang xử lý',
								},
								{
									id: STATE_WORK.COMPLETED,
									name: 'Đã hoàn thành',
								},
								{
									id: STATE_WORK.REJECTED,
									name: 'Bị từ chối',
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
					noti={<Noti title='Dữ liệu trống!' des='Danh sách công việc nhân viên trống!' />}
				>
					<Table
						fixedHeader={true}
						data={listUserActivities?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IUserWork, index: number) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										{index + 1}
									</p>
								),
							},
							{
								title: 'Tháng báo cáo',
								fixedLeft: true,
								render: (data: IUserWork) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										Tháng <span>{data?.report?.month}</span> - <span>{data?.report?.year}</span>
									</p>
								),
							},
							{
								title: 'Tên công trình',
								render: (data: IUserWork) => (
									<Tippy content={data?.report?.project?.name}>
										<p
											className={styles.name}
											style={{
												color:
													data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
											}}
										>
											{data?.report?.project?.name}
										</p>
									</Tippy>
								),
							},
							{
								title: 'Lãnh đạo phụ trách',
								render: (data: IUserWork) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										{data?.report?.project?.leader?.fullname}
									</p>
								),
							},
							{
								title: 'Tên công việc',
								render: (data: IUserWork) => (
									<Tippy content={data?.activity?.name}>
										<p
											className={styles.name}
											style={{
												color:
													data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
											}}
										>
											{data?.activity?.name}
										</p>
									</Tippy>
								),
							},
							{
								title: 'Giai đoạn thực hiện',
								render: (data: IUserWork) => (
									<span
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										{data?.stage == -1 || (!data?.stage && '---')}
										{data?.stage == 1 && 'Giai đoạn chuẩn bị đầu tư'}
										{data?.stage == 2 && 'Giai đoạn thực hiện đầu tư'}
										{data?.stage == 3 && 'Giai đoạn kết thúc đầu tư'}
									</span>
								),
							},
							{
								title: 'Megatype',
								render: (data: IUserWork) => (
									<p>
										<span style={{color: '#2970FF'}}>{data?.type == TYPE_WORK.TASK && 'Task'}</span>
										<span>{data?.type == TYPE_WORK.SUB_TASK && 'Subtask'}</span>
										<span>{data?.type == TYPE_WORK.SUB_SUB_TASK && 'Subsubtask'}</span>
									</p>
								),
							},
							{
								title: 'Người báo cáo',
								render: (data: IUserWork) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										{data?.report?.reporter?.fullname || '---'}
									</p>
								),
							},
							{
								title: 'Loại công việc',
								render: (data: IUserWork) => (
									<p
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										{!data?.isInWorkflow && 'Phát sinh'}
										{data?.isInWorkflow && 'Có kế hoạch'}
									</p>
								),
							},
							{
								title: 'Khó khăn vướng mắc',
								render: (data: IUserWork, index: number) => (
									<>
										{(data?.issue && (
											<Tippy content={data?.issue}>
												<p
													className={styles.name}
													style={{
														color:
															data?.type == TYPE_WORK.TASK
																? '#2970FF'
																: data?.type == TYPE_WORK.SUB_TASK
																? ''
																: '',
													}}
												>
													{data?.issue || '---'}
												</p>
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
									<div
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										<StateActive
											stateActive={data?.activityState}
											listState={[
												{
													state: STATE_WORK.NOT_PROCESSED,
													text: 'Chưa xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#FDAD73',
												},
												{
													state: STATE_WORK.PROCESSING,
													text: 'Đang xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#5B70B3',
												},
												{
													state: STATE_WORK.COMPLETED,
													text: 'Đã hoàn thành',
													textColor: '#FFFFFF',
													backgroundColor: '#16C1F3',
												},
												{
													state: STATE_WORK.REJECTED,
													text: 'Bị từ chối',
													textColor: '#FFFFFF',
													backgroundColor: '#EE464C',
												},
											]}
										/>
									</div>
								),
							},
							{
								title: 'Tình trạng',
								render: (data: IUserWork) => (
									<div
										style={{
											color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
										}}
									>
										<StateActive
											isBox={false}
											stateActive={data?.deadlineState}
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
									</div>
								),
							},
							// {
							// 	title: 'Số hóa',
							// 	render: (data: IUserWork) => (
							// 		<p
							// 			style={{
							// 				color: data?.type == TYPE_WORK.TASK ? '#2970FF' : data?.type == TYPE_WORK.SUB_TASK ? '' : '',
							// 			}}
							// 		>
							// 			{data?.digitalizedState == 0 && 'Chưa số hóa'}
							// 			{data?.digitalizedState == 1 && 'Đã số hóa'}
							// 		</p>
							// 	),
							// },
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IUserWork) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										{data?.type == TYPE_WORK.TASK && (
											<IconCustom
												color='#005994'
												icon={<Eye fontSize={20} fontWeight={600} />}
												tooltip='Xem chi tiết'
												href={`${PATH.UserWork}/${data?.activity?.uuid}`}
											/>
										)}
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 10}
					total={listUserActivities?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _year, _month, _state, _type, _reporterUuid, _project]}
				/>
			</WrapperScrollbar>
		</div>
	);
}

export default MainPageUserWork;
