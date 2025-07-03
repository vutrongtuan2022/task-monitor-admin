import React, {useState} from 'react';

import {ICSCT, PropsMainPageCSCT} from './interfaces';
import styles from './MainPageCSCT.module.scss';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import IconCustom from '~/components/common/IconCustom';
import Form from '~/components/common/Form';
import Popup from '~/components/common/Popup';
import TextArea from '~/components/common/Form/components/TextArea';
import Button from '~/components/common/Button';
import {CloseCircle, DriverRefresh, Eye, TickCircle} from 'iconsax-react';
import FilterCustom from '~/components/common/FilterCustom';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG, STATUS_CSCT} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import Tippy from '@tippyjs/react';
import Search from '~/components/common/Search';
import icons from '~/constants/images/icons';
import projectServices from '~/services/projectServices';
import pnServices from '~/services/pnServices';
import Progress from '~/components/common/Progress';
import StateActive from '~/components/common/StateActive';
import Moment from 'react-moment';
import {PATH} from '~/constants/config';
import Link from 'next/link';
import Dialog from '~/components/common/Dialog';
import Loading from '~/components/common/Loading';
import {convertCoin} from '~/common/funcs/convertCoin';
import {toastWarn} from '~/common/funcs/toast';

function MainPageCSCT({}: PropsMainPageCSCT) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [formRefresh, setFormRefresh] = useState<{reason: string}>({
		reason: '',
	});
	const {_page, _pageSize, _keyword, _state, _project} = router.query;
	const [uuidConfirm, setUuidConfirm] = useState<string>('');
	const [uuidCancel, setUuidCancel] = useState<string>('');
	const [refreshUuid, setRefreshUuid] = useState<string>('');
	const [refreshCode, setRefreshCode] = useState<string>('');
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

	const listPN = useQuery([QUERY_KEY.table_csct, _page, _pageSize, _keyword, _state, _project], {
		queryFn: () =>
			httpRequest({
				http: pnServices.listPN({
					pageSize: Number(_pageSize) || 10,
					page: Number(_page) || 1,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
					state: _state ? Number(_state) : null,
					projectUuid: (_project as string) || '',
				}),
			}),
		select(data) {
			return data;
		},
	});
	const handleChangeCancel = () => {
		if (!formRefresh.reason) {
			return toastWarn({msg: 'Vui lòng nhập lý do refresh!'});
		}
		return backStatePN.mutate();
	};
	const funcConfirm = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Duyệt CSCT thanh toán thành công!',
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
				queryClient.invalidateQueries([QUERY_KEY.table_csct]);
			}
		},
	});

	const funcCancel = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Từ chối CSCT thanh toán thành công!',
				http: pnServices.approvePN({
					uuid: uuidCancel,
					action: 1,
					reason: '',
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidCancel('');
				queryClient.invalidateQueries([QUERY_KEY.table_csct]);
			}
		},
	});
	const backStatePN = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Refresh lại trạng thái thành công!',
				http: pnServices.backStatePN({
					uuid: refreshUuid,
					reason: formRefresh.reason,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setRefreshUuid('');
				setFormRefresh({reason: ''});
				queryClient.invalidateQueries([QUERY_KEY.table_csct]);
			}
		},
	});
	return (
		<div className={styles.container}>
			<Loading loading={funcConfirm.isLoading || funcCancel.isLoading} />
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo mã cấp số' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_state'
							listFilter={[
								{
									id: STATUS_CSCT.NUMBER_ISSUED,
									name: 'CSCTTT đã cấp số',
								},
								{
									id: STATUS_CSCT.PENDING_APPROVAL,
									name: 'CSCTTT chờ phê duyệt',
								},
								{
									id: STATUS_CSCT.APPROVED,
									name: 'CSCTTT đã phê duyệt',
								},
								{
									id: STATUS_CSCT.REJECTED,
									name: 'CSCTTT bị từ chối',
								},
							]}
						/>
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
				</div>
				<div className={styles.btn}></div>
			</div>
			<WrapperScrollbar>
				<DataWrapper data={listPN?.data?.items || []} loading={listPN.isLoading} noti={<Noti />}>
					<Table
						fixedHeader={true}
						data={listPN?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: ICSCT, index: number) => <p>{index + 1}</p>,
							},
							{
								title: 'Mã cấp số',
								fixedLeft: true,
								render: (data: ICSCT, index: number) => (
									<Tippy content='Xem chi tiết'>
										<Link href={`${PATH.CSCT}/${data?.uuid}`} className={styles.link}>
											{data?.code || '---'}
										</Link>
									</Tippy>
								),
							},
							{
								title: 'Ngày lấy số',
								render: (data: ICSCT) => (
									<p>{data?.numberingDate ? <Moment date={data?.numberingDate} format='DD/MM/YYYY' /> : '---'}</p>
								),
							},
							{
								title: 'Tên dự án',
								render: (data: ICSCT) => <>{data?.project?.name || '---'}</>,
							},
							{
								title: 'SL hợp đồng',
								render: (data: ICSCT) => <p>{data?.totalContracts}</p>,
							},
							{
								title: 'Tổng giá trị thanh toán(VND)',
								render: (data: ICSCT) => (
									<p>
										<span>{convertCoin(data?.accumAmount)}</span>/
										<span style={{color: '#005994'}}>{convertCoin(data?.totalAmount)}</span>
									</p>
								),
							},
							{
								title: 'Lãnh đạo phụ trách',
								render: (data: ICSCT) => <>{data?.project?.leader?.fullname || '---'}</>,
							},
							{
								title: 'Cán bộ chuyên quản',
								render: (data: ICSCT) => <>{data?.user?.fullname || '---'}</>,
							},
							{
								title: 'Tỷ lệ giải ngân/Giá trị CSCTTT',
								render: (data: ICSCT) => <Progress percent={data?.percent} width={80} />,
							},
							{
								title: 'Trạng thái',
								render: (data: ICSCT) => (
									<StateActive
										stateActive={data?.state}
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
								),
							},
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: ICSCT) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											href={`${PATH.CSCT}/${data?.uuid}`}
											type='edit'
											icon={<Eye fontSize={20} fontWeight={600} />}
											tooltip='Xem chi tiết'
										/>
										{data?.state == STATUS_CSCT.APPROVED && (
											<IconCustom
												color='#EE464C'
												onClick={() => {
													setRefreshUuid(data?.uuid), setRefreshCode(data?.code);
												}}
												type='edit'
												icon={<DriverRefresh fontSize={20} fontWeight={600} />}
												tooltip='Refresh trạng thái'
											/>
										)}

										{data?.state !== STATUS_CSCT.REJECTED && data?.state !== STATUS_CSCT.APPROVED && (
											<>
												<IconCustom
													color='#06D7A0'
													icon={<TickCircle fontSize={20} fontWeight={600} />}
													tooltip='Duyệt thanh toán'
													onClick={() => setUuidConfirm(data?.uuid)}
												/>

												<IconCustom
													color='#EE464C'
													icon={<CloseCircle fontSize={20} fontWeight={600} />}
													tooltip='Từ chối thanh toán'
													onClick={() => setUuidCancel(data?.uuid)}
												/>
											</>
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
					total={listPN?.data?.pagination?.totalCount || 0}
					dependencies={[_pageSize, _keyword, _state, _project]}
				/>
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
					<Popup open={!!refreshUuid} onClose={() => {setRefreshUuid('') ,setFormRefresh({reason: ''})}}>
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
										<Button p_12_20 grey rounded_6 onClick={() => {setRefreshUuid('') ,setFormRefresh({reason: ''})}}>
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
			</WrapperScrollbar>
		</div>
	);
}

export default MainPageCSCT;
