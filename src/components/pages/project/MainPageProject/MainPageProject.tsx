import React from 'react';

import {PropsMainPageProject} from './interfaces';
import styles from './MainPageProject.module.scss';
import Search from '~/components/common/Search';
import Button from '~/components/common/Button';
import icons from '~/constants/images/icons';
import Image from 'next/image';
import Table from '~/components/common/Table';
import DataWrapper from '~/components/common/DataWrapper';
import Pagination from '~/components/common/Pagination';

function MainPageProject({}: PropsMainPageProject) {
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
						href={''}
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
					>
						Thêm mới dự án
					</Button>
				</div>
			</div>

			<Table
				fixedHeader={true}
				data={[
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1,
				]}
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
						render: (data: any) => <>{data?.phoneNumber || '---'}</>,
					},
					{
						title: 'Email',
						fixedRight: true,
						render: (data: any) => <>{data?.email || '---'}</>,
					},
				]}
			/>
			<Pagination pageSize={1} currentPage={1} total={10} />
		</div>
	);
}

export default MainPageProject;
