import React from 'react';

import {IDetailPlanNextMonth, PropsDetailPlanNextMonth} from './interfaces';
import styles from './DetailPlanNextMonth.module.scss';
import {PATH} from '~/constants/config';
import Breadcrumb from '~/components/common/Breadcrumb';
import StateActive from '~/components/common/StateActive';
import {QUERY_KEY, STATE_COMPLETE_REPORT, STATE_REPORT} from '~/constants/config/enum';
import GridColumn from '~/components/layouts/GridColumn';
import clsx from 'clsx';
import TabNavLink from '~/components/common/TabNavLink';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import reportServices from '~/services/reportServices';
import Moment from 'react-moment';
import TableReportWorkLastMonth from '../TableReportWorkLastMonth';
import TableReportWorkCurrent from '../TableReportWorkCurrent';

function DetailPlanNextMonth({}: PropsDetailPlanNextMonth) {
	const router = useRouter();
	const {_uuid, _type} = router.query;

	const {data: detailPlanNextMonth} = useQuery<IDetailPlanNextMonth>([QUERY_KEY.detail_plan_next_month, _uuid], {
		queryFn: () =>
			httpRequest({
				http: reportServices.detailReport({
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.PlanNextMonth,
						title: 'Kế hoạch tháng tới',
					},
					{
						path: '',
						title: 'Chi tiết kế hoạch',
					},
				]}
			/>
			<div className={styles.main}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin cơ bản</h4>
						<div className={styles.state}>
							<p>Trạng thái báo cáo:</p>
							<StateActive
								stateActive={detailPlanNextMonth?.state!}
								listState={[
									{
										state: STATE_REPORT.PLANNING,
										text: 'Lên kế hoạch',
										textColor: '#fff',
										backgroundColor: '#5B70B3',
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.progress_group}>
						<GridColumn col_3>
							<div className={styles.item}>
								<p>Tên công trình</p>
								<p>{detailPlanNextMonth?.project?.name}</p>
							</div>
							<div className={styles.item}>
								<p>Kế hoạch</p>
								<p>
									Tháng {detailPlanNextMonth?.month} - {detailPlanNextMonth?.year}
								</p>
							</div>
							<div className={styles.item}>
								<p>Tình trạng</p>
								<StateActive
									isBox={false}
									stateActive={detailPlanNextMonth?.completeState}
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
							<div className={styles.item}>
								<p>Chi nhánh</p>
								<p>
									<span style={{color: '#2970FF'}}>{detailPlanNextMonth?.project?.branch?.code || '---'}</span> -
									<span style={{marginLeft: '4px'}}>{detailPlanNextMonth?.project?.branch?.name || '---'}</span>
								</p>
							</div>
							<div className={styles.item}>
								<p>Công việc thực hiện</p>
								<p>
									<span style={{color: '#2970FF'}}>{detailPlanNextMonth?.completedActivity}</span>/
									<span>{detailPlanNextMonth?.totalActivity}</span>
								</p>
							</div>
							<div className={styles.item}>
								<p>Ngày tạo báo cáo</p>
								<p>
									{detailPlanNextMonth?.created ? (
										<Moment date={detailPlanNextMonth?.created} format='DD/MM/YYYY' />
									) : (
										'---'
									)}
								</p>
							</div>
							<div className={styles.item}>
								<p>Người gửi báo cáo</p>
								<p>{detailPlanNextMonth?.reporter?.fullname}</p>
							</div>
							<div className={styles.item}>
								<p>Mô tả</p>
								<p>{detailPlanNextMonth?.note || '---'}</p>
							</div>
							{detailPlanNextMonth?.state === STATE_REPORT.REJECTED && (
								<div className={styles.item}>
									<p>Lý do từ chối</p>
									<p>{detailPlanNextMonth?.rejectedReason || '---'}</p>
								</div>
							)}
						</GridColumn>
					</div>
				</div>

				<div className={clsx(styles.basic_info, styles.mt)}>
					<div className={styles.main_tab}>
						<TabNavLink
							query='_type'
							listHref={[
								{
									pathname: PATH.ProjectCreate,
									query: null,
									title: 'Báo cáo tháng trước',
								},
								{
									pathname: PATH.ProjectCreate,
									query: 'report',
									title: 'Báo cáo hiện tại',
								},
							]}
							listKeyRemove={['_page', '_pageSize', '_keyword', '_state']}
						/>
					</div>
					<div className={styles.line}></div>
					<div className={styles.head}>
						<h4>Danh sách công việc</h4>
					</div>
					<div className={styles.main_table}>
						{!_type && <TableReportWorkLastMonth />}
						{_type == 'report' && <TableReportWorkCurrent />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailPlanNextMonth;
