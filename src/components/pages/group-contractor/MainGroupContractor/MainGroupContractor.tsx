import React from 'react';

import {IGroupContractor, PropsMainGroupContractor} from './interfaces';
import styles from './MainGroupContractor.module.scss';
import Search from '~/components/common/Search';
import Button from '~/components/common/Button';
import icons from '~/constants/images/icons';
import Image from 'next/image';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import IconCustom from '~/components/common/IconCustom';
import {Edit, Trash} from 'iconsax-react';
import {useRouter} from 'next/router';
import PositionContainer from '~/components/common/PositionContainer';
import CreateGroupContractor from '../CreateGroupContractor';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import contractorcatServices from '~/services/contractorcatServices';

function MainGroupContractor({}: PropsMainGroupContractor) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, action} = router.query;

	const listContractorCat = useQuery([QUERY_KEY.table_group_contractor, _page, _pageSize, _keyword], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.getListContractorCat({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	console.log(listContractorCat.data);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.search_fillter}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo quy trình, ID' />
					</div>
				</div>

				<div className={styles.btn}>
					<Button
						p_14_23
						rounded_8
						light-blue
						onClick={() => {
							router.replace({
								pathname: router.pathname,
								query: {
									...router.query,
									action: 'create',
								},
							});
						}}
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
					>
						Thêm mới nhà thầu
					</Button>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listContractorCat?.data?.items || []}
					loading={listContractorCat.isLoading}
					noti={
						<Noti
							button={
								<Button
									p_14_23
									rounded_8
									light-blue
									onClick={() => {
										router.replace({
											pathname: router.pathname,
											query: {
												...router.query,
												action: 'create',
											},
										});
									}}
									icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
								>
									Thêm mới nhà thầu
								</Button>
							}
						/>
					}
				>
					<Table
						fixedHeader={true}
						data={listContractorCat?.data?.items || []}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: IGroupContractor, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Mã nhóm nhà thầu',
								render: (data: IGroupContractor) => <>{data?.code}</>,
							},
							{
								title: 'Tên nhóm nhà thầu',
								render: (data: IGroupContractor) => <>{data?.name}</>,
							},
							{
								title: 'Mô tả',
								render: (data: IGroupContractor) => <span>{data?.note || '---'}</span>,
							},

							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IGroupContractor) => (
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
					<Pagination
						currentPage={Number(_page) || 1}
						pageSize={Number(_pageSize) || 20}
						total={listContractorCat?.data?.pagination?.totalCount}
						dependencies={[_pageSize, _keyword]}
					/>
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
				<CreateGroupContractor
					onClose={() => {
						const {action, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>
		</div>
	);
}

export default MainGroupContractor;
