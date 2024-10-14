import React, {useState} from 'react';

import {IDetailProjectFund, PropsDetailReportDisbursement} from './interfaces';
import styles from './DetailReportDisbursement.module.scss';
import GridColumn from '~/components/layouts/GridColumn';
import Moment from 'react-moment';
import StateActive from '~/components/common/StateActive';
import {QUERY_KEY, STATUS_DISBURSEMENT_PROJECT} from '~/constants/config/enum';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import projectFundServices from '~/services/projectFundServices';
import {convertCoin} from '~/common/funcs/convertCoin';
import Progress from '~/components/common/Progress';

function DetailReportDisbursement({}: PropsDetailReportDisbursement) {
	const router = useRouter();
	const {_id} = router.query;

	const DetailProjectFund = useQuery<IDetailProjectFund>([QUERY_KEY.detail_project_fund, _id], {
		queryFn: () =>
			httpRequest({
				http: projectFundServices.detaulProjectFund({
					uuid: _id as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_id,
	});

	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportDisbursement,
						title: 'Danh sách báo cáo giải ngân',
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
							<p>Trạng thái giải ngân:</p>
							<StateActive
								stateActive={DetailProjectFund?.data?.approved!}
								listState={[
									{
										state: STATUS_DISBURSEMENT_PROJECT.REJECTED,
										text: 'Bị từ chối',
										textColor: '#FFFFFF',
										backgroundColor: '#F37277',
									},
									{
										state: STATUS_DISBURSEMENT_PROJECT.NOT_APPROVED,
										text: 'Chưa xử lý',
										textColor: '#FFFFFF',
										backgroundColor: '#4BC9F0',
									},
									{
										state: STATUS_DISBURSEMENT_PROJECT.APPROVED,
										text: 'Đã duyệt',
										textColor: '#FFFFFF',
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
								<p>{DetailProjectFund?.data?.project?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Báo cáo tháng</p>
								<p>{DetailProjectFund?.data?.monthReport || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Báo cáo tháng</p>
								<p>{convertCoin(DetailProjectFund?.data?.realeaseBudget!) || '---'}</p>
							</div>
						</GridColumn>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Tổng mức đầu tư (VND)</p>
									<p>{convertCoin(DetailProjectFund?.data?.totalInvest!) || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Kế hoạch vốn năm (VND)</p>
									<p>{convertCoin(DetailProjectFund?.data?.annualBudget!) || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Lũy kế theo năm (VND)</p>
									<p>{convertCoin(DetailProjectFund?.data?.annualAccumAmount!) || '---'}</p>
								</div>
							</GridColumn>
						</div>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Lũy kế theo dự án (VND)</p>
									<p>{convertCoin(DetailProjectFund?.data?.projectAccumAmount!) || '---'} </p>
								</div>
								<div className={styles.item}>
									<p>Tỷ lệ giải ngân</p>
									<p>
										<Progress percent={DetailProjectFund?.data?.fundProgress!} width={80} />
									</p>
								</div>
								<div className={styles.item}>
									<p>Người báo cáo</p>
									<p>{DetailProjectFund?.data?.reporter?.fullname || '---'}</p>
								</div>
							</GridColumn>
						</div>
						<div className={styles.mt}>
							<GridColumn col_3>
								<div className={styles.item}>
									<p>Ngày gửi báo cáo</p>
									<p>
										<Moment date={DetailProjectFund?.data?.created} format='DD/MM/YYYY' />
									</p>
								</div>
								<div className={styles.item}>
									<p>Ghi chú</p>
									<p>{DetailProjectFund?.data?.note || '---'}</p>
								</div>
								<div className={styles.item}>
									<p>Lý do từ chối báo cáo giải ngân</p>
									<p>{DetailProjectFund?.data?.feedback || '---'}</p>
								</div>
							</GridColumn>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailReportDisbursement;
