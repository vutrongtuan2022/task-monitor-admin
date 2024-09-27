import React from 'react';

import {IProject, PropsMainPageProject} from './interfaces';
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
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';

function MainPageProject({}: PropsMainPageProject) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _status, _managerUuid} = router.query;

	const listProject = useQuery([QUERY_KEY.table_list_user, _page, _pageSize, _keyword, _status, _managerUuid], {
		queryFn: () =>
			httpRequest({
				http: projectServices.listProject({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
					state: null,
					managerUuid: (_managerUuid as string) || '',
				}),
			}),
		select(data) {
			return data;
		},
	});

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
					data={listProject?.data?.items || []}
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
						data={listProject?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IProject, index: number) => <>{index + 1}</>,
							},
							{
								title: 'ID dự án',
								fixedLeft: true,
								render: (data: IProject) => <>{data?.code}</>,
							},
							{
								title: 'Tên công trình',
								render: (data: IProject) => <>{data?.name}</>,
							},
							{
								title: 'Quy trình áp dụng',
								render: (data: IProject) => <>{data?.type}</>,
							},
							{
								title: 'Lãnh đạo phụ trách',
								render: (data: IProject) => <>1.000</>,
							},
							{
								title: 'Cán bộ chuyên quản',
								render: (data: IProject) => <>400</>,
							},
							{
								title: 'TMDT(VND)',
								render: (data: IProject) => <>200</>,
							},
							{
								title: 'Tiến độ dự án',
								render: (data: IProject) => <Progress percent={50} width={80} />,
							},
							{
								title: 'Trạng thái',
								render: (data: IProject) => (
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
								render: (data: IProject) => (
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
		</div>
	);
}

export default MainPageProject;
