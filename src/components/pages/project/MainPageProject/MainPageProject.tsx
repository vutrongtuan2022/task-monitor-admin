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
import IconCustom from '~/components/common/IconCustom';
import {Edit, Trash} from 'iconsax-react';
import Progress from '~/components/common/Progress';

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
								render: (data: any, index: number) => <>{index + 1}</>,
							},
							{
								title: 'ID dự án',
								fixedLeft: true,
								render: (data: any) => <>123456</>,
							},
							{
								title: 'Tên dự án',
								render: (data: any) => <>Dự án Xây Dựng số 3A</>,
							},
							{
								title: 'Lãnh đạo phục trách',
								render: (data: any) => <>Dương Minh Anh</>,
							},
							{
								title: 'Kế hoạch vốn 2024 (triệu đồng)',
								render: (data: any) => <>1.000</>,
							},
							{
								title: 'Tổng mức đầu tư (triệu đồng)',
								render: (data: any) => <>400</>,
							},
							{
								title: 'Tổng dự toán (triệu đồng)',
								render: (data: any) => <>200</>,
							},
							{
								title: 'Trạng thái giải ngân',
								render: (data: any) => <Progress percent={50} width={80} />,
							},
							{
								title: 'Trạng thái dự án',
								render: (data: any) => (
									<StateActive
										stateActive={1}
										listState={[
											{
												state: 1,
												text: 'Hoàn thành',
												textColor: '#fff',
												backgroundColor: '#06D7A0',
											},
											{
												state: 2,
												text: 'Chưa hoàn thành',
												textColor: '#fff',
												backgroundColor: '#F37277',
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
