import React from 'react';

import {PropsMainGroupContractor} from './interfaces';
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

function MainGroupContractor({}: PropsMainGroupContractor) {
	const router = useRouter();

	const {action} = router.query;

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
					data={[1]}
					loading={false}
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
						data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: any, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Mã nhóm nhà thầu',
								render: (data: any) => <>NNT04422</>,
							},
							{
								title: 'Tên nhóm nhà thầu',
								render: (data: any) => <>Nhóm nhà thầu số 3</>,
							},
							{
								title: 'Mô tả',
								render: (data: any) => <span>---</span>,
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
				<CreateGroupContractor />
			</PositionContainer>
		</div>
	);
}

export default MainGroupContractor;
