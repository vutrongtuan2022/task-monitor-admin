import React, {Fragment} from 'react';

import {PropsMainWorkReport} from './interfaces';
import styles from './MainWorkReport.module.scss';
import LayoutPages from '~/components/layouts/LayoutPages';
import {PATH} from '~/constants/config';
import {useRouter} from 'next/router';
import Button from '~/components/common/Button';
import Progress from '~/components/common/Progress';
import {clsx} from 'clsx';
import GridColumn from '~/components/layouts/GridColumn';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import StateActive from '~/components/common/StateActive';
import Link from 'next/link';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import Pagination from '~/components/common/Pagination';
import Breadcrumb from '~/components/common/Breadcrumb';

function MainWorkReport({}: PropsMainWorkReport) {
	const router = useRouter();

	const {_uuid} = router.query;

	return (
		<Fragment>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.Project,
						title: 'Danh sách dự án',
					},
					{
						path: '',
						title: 'Chi tiết dự án',
					},
				]}
			/>
			<LayoutPages
				listPages={[
					{
						title: 'Thông tin chung',
						path: `${PATH.ProjectInfo}?_uuid=${_uuid}`,
					},
					{
						title: 'Báo cáo công việc',
						path: `${PATH.ProjectWorkReport}?_uuid=${_uuid}`,
					},
					{
						title: 'Tiến độ giải ngân',
						path: `${PATH.ProjectDisbursementProgress}?_uuid=${_uuid}`,
					},
					{
						title: 'Thông tin nhà thầu',
						path: `${PATH.ProjectContractor}?_uuid=${_uuid}`,
					},
				]}
				action={
					<div className={styles.group_btn}>
						<Button p_14_24 rounded_8 primary>
							Kết thúc dự án
						</Button>
						<Button p_14_24 rounded_8 light-red>
							Xóa
						</Button>
						<Button p_14_24 rounded_8 primaryLinear>
							Chỉnh sửa
						</Button>
					</div>
				}
			>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Tiến độ công việc</h4>
					</div>
					<div className={styles.progress_group}>
						<GridColumn col_3>
							<div className={styles.progress}>
								<p>Trong tháng</p>
								<div className={styles.progress_label}>
									<Progress percent={80} width={120} isPercent={false} />
									<div>
										<span className={styles.value}>9</span>/10
									</div>
								</div>
							</div>
							<div className={styles.progress}>
								<p>Trong năm</p>
								<div className={styles.progress_label}>
									<Progress percent={80} width={120} isPercent={false} />
									<div>
										<span className={styles.value}>9</span>/10
									</div>
								</div>
							</div>
							<div className={styles.progress}>
								<p>Trong dự án</p>
								<div className={styles.progress_label}>
									<Progress percent={80} width={120} isPercent={false} />
									<div>
										<span className={styles.value}>9</span>/10
									</div>
								</div>
							</div>
						</GridColumn>
					</div>
				</div>
				<div className={clsx(styles.basic_info, styles.mt)}>
					<div className={styles.head}>
						<h4>Tiến độ công việc</h4>
					</div>
					<div className={styles.container}>
						<div className={styles.head_filt}>
							<div className={styles.main_search}>
								<div className={styles.search}>
									<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công việc' />
								</div>
								<div className={styles.filter}>
									<DateRangerCustom titleTime='Thời gian' />
								</div>
								<div className={styles.filter}>
									<FilterCustom
										isSearch
										name='Trạng thái'
										query='_'
										listFilter={[
											{
												id: 1,
												name: '1',
											},
											{
												id: 1,
												name: '2',
											},
										]}
									/>
								</div>
							</div>
						</div>
						<WrapperScrollbar>
							<DataWrapper data={[1, 1, 1]}>
								<Table
									data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
									column={[
										{
											title: 'STT',
											render: (data: any, index: number) => <>{index + 1}</>,
										},
										{
											title: 'Tên công việc',
											render: (data: any) => <>{'Lập thiết kế kiến trúc sơ bộ công trình'}</>,
										},
										{
											title: 'Giai đoạn thực hiện',
											render: (data: any) => <>{'Giai đoạn chuẩn bị đầu tư'}</>,
										},
										{
											title: 'Megatype',
											render: (data: any) => <>{'Subtask'}</>,
										},
										{
											title: 'Công việc bổ sung',
											render: (data: any) => <>{'2'}</>,
										},
										{
											title: 'Người báo cáo',
											render: (data: any) => <>{'Vũ Thị Ngân'}</>,
										},
										{
											title: 'Trạng thái',
											render: (data: any) => (
												<div className={styles.state}>
													<StateActive
														stateActive={2}
														listState={[
															{
																state: 1,
																text: 'Đã báo cáo',
																textColor: '#fff',
																backgroundColor: '#06D7A0',
															},
															{
																state: 2,
																text: 'Bị từ chối',
																textColor: '#fff',
																backgroundColor: '#F37277',
															},
														]}
													/>
													{data === 1 && (
														<Link href={`#`} className={styles.link_state}>
															Gửi lại
														</Link>
													)}
												</div>
											),
										},
										{
											title: 'Tình trạng',
											render: (data: any) => <div>Đã báo cáo</div>,
										},
									]}
								/>
								<Pagination currentPage={1} pageSize={20} total={20} />
							</DataWrapper>
						</WrapperScrollbar>
					</div>
				</div>
			</LayoutPages>
		</Fragment>
	);
}

export default MainWorkReport;
