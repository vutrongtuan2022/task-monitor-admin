import React from 'react';

import {IDetailContractFund, IContractFund, PropsDetailReportDisbursement} from './interfaces';
import styles from './DetailReportDisbursement.module.scss';
import GridColumn from '~/components/layouts/GridColumn';
import Moment from 'react-moment';
import StateActive from '~/components/common/StateActive';
import {QUERY_KEY, STATE_REPORT_DISBURSEMENT, STATUS_CONFIG} from '~/constants/config/enum';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import {convertCoin} from '~/common/funcs/convertCoin';
import clsx from 'clsx';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import Tippy from '@tippyjs/react';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Link from 'next/link';
import contractsFundServices from '~/services/contractsFundServices';

function DetailReportDisbursement({}: PropsDetailReportDisbursement) {
	const router = useRouter();

	const {_uuid, _page, _pageSize} = router.query;

	const {data: detailContractFund} = useQuery<IDetailContractFund>([QUERY_KEY.detail_report_disbursement, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractsFundServices.detailContractFund({
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const {data: listContractFund} = useQuery([QUERY_KEY.table_contract_report_disbursement, _page, _pageSize, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractsFundServices.detailContractFundFundPaged({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
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
								stateActive={detailContractFund?.state!}
								listState={[
									{
										state: STATE_REPORT_DISBURSEMENT.REJECTED,
										text: 'Bị từ chối',
										textColor: '#FFFFFF',
										backgroundColor: '#F37277',
									},
									{
										state: STATE_REPORT_DISBURSEMENT.REPORTED,
										text: 'Đã báo cáo',
										textColor: '#FFFFFF',
										backgroundColor: '#4BC9F0',
									},
									{
										state: STATE_REPORT_DISBURSEMENT.APPROVED,
										text: 'Đã duyệt',
										textColor: '#FFFFFF',
										backgroundColor: '#06D7A0',
									},
									{
										state: STATE_REPORT_DISBURSEMENT.NOT_REPORT,
										text: 'Chưa báo cáo',
										textColor: '#FFFFFF',
										backgroundColor: '#FF852C',
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.progress_group}>
						<GridColumn col_3>
							<div className={styles.item}>
								<p>Tên công trình</p>
								<p>{detailContractFund?.project?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Thời gian báo cáo</p>
								<p>
									{detailContractFund?.releasedMonth && detailContractFund?.releasedYear
										? `Tháng ${detailContractFund?.releasedMonth} - ${detailContractFund?.releasedYear}`
										: !detailContractFund?.releasedMonth && detailContractFund?.releasedYear
										? `Năm ${detailContractFund?.releasedYear}`
										: '---'}
								</p>
							</div>
							<div className={styles.item}>
								<p>Chi nhánh</p>
								<p>
									<span>{detailContractFund?.project?.branch?.code || '---'}</span> -
									<span style={{marginLeft: '4px'}}>{detailContractFund?.project?.branch?.name || '---'}</span>
								</p>
							</div>
							<div className={styles.item}>
								<p>Số hợp đồng giải ngân</p>
								<p>{detailContractFund?.contractCount || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tổng số tiền giải ngân (VND)</p>
								<p>{convertCoin(detailContractFund?.totalAmount!) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Người báo cáo</p>
								<p>{detailContractFund?.creator?.fullname || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày gửi báo cáo</p>
								<p>
									{detailContractFund?.sendDate ? (
										<Moment date={detailContractFund?.sendDate} format='DD/MM/YYYY' />
									) : (
										'---'
									)}
								</p>
							</div>
							{/* <div className={styles.item}>
								<p>Mô tả</p>
								<p>{detailContractFund?.note || '---'}</p>
							</div> */}
							{detailContractFund?.state === STATE_REPORT_DISBURSEMENT.REJECTED && (
								<div className={styles.item}>
									<p>Lý do từ chối báo cáo giải ngân</p>
									<p>{detailContractFund?.rejectedReason || '---'}</p>
								</div>
							)}
						</GridColumn>
					</div>
				</div>
				<div className={clsx(styles.basic_info, styles.mt)}>
					<div className={styles.head}>
						<h4>Danh sách giải ngân</h4>
					</div>
					<WrapperScrollbar>
						<DataWrapper
							data={listContractFund?.items || []}
							loading={listContractFund?.isLoading}
							noti={<Noti title='Danh sách hợp đồng trống!' des='Hiện tại chưa có hợp đồng nào!' />}
						>
							<Table
								fixedHeader={true}
								data={listContractFund?.items || []}
								column={[
									{
										title: 'STT',
										render: (data: IContractFund, index: number) => <>{index + 1}</>,
									},
									{
										title: 'Số hợp đồng',
										fixedLeft: true,
										render: (data: IContractFund) => (
											<Tippy content='Chi tiết hợp đồng'>
												<Link
													href={`${PATH.ContractReportDisbursement}/${data?.uuid}?_uuidContract=${_uuid}`}
													className={styles.link}
												>
													{data?.code}
												</Link>
											</Tippy>
										),
									},
									{
										title: 'Tên công việc',
										render: (data: IContractFund) => <>{data?.activity?.name}</>,
									},
									{
										title: 'Sử dụng vốn dự phòng (VND)',
										render: (data: IContractFund) => <>{convertCoin(data?.reverseAmount)}</>,
									},
									{
										title: 'Sử dụng vốn dự án (VND)',
										render: (data: IContractFund) => <>{convertCoin(data?.projectAmount)}</>,
									},
									{
										title: 'Ngày giải ngân',
										render: (data: IContractFund) => (
											<>{data?.releaseDate ? <Moment date={data?.releaseDate} format='DD/MM/YYYY' /> : '---'}</>
										),
									},
									{
										title: 'Tên nhóm nhà thầu',
										render: (data: IContractFund) => (
											<>
												{/* {data?.contractorInfos?.length && ( */}
												<Tippy
													content={
														<ol style={{paddingLeft: '16px'}}>
															{[...new Set(data?.contractorInfos?.map((v) => v.contractorCatName))].map(
																(catName, i) => (
																	<li key={i}>{catName}</li>
																)
															)}
														</ol>
													}
												>
													<p className={styles.name}>
														{data?.contractorInfos?.map((v) => v?.contractorCatName).join(', ')}
													</p>
												</Tippy>
												{/* )} */}
											</>
										),
									},
									{
										title: 'Tên nhà thầu',
										render: (data: IContractFund) => (
											<>
												<Tippy
													content={
														<ol style={{paddingLeft: '16px'}}>
															{[...new Set(data?.contractorInfos?.map((v) => v.contractorName))].map(
																(catName, i) => (
																	<li key={i}>{catName}</li>
																)
															)}
														</ol>
													}
												>
													<p className={styles.name}>
														{data?.contractorInfos?.map((v) => v?.contractorName).join(', ')}
													</p>
												</Tippy>
											</>
										),
									},
									{
										title: 'Mô tả',
										render: (data: IContractFund) => (
											<>
												{(data?.note && (
													<Tippy content={data?.note}>
														<p className={styles.name}>{data?.note || '---'}</p>
													</Tippy>
												)) ||
													'---'}
											</>
										),
									},
								]}
							/>
						</DataWrapper>
						<Pagination
							currentPage={Number(_page) || 1}
							pageSize={Number(_pageSize) || 10}
							total={listContractFund?.pagination?.totalCount}
							dependencies={[_pageSize, _uuid]}
						/>
					</WrapperScrollbar>
				</div>
			</div>
		</div>
	);
}

export default DetailReportDisbursement;
