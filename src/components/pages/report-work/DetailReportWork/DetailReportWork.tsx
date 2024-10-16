import React, {useEffect, useState} from 'react';

import {IDetailReportWork, PropsDetailReportWork} from './interfaces';
import styles from './DetailReportWork.module.scss';
import {PATH} from '~/constants/config';
import Breadcrumb from '~/components/common/Breadcrumb';
import StateActive from '~/components/common/StateActive';
import {QUERY_KEY, STATE_PROJECT, STATE_COMPLETE_REPORT} from '~/constants/config/enum';
import GridColumn from '~/components/layouts/GridColumn';
import clsx from 'clsx';
import TabNavLink from '~/components/common/TabNavLink';
import {useRouter} from 'next/router';
import LastMonthReport from './components/LastMonthReport';
import PresentReport from './components/PresentReport';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import reportServices from '~/services/reportServices';
import Moment from 'react-moment';

function DetailReportWork({}: PropsDetailReportWork) {
	const router = useRouter();
	const {_id, _type} = router.query;

	const [dataDetailReportWork, setDataDetailReportWork] = useState<IDetailReportWork | null>(null);

	const DetailReportWork = useQuery<IDetailReportWork>([QUERY_KEY.detail_report_work, _id], {
		queryFn: () =>
			httpRequest({
				http: reportServices.detailReport({
					uuid: _id as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_id,
	});

	useEffect(() => {
		if (DetailReportWork.data) {
			setDataDetailReportWork(DetailReportWork.data);
		}
	}, [DetailReportWork.data]);

	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportWork,
						title: 'Danh sách kế hoạch tháng',
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
								stateActive={DetailReportWork?.data?.state!}
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
								<p>{DetailReportWork?.data?.project?.name}</p>
							</div>
							<div className={styles.item}>
								<p>Kế hoạch</p>
								<p>
									Tháng {DetailReportWork?.data?.month} - {DetailReportWork?.data?.year}
								</p>
							</div>
							<div className={styles.item}>
								<p>Tình trạng</p>
								<StateActive
									isBox={false}
									stateActive={DetailReportWork?.data?.completeState}
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
						</GridColumn>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Công việc thực hiện</p>
									<p>
										<span style={{color: '#2970FF'}}>{DetailReportWork?.data?.completedActivity}</span>/
										<span>{DetailReportWork?.data?.totalActivity}</span>
									</p>
								</div>
								<div className={styles.item}>
									<p>Ngày gửi báo cáo</p>
									<p>
										<Moment date={DetailReportWork?.data?.completed} format='DD/MM/YYYY' />
									</p>
								</div>
								<div className={styles.item}>
									<p>Người gửi báo cáo</p>
									<p>{DetailReportWork?.data?.reporter?.fullname}</p>
								</div>
							</GridColumn>
						</div>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Lý do từ chối</p>
									<p>{DetailReportWork?.data?.note || '---'}</p>
								</div>
							</GridColumn>
						</div>
					</div>
				</div>

				<div className={clsx(styles.basic_info, styles.mt)}>
					<div className={styles.nav_link}>
						<TabNavLink
							query='_type'
							listHref={[
								{title: 'Báo cáo tháng trước', pathname: router.pathname, query: null},
								{title: 'Báo cáo hiện tại', pathname: router.pathname, query: 'report'},
							]}
						/>
					</div>

					<div>
						{!_type && <LastMonthReport dataDetailReportWork={dataDetailReportWork} />}
						{_type == 'report' && <PresentReport dataDetailReportWork={dataDetailReportWork} />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailReportWork;
