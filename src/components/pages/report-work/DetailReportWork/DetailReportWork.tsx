import React from 'react';

import {PropsDetailReportWork} from './interfaces';
import styles from './DetailReportWork.module.scss';
import {PATH} from '~/constants/config';
import Breadcrumb from '~/components/common/Breadcrumb';
import StateActive from '~/components/common/StateActive';
import {STATE_PROJECT, STATUS_REPORT_WORK} from '~/constants/config/enum';
import GridColumn from '~/components/layouts/GridColumn';
import clsx from 'clsx';
import LayoutPages from '~/components/layouts/LayoutPages';
import Button from '~/components/common/Button';

function DetailReportWork({}: PropsDetailReportWork) {
	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportWork,
						title: 'Danh sách dự án báo cáo tháng',
					},
					{
						path: '',
						title: 'Chi tiết báo cáo',
					},
				]}
			/>
			<div className={styles.main}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin cơ bản</h4>
						<div className={styles.state}>
							<p>Trạng thái dự án:</p>
							<StateActive
								stateActive={1}
								listState={[
									{
										state: STATE_PROJECT.PREPARE,
										text: 'Chuẩn bị',
										textColor: '#fff',
										backgroundColor: '#5B70B3',
									},
									{
										state: STATE_PROJECT.DO,
										text: 'Thực hiện',
										textColor: '#fff',
										backgroundColor: '#16C1F3',
									},
									{
										state: STATE_PROJECT.FINISH,
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
								<p>Tên công trình</p>
								<p>{'---'}</p>
							</div>
							<div className={styles.item}>
								<p>Kế hoạch</p>
								<p></p>
							</div>
							<div className={styles.item}>
								<p>Tình trạng</p>
								<StateActive
									isBox={false}
									stateActive={1}
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
							</div>
						</GridColumn>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Công việc thực hiện</p>
									<p>
										<span style={{color: '#2970FF'}}>6</span>/<span>8</span>
									</p>
								</div>
								<div className={styles.item}>
									<p>Ngày gửi báo cáo</p>
									<p></p>
								</div>
								<div className={styles.item}>
									<p>Người gửi báo cáo</p>
									<p></p>
								</div>
							</GridColumn>
						</div>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Lý do từ chối</p>
									<p></p>
								</div>
							</GridColumn>
						</div>
					</div>
				</div>

				<div className={clsx(styles.basic_info_table, styles.mt)}>
					<LayoutPages
						bgcolor='#fff'
						listPages={[
							{
								title: 'Báo cáo tháng trước',
								path: `${PATH.ProjectInfo}?_uuid=${'---'}`,
							},
						]}
					>
						<div className={styles.head}>
							<h4>Danh sách công việc</h4>
						</div>
					</LayoutPages>
				</div>
			</div>
		</div>
	);
}

export default DetailReportWork;
