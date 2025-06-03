import React, {useState} from 'react';

import {ICSCT, PropsMainPageCSCT} from './interfaces';
import styles from './MainPageCSCT.module.scss';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import IconCustom from '~/components/common/IconCustom';
import {CloseCircle, Eye, TickCircle} from 'iconsax-react';
import FilterCustom from '~/components/common/FilterCustom';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG, STATUS_CSCT} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import contractorServices from '~/services/contractorServices';
import contractorcatServices from '~/services/contractorcatServices';
import PositionContainer from '~/components/common/PositionContainer';
import Tippy from '@tippyjs/react';
import Search from '~/components/common/Search';
import Button from '~/components/common/Button';
import Image from 'next/image';
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

function MainPageCSCT({}: PropsMainPageCSCT) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword} = router.query;
	const [uuidConfirm, setUuidConfirm] = useState<string>('');
	const [uuidCancel, setUuidCancel] = useState<string>('');

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

	const listPN = useQuery([QUERY_KEY.table_csct, _page, _pageSize, _keyword], {
		queryFn: () =>
			httpRequest({
				http: pnServices.listPN({
					pageSize: Number(_pageSize) || 10,
					page: Number(_page) || 1,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcConfirm = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Duyệt thanh toán thành công!',
				http: contractorServices.changeUpdateContractorCat({
					uuid: uuidConfirm,
					state: 1,
					rejected: '',
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
				msgSuccess: 'Từ chối thanh toán thành công!',
				http: contractorServices.changeUpdateContractorCat({
					uuid: uuidCancel,
					state: 2,
					// rejected: form?.feedback,
					rejected: '',
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

	return (
		<div className={styles.container}>
			<Loading loading={funcConfirm.isLoading || funcCancel.isLoading} />
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo nhà thầu' />
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
				<DataWrapper
					data={
						// listPN?.data?.items ||
						[1, 2, 3, 4, 5, 6]
					}
					loading={listPN.isLoading}
					noti={<Noti />}
				>
					<Table
						fixedHeader={true}
						data={
							// listPN?.data?.items ||
							[1, 2, 3, 4, 5, 6]
						}
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
											{index + 1}
										</Link>
									</Tippy>
								),
							},
							{
								title: 'Ngày lấy số',
								render: (data: ICSCT) => (
									<>{'2025-03-13T11:26:17'}</>
									// <p>{data?.releasedDate ? <Moment date={'2025-03-13T11:26:17'} format='DD/MM/YYYY' /> : '---'}</p>
								),
							},
							{
								title: 'Tên dự án',
								render: (data: ICSCT) => <>{'Dự án cấp thành phố'}</>,
							},
							{
								title: 'SL hợp đồng',
								render: (data: ICSCT) => <p>{'24'}</p>,
							},
							{
								title: 'Lãnh đạo phụ trách',
								render: (data: ICSCT) => <>{'---'}</>,
							},
							{
								title: 'Cán bộ chuyên quản',
								render: (data: ICSCT) => <>{'---'}</>,
							},
							{
								title: 'Tiến độ giải ngân',
								render: (data: ICSCT) => <Progress percent={50} width={80} />,
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
											href={`${PATH.CSCT}/${1}`}
											type='edit'
											icon={<Eye fontSize={20} fontWeight={600} />}
											tooltip='Xem chi tiết'
										/>
										<IconCustom
											color='#06D7A0'
											icon={<TickCircle fontSize={20} fontWeight={600} />}
											tooltip='Duyệt thanh toán'
											onClick={() => setUuidConfirm(1)}
										/>
										<IconCustom
											color='#EE464C'
											icon={<CloseCircle fontSize={20} fontWeight={600} />}
											tooltip='Từ chối thanh toán'
											onClick={() => setUuidCancel(1)}
										/>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={
						// Number(_page) ||
						1
					}
					pageSize={
						// Number(_pageSize) ||
						10
					}
					total={
						// listPN?.data?.pagination?.totalCount ||
						10
					}
					dependencies={[_pageSize, _keyword]}
				/>
				<Dialog
					type='primary'
					open={!!uuidConfirm}
					icon={icons.success}
					onClose={() => setUuidConfirm('')}
					title={'Duyệt thanh toán'}
					note={'Bạn có chắc chắn muốn duyệt thanh toán này không?'}
					onSubmit={funcConfirm.mutate}
				/>

				<Dialog
					type='error'
					open={!!uuidCancel}
					icon={icons.question}
					onClose={() => setUuidCancel('')}
					title={'Từ chối thanh toán '}
					note={'Bạn có chắc chắn muốn từ chối thanh toán này không?'}
					onSubmit={funcCancel.mutate}
				/>
			</WrapperScrollbar>
		</div>
	);
}

export default MainPageCSCT;
