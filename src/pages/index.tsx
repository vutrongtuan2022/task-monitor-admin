import Head from 'next/head';
import Image from 'next/image';
import {Fragment, ReactElement} from 'react';
import Button from '~/components/common/Button';
import BaseLayout from '~/components/layouts/BaseLayout';
import icons from '~/constants/images/icons';
import styles from './index.module.scss';
import FilterCustom from '~/components/common/FilterCustom';
import FlexLayout from '~/components/layouts/FlexLayout';
import FullColumnFlex from '~/components/layouts/FlexLayout/components/FullColumnFlex';
import Pagination from '~/components/common/Pagination';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import Noti from '~/components/common/DataWrapper/components/Noti';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import Search from '~/components/common/Search';
import Select, {Option} from '~/components/common/Select';
import IconCustom from '~/components/common/IconCustom';
import {TickCircle} from 'iconsax-react';
import {TYPE_DATE} from '~/constants/config/enum';

export default function Home() {
	const listTown = [
		{
			xaid: 1,
			name: 'Town 1',
		},
		{
			xaid: 2,
			name: 'Town 2',
		},
		{
			xaid: 3,
			name: 'Town 3',
		},
	];
	return (
		<Fragment>
			<Head>
				<title>Trang chủ</title>
				<meta name='description' content='Trang chủ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<FlexLayout>
				<div className={styles.header}>
					<div className={styles.main_search}>
						<div className={styles.search}>
							<Search keyName='_keyword' placeholder='Tìm kiếm theo tên nhân viên ' />
						</div>
						<div className={styles.filter}>
							<FilterCustom
								isSearch
								name='Trạng thái'
								query='_status'
								listFilter={[
									{
										id: 1,
										name: 'Đang hoạt động',
									},
									{
										id: 2,
										name: 'Bị khóa',
									},
								]}
							/>
						</div>

						<div className={styles.filter}>
							<DateRangerCustom titleTime='Thời gian' />
						</div>
					</div>
					<div className={styles.btn}>
						<Button
							p_14_23
							rounded_8
							light-blue
							href={''}
							icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
						>
							Thêm mới dự án
						</Button>
					</div>
				</div>
				<Select
					isSearch
					name='townId'
					value={''}
					placeholder='Chọn xã/phường'
					label={
						<span>
							Xã/phường<span style={{color: 'red'}}>*</span>
						</span>
					}
				>
					{listTown?.map((v: any) => (
						<Option key={v?.xaid} value={v?.xaid} title={v?.name} />
					))}
				</Select>
				<FullColumnFlex>
					<DataWrapper
						data={[1, 1, 1, 1, , 11, 11, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
						noti={<Noti titleButton='Thêm mới' onClick={() => {}} des='Hiện tại chưa có dữ liệu nào, thêm ngay?' />}
					>
						<Table
							fixedHeader={true}
							data={[
								1,
								1,
								1,
								1,
								,
								11,
								11,
								1,
								1,
								1,
								1,
								1,
								,
								1,
								1,
								1,
								1,
								1,
								11,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
							]}
							column={[
								{
									checkBox: true,
									title: 'STT',
									render: (data: any, index: number) => <>{index + 1}</>,
								},
								{
									title: 'Chức vụ',
									fixedLeft: true,
									render: (data: any) => (
										<span style={{color: 'var(--primary-btn)'}}>{data?.regencyUu?.name || '---'}</span>
									),
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
									render: (data: any) => (
										<span style={{color: 'var(--primary-btn)'}}>{data?.regencyUu?.name || '---'}</span>
									),
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
									title: 'Tác vụ',
									fixedRight: true,
									render: (data: any) => (
										<>
											<IconCustom type='edit' icon={<TickCircle size='23' />} tooltip='Đã cấp tài khoản' />
										</>
									),
								},
							]}
						/>
					</DataWrapper>
					<Pagination currentPage={2} total={120} pageSize={20} dependencies={[]} />
				</FullColumnFlex>
			</FlexLayout>
		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Trang chủ'>{Page}</BaseLayout>;
};
