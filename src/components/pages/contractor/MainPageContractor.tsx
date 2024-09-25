import React from 'react';

import {PropsMainPageContractor} from './interfaces/inde';
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
function MainPageContractor({}: PropsMainPageContractor) {
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.search}>
					<Search keyName='_keyword' placeholder='Tìm kiếm theo tên nhà thầu' />
				</div>
				<div className={styles.btn}>
					<Button
						p_14_23
						rounded_8
						light-blue
						href={''}
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
									href={''}
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
						data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: any, index: number) => <>{index + 1}</>,
							},
							{
								title: 'tên nhà thầu',
								render: (data: any) => <span>nhà thầu 01</span>,
							},
							{
								title: 'Nhóm nhà thầu',
								render: (data: any) => <>thiết kế</>,
							},
							{
								title: 'địa chỉ',
								render: (data: any) => <>Số 82 Dịch Vọng, Cầu Giấy, Hà Nội</>,
							},
							{
								title: 'Mô tả',
								render: (data: any) => <span>---</span>,
							},

							{
								title: 'Hoạt động',
								fixedRight: true,
								render: (data: any) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											icon={<Edit fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											color='#202939'
											href={`/cong-ty/chinh-sua?_id=${data?.uuid}`}
										/>
										<IconCustom icon={<Trash fontSize={20} fontWeight={600} />} tooltip='Xóa' color='#EE464C' />
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

export default MainPageContractor;
