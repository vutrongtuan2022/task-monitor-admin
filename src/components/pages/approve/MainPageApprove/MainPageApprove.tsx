import React, {useState} from 'react';
import styles from './MainPageApprove.module.scss';
import {PropsMainPageApprove} from './interface';
import Search from '~/components/common/Search';
import Button from '~/components/common/Button';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';

import icons from '~/constants/images/icons';
import Image from 'next/image';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {useRouter} from 'next/router';

import CreateContractor from '../../contractor/CreateContractor';
import PositionContainer from '~/components/common/PositionContainer';
import IconCustom from '~/components/common/IconCustom';
import {CloseCircle, TickCircle} from 'iconsax-react';
import Dialog from '~/components/common/Dialog';
import Form from '~/components/common/Form';
import Popup from '~/components/common/Popup';
import TextArea from '~/components/common/Form/components/TextArea';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import FilterCustom from '~/components/common/FilterCustom';
import contractorcatServices from '~/services/contractorcatServices';
import Pagination from '~/components/common/Pagination';
function MainPageApprove({}: PropsMainPageApprove) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _type, action, _uuidContractor} = router.query;
	const [uuidConfirm, setUuidConfirm] = useState<string>('');
	const [uuidCancel, setUuidCancel] = useState<string>('');
	const [form, setForm] = useState<{feedback: string}>({
		feedback: '',
	});

	const {data: listGroupContractor} = useQuery([QUERY_KEY.dropdown_group_contractor], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.categoryContractorCat({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	// const funcConfirm = useMutation({
	// 	mutationFn: () => {
	// 		return httpRequest({
	// 			showMessageFailed: true,
	// 			showMessageSuccess: true,
	// 			msgSuccess: 'Duyệt nhóm nhà thầu thành công!',
	// 			http: contractsFundServices.approveContractFund({
	// 				uuid: uuidConfirm,
	// 				isApproved: 1,
	// 				reason: '',
	// 			}),
	// 		});
	// 	},
	// 	onSuccess(data) {
	// 		if (data) {
	// 			setUuidConfirm('');
	// 			queryClient.invalidateQueries([QUERY_KEY.table_list_report_disbursement]);
	// 		}
	// 	},
	// });

	// const funcCancel = useMutation({
	// 	mutationFn: () => {
	// 		return httpRequest({
	// 			showMessageFailed: true,
	// 			showMessageSuccess: true,
	// 			msgSuccess: 'Từ chối nhóm nhà thầu thành công!',
	// 			http: contractsFundServices.approveContractFund({
	// 				uuid: uuidCancel,
	// 				isApproved: 0,
	// 				reason: form.feedback,
	// 			}),
	// 		});
	// 	},
	// 	onSuccess(data) {
	// 		if (data) {
	// 			setUuidCancel('');
	// 			queryClient.invalidateQueries([QUERY_KEY.table_list_report_disbursement]);
	// 		}
	// 	},
	// });

	return (
		<div className={styles.container}>
			{/* <Loading loading={funcDeleteBranches.isLoading} /> */}

			<div className={styles.main_table}>
				<div className={styles.head_filt}>
					<div className={styles.main_search}>
						<div className={styles.search}>
							<Search keyName='_keyword' placeholder='Tìm kiếm theo tên nhà thầu' />
						</div>
						<div className={styles.filter}>
							<FilterCustom
								isSearch
								name='Nhóm nhà thầu'
								query='_contractorCat'
								listFilter={listGroupContractor?.map((v: any) => ({
									id: v?.uuid,
									name: v?.name,
								}))}
							/>
						</div>
					</div>
				</div>
				<WrapperScrollbar>
					<DataWrapper
						data={
							// listBranches?.data?.items ||
							[1, 2, 3, 4]
						}
						// loading={listBranches.isLoading}
					>
						<Table
							fixedHeader={true}
							data={
								// listBranches?.data?.items ||
								[1, 2, 3, 4, 5, 6, 7, 8, 9]
							}
							column={[
								{
									title: 'STT',
									fixedLeft: true,
									render: (data: PropsMainPageApprove, index: number) => <>{index + 1}</>,
								},

								{
									title: 'Nhóm nhà thầu cần thêm',
									render: (data: PropsMainPageApprove) => <>{'---'}</>,
								},
								{
									title: 'Người gửi yêu cầu',
									render: (data: PropsMainPageApprove) => <>{'---'}</>,
								},
								{
									title: 'Thời gian yêu cầu',
									render: (data: PropsMainPageApprove) => <>{'---'}</>,
								},

								// {
								// 	title: 'Hành động',
								// 	fixedRight: true,
								// 	render: (data: PropsMainPageApprove) => (
								// 		<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
								// 			<>
								// 				<IconCustom
								// 					color='#06D7A0'
								// 					icon={<TickCircle fontSize={20} fontWeight={600} />}
								// 					tooltip='Duyệt nhóm nhà thầu'
								// 					onClick={() => setUuidConfirm(1)}
								// 				/>
								// 				<IconCustom
								// 					color='#EE464C'
								// 					icon={<CloseCircle fontSize={20} fontWeight={600} />}
								// 					tooltip='Từ chối nhóm nhà thầu'
								// 					onClick={() => setUuidCancel(1)}
								// 				/>
								// 			</>
								// 		</div>
								// 	),
								// },
							]}
						/>
					</DataWrapper>
					{/* <Pagination
					currentPage={1}
					pageSize={10}
					total={listBranches?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword]}
				/> */}
				</WrapperScrollbar>
			</div>

			{/* <Dialog
				type='primary'
				open={!!uuidConfirm}
				icon={icons.success}
				onClose={() => setUuidConfirm('')}
				title={'Duyệt báo cáo nhóm'}
				note={'Bạn có chắc chắn muốn duyệt nhóm này không?'}
				onSubmit={funcConfirm.mutate}
			/> */}

			{/* <Form form={form} setForm={setForm}>
				<Popup open={!!uuidCancel} onClose={() => setUuidCancel('')}>
					<div className={styles.main_popup}>
						<div className={styles.head_popup}>
							<h4>Xác nhận từ chối thêm nhóm nhà thầu mới</h4>
						</div>
						<div className={styles.form_poup}>
							<TextArea name='feedback' placeholder='Nhập lý do từ chối' label='Lý do từ chối' />
							<div className={styles.group_button}>
								<div>
									<Button p_12_20 grey rounded_6 onClick={() => setUuidCancel('')}>
										Không
									</Button>
								</div>
								<div className={styles.btn}>
									<Button disable={!form.feedback} p_12_20 error rounded_6 onClick={funcCancel.mutate}>
										Có, tôi đồng ý
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Popup>
			</Form> */}
		</div>
	);
}

export default MainPageApprove;
