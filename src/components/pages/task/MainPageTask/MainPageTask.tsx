import React from 'react';

import {PropsMainPageTask} from './interfaces';
import styles from './MainPageTask.module.scss';
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

function MainPageTask({}: PropsMainPageTask) {
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
						p_14_24
						rounded_8
						light-blue
						href={''}
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
					>
						Thêm mới quy trình
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
									p_14_24
									rounded_8
									light-blue
									href={''}
									icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
								>
									Thêm mới quy trình
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
								title: 'Tên quy trình',
								render: (data: any) => <>Quy mô phòng giao dịch</>,
							},
							{
								title: 'Ngày tạo',
								render: (data: any) => <>15/07/2024 09:52</>,
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
		</div>
	);
}

export default MainPageTask;
