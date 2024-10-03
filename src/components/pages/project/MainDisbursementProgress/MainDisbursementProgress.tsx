import React from 'react';

import {PropsMainDisbursementProgress} from './interfaces';
import styles from './MainDisbursementProgress.module.scss';
import LayoutPages from '~/components/layouts/LayoutPages';
import {PATH} from '~/constants/config';
import {useRouter} from 'next/router';
import Button from '~/components/common/Button';
import Pagination from '~/components/common/Pagination';
import DataWrapper from '~/components/common/DataWrapper';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import StateActive from '~/components/common/StateActive';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import Table from '~/components/common/Table';
import FilterCustom from '~/components/common/FilterCustom';
import Search from '~/components/common/Search';
import GridColumn from '~/components/layouts/GridColumn';
import Progress from '~/components/common/Progress';
import {clsx} from 'clsx';
import Link from 'next/link';
import {convertCoin} from '~/common/funcs/convertCoin';

function MainDisbursementProgress({}: PropsMainDisbursementProgress) {
	const router = useRouter();

	const {_uuid} = router.query;

	return (
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
					<h4>Tiến độ giải ngân</h4>
				</div>
				<div className={styles.progress_group}>
					<GridColumn col_3>
						<div className={styles.progress}>
							<p>Trong tháng (VND)</p>
							<div className={styles.progress_label}>
								<Progress percent={80} width={120} isPercent={false} />
								<div>
									<span className={styles.value}>{convertCoin(900000000)}</span>/{convertCoin(1000000000)}
								</div>
							</div>
						</div>
						<div className={styles.progress}>
							<p>Trong năm (VND)</p>
							<div className={styles.progress_label}>
								<Progress percent={80} width={120} isPercent={false} />
								<div>
									<span className={styles.value}>{convertCoin(900000000)}</span>/{convertCoin(1000000000)}
								</div>
							</div>
						</div>
						<div className={styles.progress}>
							<p>Trong dự án (VND)</p>
							<div className={styles.progress_label}>
								<Progress percent={80} width={120} isPercent={false} />
								<div>
									<span className={styles.value}>{convertCoin(900000000)}</span>/{convertCoin(1000000000)}
								</div>
							</div>
						</div>
					</GridColumn>
				</div>
			</div>
			<div className={clsx(styles.basic_info, styles.mt)}>
				<div className={styles.head}>
					<h4>Danh sách báo cáo số tiền giải ngân</h4>
				</div>
				<div className={styles.container}>
					<div className={styles.head_filt}>
						<div className={styles.main_search}>
							<div className={styles.search}>
								<Search keyName='_keyword' placeholder='Tìm kiếm theo tên, người báo cáo' />
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
										title: 'Báo cáo tháng',
										render: (data: any) => <>{'Báo cáo tháng 10'}</>,
									},
									{
										title: 'Ngày gửi báo cáo',
										render: (data: any) => <>01/09/2024</>,
									},
									{
										title: 'Số tiền giải ngân (VND)',
										render: (data: any) => <>400.000.000</>,
									},
									{
										title: 'Người báo cáo',
										render: (data: any) => <>Vũ Thị Ngân</>,
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
												<Link href={``} className={styles.link_state}>
													Gửi lại
												</Link>
											</div>
										),
									},
								]}
							/>
							<Pagination currentPage={1} pageSize={20} total={20} />
						</DataWrapper>
					</WrapperScrollbar>
				</div>
			</div>
		</LayoutPages>
	);
}

export default MainDisbursementProgress;
