import React from 'react';

import {PropsMainInfoProject} from './interfaces';
import styles from './MainInfoProject.module.scss';
import LayoutPages from '~/components/layouts/LayoutPages';
import {PATH} from '~/constants/config';
import {useRouter} from 'next/router';
import Button from '~/components/common/Button';
import GridColumn from '~/components/layouts/GridColumn';
import StateActive from '~/components/common/StateActive';
import {TYPE_WORK_STATUS} from '~/constants/config/enum';
import Progress from '~/components/common/Progress';
import Link from 'next/link';
import Moment from 'react-moment';
import clsx from 'clsx';

function MainInfoProject({}: PropsMainInfoProject) {
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
					<Button p_14_24 rounded_8 blueLinear>
						Thực hiện dự án
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
			<div className={styles.grid}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin cơ bản</h4>
						<div className={styles.state}>
							<p>Trạng thái dự án:</p>
							<StateActive
								stateActive={1}
								listState={[
									{
										state: TYPE_WORK_STATUS.PREPARE,
										text: 'Chuẩn bị',
										textColor: '#fff',
										backgroundColor: '#5B70B3',
									},
									{
										state: TYPE_WORK_STATUS.DO,
										text: 'Thực hiện',
										textColor: '#fff',
										backgroundColor: '#16C1F3',
									},
									{
										state: TYPE_WORK_STATUS.FINISH,
										text: 'Kết thúc',
										textColor: '#fff',
										backgroundColor: '#06D7A0',
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.progress_group}>
						<GridColumn col_3>
							<div className={styles.item}>
								<p>Mã dự án</p>
								<p>122345</p>
							</div>
							<div className={styles.item}>
								<p>Tiến độ dự án</p>
								<Progress percent={60} width={80} />
							</div>
						</GridColumn>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Tên chi nhánh</p>
									<p>Chi nhánh số 3</p>
								</div>
								<div className={styles.item}>
									<p>Mã chi nhánh</p>
									<p>56334422123</p>
								</div>
							</GridColumn>
						</div>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Tên công trình</p>
									<p>Công trình hải Dương số 34</p>
								</div>
								<div className={styles.item}>
									<p>Quy trình áp dụng</p>
									<p>
										Quy mô phòng giao dịch
										<Link href={`#`} className={styles.link}>
											Chi tiết
										</Link>
									</p>
								</div>
							</GridColumn>
						</div>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Lãnh đạo phụ trách</p>
									<p>Vũ Trí Cương</p>
								</div>
								<div className={styles.item}>
									<p>Cán bộ chuyên quản</p>
									<p>
										Linh Vũ
										<span className={styles.link}>và 2 người khác</span>
									</p>
								</div>
								<div className={styles.item}>
									<p>Công tác số hóa hồ sơ</p>
									<p>Chưa triển khai</p>
								</div>
							</GridColumn>
						</div>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Ngày tạo dự án</p>
									<p>
										<Moment format='HH:mm, DD/MM/YYYY' />
									</p>
								</div>
								<div className={styles.item}>
									<p>Thời gian bắt đầu dự tính</p>
									<p>
										<Moment format='DD/MM/YYYY' />
									</p>
								</div>
								<div className={styles.item}>
									<p>Thời gian kết thúc dự tính</p>
									<p>
										<Moment format='DD/MM/YYYY' />
									</p>
								</div>
							</GridColumn>
						</div>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Thời gian bắt đầu dự án được phê duyệt</p>
									<p>
										<Moment format='DD/MM/YYYY' />
									</p>
								</div>
								<div className={styles.item}>
									<p>Thời gian kết thúc dự án</p>
									<p>---</p>
								</div>
							</GridColumn>
						</div>
					</div>
				</div>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin vốn dự án</h4>
					</div>
					<div className={styles.progress_group}>
						<div className={styles.item_capital}>
							<p>Kế hoạch vốn đầu tư</p>
							<p style={{color: '#2970FF'}}>1.000.000.000 VND</p>
						</div>
						<div className={styles.line}></div>
						<div className={styles.item_capital}>
							<p>Tổng mức đầu tư dự án</p>
							<p>1.000.000.000 VND</p>
						</div>
						<div className={styles.line}></div>
						<div className={styles.item_capital}>
							<p>Tổng dự toán</p>
							<p>1.000.000.000 VND</p>
						</div>
						<div className={styles.line}></div>
						<div className={styles.item_capital}>
							<p>Vốn dự phòng được duyệt</p>
							<p>1.000.000.000 VND</p>
						</div>
						<div className={styles.line}></div>
						<div className={styles.item_capital}>
							<p>Vốn dự phòng còn lại</p>
							<p>1.000.000.000 VND</p>
						</div>
						<div className={styles.line}></div>
						<div className={styles.item_capital}>
							<p>Số tiền giải ngân lũy kế đến hiện tại</p>
							<p>1.000.000.000 VND</p>
						</div>
						<div className={styles.line}></div>
						<div className={styles.item_capital}>
							<p>Kế hoạch vốn theo năm</p>
							<p>1.000.000.000 VND</p>
						</div>
					</div>
				</div>
			</div>
			<div className={clsx(styles.basic_info, styles.mt)}>
				<div className={styles.head}>
					<h4>Thông tin khác</h4>
				</div>
				<div className={styles.progress_group}>
					<GridColumn col_3>
						<div className={styles.item}>
							<p>Tỉnh/TP</p>
							<p>Hà Nội</p>
						</div>
						<div className={styles.item}>
							<p>Quận/huyện</p>
							<p>Hoàng Mai</p>
						</div>
						<div className={styles.item}>
							<p>Xã/Phường</p>
							<p>---</p>
						</div>
					</GridColumn>
					<div className={styles.mt}>
						<GridColumn col_3>
							<div className={styles.item}>
								<p>Địa chỉ chi tiết</p>
								<p>130 nguyễn đức cảnh tương mai hoàng mai hà nội</p>
							</div>
							<div className={styles.item}>
								<p>Ghi chú</p>
								<p>---</p>
							</div>
						</GridColumn>
					</div>
				</div>
			</div>
		</LayoutPages>
	);
}

export default MainInfoProject;
