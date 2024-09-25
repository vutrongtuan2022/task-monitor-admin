import React from 'react';

import {PropsMainPageProject} from './interfaces';
import styles from './MainPageProject.module.scss';
import Search from '~/components/common/Search';
import Button from '~/components/common/Button';
import icons from '~/constants/images/icons';
import Image from 'next/image';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import PositionContainer from '~/components/common/PositionContainer';
import {useRouter} from 'next/router';
import StateActive from '~/components/common/StateActive';

function MainPageProject({}: PropsMainPageProject) {
	const router = useRouter();

	const {action} = router.query;

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.search}>
					<Search keyName='_keyword' placeholder='Tìm kiếm theo tên dự án, ID' />
				</div>
				<div className={styles.btn}>
					<Button
						p_14_23
						rounded_8
						light-blue
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
						onClick={() => {
							router.replace({
								pathname: router.pathname,
								query: {
									...router.query,
									action: 'create',
								},
							});
						}}
					>
						Thêm mới dự án
					</Button>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={[1]}
					loading={false}
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
									Thêm mới dự án
								</Button>
							}
						/>
					}
				>
					<Table
						fixedHeader={true}
						data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: any, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Chức vụ',
								render: (data: any) => <span style={{color: 'var(--primary-btn)'}}>{data?.regencyUu?.name || '---'}</span>,
							},
							{
								title: 'Số điện thoại',
								render: (data: any) => <>{data?.phoneNumber || '---'}</>,
							},
							{
								title: 'Email',
								render: (data: any) => <>{data?.email || '---'}</>,
							},
							{
								title: 'Chức vụ',
								render: (data: any) => <span style={{color: 'var(--primary-btn)'}}>{data?.regencyUu?.name || '---'}</span>,
							},
							{
								title: 'Số điện thoại',
								render: (data: any) => <>{data?.phoneNumber || '---'}</>,
							},
							{
								title: 'Email',
								render: (data: any) => <>{data?.email || '---'}</>,
							},
							{
								title: 'Chức vụ',
								render: (data: any) => <span style={{color: 'var(--primary-btn)'}}>{data?.regencyUu?.name || '---'}</span>,
							},
							{
								title: 'Số điện thoại',
								render: (data: any) => <>{data?.phoneNumber || '---'}</>,
							},
							{
								title: 'Email',
								render: (data: any) => <>{data?.email || '---'}</>,
							},
							{
								title: 'Chức vụ',
								render: (data: any) => <span style={{color: 'var(--primary-btn)'}}>{data?.regencyUu?.name || '---'}</span>,
							},
							{
								title: 'Số điện thoại',
								render: (data: any) => <>{data?.phoneNumber || '---'}</>,
							},
							{
								title: 'Email',
								render: (data: any) => <>{data?.email || '---'}</>,
							},
							{
								title: 'Chức vụ',
								render: (data: any) => <span style={{color: 'var(--primary-btn)'}}>{data?.regencyUu?.name || '---'}</span>,
							},
							{
								title: 'Số điện thoại',
								render: (data: any) => <>{data?.phoneNumber || '---'}</>,
							},
							{
								title: 'Email',
								render: (data: any) => <>{data?.email || '---'}</>,
							},
							{
								title: 'Chức vụ',
								render: (data: any) => <span style={{color: 'var(--primary-btn)'}}>{data?.regencyUu?.name || '---'}</span>,
							},
							{
								title: 'Số điện thoại',
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
								title: 'Email',
								fixedRight: true,
								render: (data: any) => (
									<StateActive
										stateActive={2}
										listState={[
											{
												state: 1,
												text: 'Đã cấp tài khoản',
												backgroundColor: '#6CD1F2',
											},
											{
												state: 2,
												text: 'Chưa cấp tài khoản',
												backgroundColor: '#FD9599',
											},
										]}
									/>
								),
							},
						]}
					/>
					<Pagination pageSize={1} currentPage={1} total={10} />
				</DataWrapper>
			</WrapperScrollbar>

			<PositionContainer
				open={action == 'create'}
				onClose={() => {
					const {action, ...rest} = router.query;
					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<div style={{width: 500, background: '#ffff', height: '100vh'}}>a</div>
			</PositionContainer>
		</div>
	);
}

export default MainPageProject;
