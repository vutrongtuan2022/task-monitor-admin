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

export default function Home() {
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

				<FullColumnFlex>
					<DataWrapper
						data={[
							{
								regencyUu: {name: 'Quản lý'},
								phoneNumber: '0987654321',
								email: 'quanly@example.com',
							},
							{
								regencyUu: {name: 'Nhân viên'},
								phoneNumber: '0912345678',
								email: 'nhanvien@example.com',
							},
							{
								regencyUu: {name: 'Thực tập sinh'},
								phoneNumber: '0934567890',
								email: 'thuctapsinh@example.com',
							},
						]}
						noti={<Noti titleButton='Thêm mới' onClick={() => {}} des='Hiện tại chưa có dữ liệu nào, thêm ngay?' />}
					>
						<Table
							fixedHeader={true}
							data={[
								{
									regencyUu: {name: 'Quản lý'},
									phoneNumber: '0987654321',
									email: 'quanly@example.com',
								},
								{
									regencyUu: {name: 'Nhân viên'},
									phoneNumber: '0912345678',
									email: 'nhanvien@example.com',
								},
								{
									regencyUu: {name: 'Thực tập sinh'},
									phoneNumber: '0934567890',
									email: 'thuctapsinh@example.com',
								},
							]}
							column={[
								{
									title: 'STT',
									render: (data: any, index: number) => <>{index + 1}</>,
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
							]}
						/>
					</DataWrapper>
					<Pagination currentPage={1} total={120} pageSize={20} dependencies={[]} />
				</FullColumnFlex>
			</FlexLayout>
		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Trang chủ'>{Page}</BaseLayout>;
};
