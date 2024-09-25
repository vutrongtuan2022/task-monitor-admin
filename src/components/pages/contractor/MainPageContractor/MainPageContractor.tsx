import React from 'react';

import {IContractor, PropsMainPageContractor} from './interfaces';
import styles from './MainPageContractor.module.scss';
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
import FilterCustom from '~/components/common/FilterCustom';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import contractorServices from '~/services/contractorServices';
import contractorcatServices from '~/services/contractorcatServices';
import PositionContainer from '~/components/common/PositionContainer';
import CreateContractor from '../CreateContractor';

function MainPageContractor({}: PropsMainPageContractor) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _type, action} = router.query;

	const listContractor = useQuery([QUERY_KEY.table_contractor, _page, _pageSize, _keyword, _type], {
		queryFn: () =>
			httpRequest({
				http: contractorServices.listContractor({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					type: Number(_type) || null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listGroupContractor = useQuery([QUERY_KEY.dropdown_category_group_contractor], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.categoryCat({
					keyword: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.search_fillter}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên nhà thầu' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Nhóm nhà thầu'
							query='_type'
							listFilter={listGroupContractor.data?.map((v: any) => ({
								id: v?.id,
								name: v?.name,
							}))}
						/>
					</div>
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
						Thêm mới nhà thầu
					</Button>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listContractor?.data?.items || []}
					loading={listContractor.isLoading}
					noti={
						<Noti
							button={
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
									Thêm mới nhà thầu
								</Button>
							}
						/>
					}
				>
					<Table
						fixedHeader={true}
						data={listContractor?.data?.items || []}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: IContractor, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Tên nhà thầu',
								render: (data: IContractor) => <span>{data?.contractorCat?.name}</span>,
							},
							{
								title: 'Nhóm nhà thầu',
								render: (data: IContractor) => <>{data?.name}</>,
							},
							{
								title: 'Địa chỉ',
								render: (data: IContractor) => <>Số 82 Dịch Vọng, Cầu Giấy, Hà Nội</>,
							},
							{
								title: 'Mô tả',
								render: (data: IContractor) => <span>---</span>,
							},

							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IContractor) => (
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
						total={listContractor?.data?.pagination?.totalCount}
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
				<CreateContractor
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

export default MainPageContractor;
