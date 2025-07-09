import Breadcrumb from '~/components/common/Breadcrumb';
import styles from './MainPageDetailCSCT.module.scss';
import {IContractsPN, IDetailCSCT, PropsMainPageDetailCSCT} from './interfaces';
import {PATH} from '~/constants/config';
import GridColumn from '~/components/layouts/GridColumn';
import StateActive from '~/components/common/StateActive';
import {QUERY_KEY, STATE_CONTRACT_WORK, STATUS_CONFIG, STATUS_CSCT} from '~/constants/config/enum';
import {convertCoin} from '~/common/funcs/convertCoin';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import pnServices from '~/services/pnServices';
import clsx from 'clsx';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import Moment from 'react-moment';
import Button from '~/components/common/Button';
import {useState} from 'react';
import Dialog from '~/components/common/Dialog';
import icons from '~/constants/images/icons';
import Loading from '~/components/common/Loading';
import Form from '~/components/common/Form';
import Popup from '~/components/common/Popup';
import TextArea from '~/components/common/Form/components/TextArea';
import {toastWarn} from '~/common/funcs/toast';
function MainPageDetailCSCT({}: PropsMainPageDetailCSCT) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid} = router.query;
	const [refreshCode, setRefreshCode] = useState<string>('');
	const [uuidConfirm, setUuidConfirm] = useState<string>('');
	const [uuidCancel, setUuidCancel] = useState<string>('');
	const [openRefesh, setOpenRefesh] = useState<boolean>(false);
	const [formRefresh, setFormRefresh] = useState<{reason: string}>({
		reason: '',
	});
	const {data: detailCSCT} = useQuery<IDetailCSCT>([QUERY_KEY.detail_csct, _uuid], {
		queryFn: () =>
			httpRequest({
				http: pnServices.detailPN({
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});
	const handleChangeCancel = () => {
		if (!formRefresh.reason) {
			return toastWarn({msg: 'Vui lòng nhập lý do refresh!'});
		}
		return backStatePN.mutate();
	};
	const {data: ListPNContract, isLoading} = useQuery([QUERY_KEY.table_pn_contract, _uuid], {
		queryFn: () =>
			httpRequest({
				http: pnServices.getListPNContract({
					uuid: (_uuid as string) || '',
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});
	const backStatePN = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Refresh lại trạng thái thành công!',
				http: pnServices.backStatePN({
					uuid: _uuid as string,
					reason: formRefresh.reason,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setOpenRefesh(false);
				queryClient.invalidateQueries([QUERY_KEY.detail_csct, _uuid]);
			}
		},
	});
	const funcConfirm = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Duyệt thanh toán thành công!',
				http: pnServices.approvePN({
					uuid: uuidConfirm,
					action: 0,
					reason: '',
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidConfirm('');
				queryClient.invalidateQueries([QUERY_KEY.detail_csct]);
			}
		},
	});

	const funcCancel = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Từ chối thanh toán thành công!',
				http: pnServices.approvePN({
					uuid: _uuid as string,
					action: 1,
					reason: '',
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidCancel('');
				queryClient.invalidateQueries([QUERY_KEY.detail_csct]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={funcConfirm.isLoading || funcCancel.isLoading} />
			<Breadcrumb
				listUrls={[
					{
						path: PATH.CSCT,
						title: 'Danh sách CSCT thanh toán',
					},
					{
						path: '',
						title: 'Chi tiết',
					},
				]}
				action={
					<>
						{(detailCSCT?.state === STATUS_CSCT.NUMBER_ISSUED || detailCSCT?.state === STATUS_CSCT.PENDING_APPROVAL) && (
							<div className={styles.group_btn}>
								<Button p_14_24 rounded_8 light-red onClick={() => setUuidCancel(detailCSCT?.uuid!)}>
									Từ chối
								</Button>
								<Button p_14_24 rounded_8 green onClick={() => setUuidConfirm(detailCSCT?.uuid!)}>
									Duyệt cấp số
								</Button>
							</div>
						)}

						{detailCSCT?.state == STATUS_CSCT.APPROVED && (
							<div className={styles.group_btn}>
								<Button
									p_14_24
									rounded_8
									error
									onClick={() => {
										setOpenRefesh(true), setRefreshCode(detailCSCT?.code);
									}}
								>
									Refresh trạng thái
								</Button>
							</div>
						)}
					</>
				}
			/>
			<div className={styles.main}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin cơ bản</h4>
						<div className={styles.state}>
							<p>Trạng thái:</p>
							<StateActive
								stateActive={detailCSCT?.state!}
								listState={[
									{
										state: STATUS_CSCT.NUMBER_ISSUED,
										text: 'CSCTTT đã cấp số',
										textColor: '#fff',
										backgroundColor: '#005994',
									},
									{
										state: STATUS_CSCT.PENDING_APPROVAL,
										text: 'CSCTTT chờ phê duyệt',
										textColor: '#fff',
										backgroundColor: '#FDAD73',
									},
									{
										state: STATUS_CSCT.APPROVED,
										text: 'CSCTTT đã phê duyệt',
										textColor: '#fff',
										backgroundColor: '#06D7A0',
									},
									{
										state: STATUS_CSCT.REJECTED,
										text: 'CSCTTT bị từ chối',
										textColor: '#fff',
										backgroundColor: '#EE464C',
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.form}>
						<GridColumn col_3>
							<div className={styles.item}>
								<p>Mã dự án</p>
								<p style={{color: '#005994'}}>{detailCSCT?.project?.code || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tên dự án</p>
								<p>{detailCSCT?.project?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Mã cấp số</p>
								<p>{detailCSCT?.code || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày lấy số</p>
								<p>{detailCSCT?.numberingDate ? <Moment date={detailCSCT?.numberingDate} format='DD/MM/YYYY' /> : '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày trên thông báo cấp vốn</p>
								<p>{detailCSCT?.noticeDate ? <Moment date={detailCSCT?.noticeDate} format='DD/MM/YYYY' /> : '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày phê duyệt CSCTTT</p>
								<p>{detailCSCT?.approvalDate ? <Moment date={detailCSCT?.approvalDate} format='DD/MM/YYYY' /> : '---'}</p>
							</div>

							<div className={styles.item}>
								<p>Lãnh đạo phụ trách</p>
								<p>{detailCSCT?.project?.leader?.fullname || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Cán bộ phụ trách</p>
								<p>{detailCSCT?.user?.fullname || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Số lượng hợp đồng</p>
								<p>{detailCSCT?.totalContracts}</p>
							</div>
							<div className={styles.item}>
								<p>Tổng giá trị thanh toán (VND)</p>
								<p>{convertCoin(detailCSCT?.totalAmount!)}</p>
							</div>
							<div className={styles.item}>
								<p>LKSCTTT theo năm (VND)</p>
								<p>{convertCoin(detailCSCT?.accumAmountInYear!)}</p>
							</div>
							<div className={styles.item}>
								<p>LKSCT đến hiện tại (VND)</p>
								<p>{convertCoin(detailCSCT?.accumAmount!)}</p>
							</div>
							{(detailCSCT?.state === STATUS_CSCT.REJECTED || detailCSCT?.state === STATUS_CSCT.PENDING_APPROVAL) && (
								<div className={styles.item}>
									<p>Lý do từ chối</p>
									<p>{detailCSCT?.rejectReason || '---'}</p>
								</div>
							)}
						</GridColumn>
					</div>
				</div>
				<div className={clsx(styles.basic_info, styles.mt)}>
					<div className={styles.head}>
						<h4>Danh sách hợp đồng</h4>
					</div>
					<div className={styles.main_table}>
						<DataWrapper loading={isLoading} data={ListPNContract || []}>
							<Table
								data={ListPNContract || []}
								column={[
									{
										title: 'STT',
										render: (data: IContractsPN, index: number) => <>{index + 1}</>,
									},
									{
										title: 'Mã hợp đồng',
										fixedLeft: true,
										render: (data: IContractsPN) => (
											<Tippy content='Chi tiết hợp đồng'>
												<Link href={`${PATH.ProjectContract}/${data?.contract?.uuid}`} className={styles.link}>
													{data?.contract?.code || '---'}
												</Link>
											</Tippy>
										),
									},
									{
										title: 'Tên nhóm nhà thầu',
										render: (data: IContractsPN) => <>{data?.contractor?.contractorCat?.name}</>,
									},
									{
										title: 'Tên nhà thầu',
										render: (data: IContractsPN) => <>{data?.contractor?.contractor?.name || '---'}</>,
									},

									{
										title: 'Loại thanh toán',
										render: (data: IContractsPN) => (
											<>
												{data?.type === 1 && 'Thanh toán'}
												{data?.type === 2 && 'Tạm ứng'}
											</>
										),
									},
									{
										title: 'Số tiền tạm ứng (VND)',
										render: (data: IContractsPN) => (
											<>{data?.advanceAmount ? convertCoin(data?.advanceAmount) : '---'}</>
										),
									},
									{
										title: 'Tổng số tiền TT (VND)',
										render: (data: IContractsPN) => <>{data?.amount ? convertCoin(data?.amount) : '---'}</>,
									},
									{
										title: 'Số tiền còn phải TT (VND)',
										render: (data: IContractsPN) => (
											<>{data?.remainingAmount ? convertCoin(data?.remainingAmount) : '---'}</>
										),
									},
									{
										title: 'Số tiền khấu trừ tạm ứng (VND)',
										render: (data: IContractsPN) => (
											<>{data?.totalReverseAmount ? convertCoin(data?.totalReverseAmount) : '--'}</>
										),
									},
									{
										title: 'Ghi chú',
										render: (data: IContractsPN) => (
											<>
												{(data?.note && (
													<Tippy content={data?.note}>
														<p className={styles.note}>{data?.note || '---'}</p>
													</Tippy>
												)) ||
													'---'}
											</>
										),
									},
								]}
							/>
						</DataWrapper>

						<Dialog
							type='primary'
							open={!!uuidConfirm}
							icon={icons.success}
							onClose={() => setUuidConfirm('')}
							title={'Duyệt CSCT thanh toán'}
							note={'Bạn có chắc chắn muốn duyệt CSCT thanh toán này không?'}
							onSubmit={funcConfirm.mutate}
						/>

						<Dialog
							type='error'
							open={!!uuidCancel}
							icon={icons.question}
							onClose={() => setUuidCancel('')}
							title={'Từ chối CSCT thanh toán '}
							note={'Bạn có chắc chắn muốn từ chối CSCT thanh toán này không?'}
							onSubmit={funcCancel.mutate}
						/>
						<Form form={formRefresh} setForm={setFormRefresh}>
							<Popup
								open={!!openRefesh}
								onClose={() => {
									setOpenRefesh(false), setFormRefresh({reason: ''});
								}}
							>
								<div className={styles.main_popup}>
									<div className={styles.head_popup}>
										<h4>Xác nhận refresh CSCT {refreshCode}</h4>
									</div>
									<div className={styles.form_poup}>
										<TextArea
											name='reason'
											placeholder='Nhập lý do refresh'
											label={
												<span>
													Lý do refresh <span style={{color: 'red'}}>*</span>
												</span>
											}
										/>
										<div className={styles.group_button}>
											<div>
												<Button
													p_12_20
													grey
													rounded_6
													onClick={() => {
														setOpenRefesh(false), setFormRefresh({reason: ''});
													}}
												>
													Hủy bỏ
												</Button>
											</div>
											<div className={styles.btn}>
												<Button disable={!formRefresh.reason} p_12_20 error rounded_6 onClick={handleChangeCancel}>
													Xác nhận
												</Button>
											</div>
										</div>
									</div>
								</div>
							</Popup>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainPageDetailCSCT;
