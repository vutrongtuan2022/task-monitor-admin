import React, {useState} from 'react';

import {IUser, PropsMainPageUser} from './interfaces';
import styles from './MainPageUser.module.scss';
import DataWrapper from '~/components/common/DataWrapper';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import Pagination from '~/components/common/Pagination';
import Table from '~/components/common/Table';
import Button from '~/components/common/Button';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import Search from '~/components/common/Search';
import IconCustom from '~/components/common/IconCustom';
import {Edit, Lock1, Trash, Unlock, UserAdd} from 'iconsax-react';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import StateActive from '~/components/common/StateActive';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';

function MainPageUser({}: PropsMainPageUser) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {infoUser} = useSelector((state: RootState) => state.user);
	const [dataStatus, setDataStatus] = useState<IUser | null>(null);

	const {_page, _pageSize, _keyword, _status} = router.query;

	const listUserStaff = useQuery([QUERY_KEY.table_list_user, _page, _pageSize, _keyword, _status], {
		queryFn: () =>
			httpRequest({
				http: userServices.listUser({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					status: !!_status ? Number(_status) : null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Cập nhật trạng thái thành công',
				http: userServices.updateStatus({
					uuid: dataStatus?.uuid!,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.table_list_user]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.search}>
					<Search keyName='_keyword' placeholder='Tìm kiếm theo tên nhân viên, ID' />
				</div>
				<div className={styles.btn}>
					<Button
						p_14_23
						rounded_8
						light-blue
						href={''}
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
					>
						Thêm mới nhân viên
					</Button>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listUserStaff?.data?.items || []}
					loading={listUserStaff.isLoading}
					noti={
						<Noti
							button={
								<Button
									p_14_23
									rounded_8
									light-blue
									href={''}
									icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
								>
									Thêm mới nhân viên
								</Button>
							}
						/>
					}
				>
					<Table
						fixedHeader={true}
						data={listUserStaff?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: any, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Mã nhân viên',
								render: (data: any) => <span>{data?.code || '---'}</span>,
							},
							{
								title: 'Họ tên',
								fixedLeft: true,
								render: (data: any) => <span style={{color: 'var(--primary-btn)'}}>{data?.fullname || '---'}</span>,
							},
							{
								title: 'Số điện thoại',
								render: (data: any) => <>{data?.email || '---'}</>,
							},
							{
								title: 'Email',
								render: (data: any) => <span style={{color: 'var(--primary-btn)'}}>{data?.email || '---'}</span>,
							},
							{
								title: 'Nhóm quyền',
								render: (data: any) => <>{data?.phoneNumber || '---'}</>,
							},
							{
								title: 'Tình trạng',
								render: (data: any) => (
									<StateActive
										stateActive={3}
										listState={[
											{
												state: 1,
												text: 'Hoạt động',
												textColor: '#fff',
												backgroundColor: '#06D7A0',
											},
											{
												state: 2,
												text: 'Đang khóa',
												textColor: '#fff',
												backgroundColor: '#F37277',
											},
											{
												state: 3,
												text: 'Chưa có dữ liệu',
												textColor: '#fff',
												backgroundColor: '#FDAD73',
											},
										]}
									/>
								),
							},
							{
								title: 'Trạng thái tài khoản',
								render: (data: any) => (
									<StateActive
										stateActive={3}
										listState={[
											{
												state: 1,
												text: 'Hoạt động',
												textColor: '#fff',
												backgroundColor: '#06D7A0',
											},
											{
												state: 2,
												text: 'Đang khóa',
												textColor: '#fff',
												backgroundColor: '#F37277',
											},
											{
												state: 3,
												text: 'Chưa có dữ liệu',
												textColor: '#fff',
												backgroundColor: '#FDAD73',
											},
										]}
									/>
								),
							},
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: any) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										{data?.uuid != infoUser?.userUuid ? (
											<IconCustom
												icon={<UserAdd fontSize={20} fontWeight={600} />}
												tooltip='Cấp tài khoản'
												color='#6CD1F2'
												onClick={() => {}}
											/>
										) : (
											<IconCustom
												icon={data?.status == 0 ? <Lock1 size='22' /> : <Unlock size='22' />}
												tooltip={data.status == 1 ? 'Khóa' : 'Mở khóa'}
												color='#06D7A0'
												onClick={() => {}}
											/>
										)}

										<IconCustom
											type='edit'
											icon={<Edit fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											onClick={() => {}}
										/>

										<IconCustom
											type='delete'
											icon={<Trash fontSize={20} fontWeight={600} />}
											tooltip='Xóa bỏ'
											onClick={() => {}}
										/>
									</div>
								),
							},
						]}
					/>
					<Pagination pageSize={1} currentPage={1} total={10} />
				</DataWrapper>
			</WrapperScrollbar>
		</div>
	);
}

export default MainPageUser;
