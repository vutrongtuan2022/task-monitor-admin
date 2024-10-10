import React, {Fragment, useState} from 'react';

import {PropsMainInfoContractor} from './interfaces';
import styles from './MainInfoContractor.module.scss';
import LayoutPages from '~/components/layouts/LayoutPages';
import {PATH} from '~/constants/config';
import {useRouter} from 'next/router';
import Button from '~/components/common/Button';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Pagination from '~/components/common/Pagination';
import Link from 'next/link';
import Table from '~/components/common/Table';
import Search from '~/components/common/Search';
import clsx from 'clsx';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import IconCustom from '~/components/common/IconCustom';
import {Add, Link1, Trash} from 'iconsax-react';
import Breadcrumb from '~/components/common/Breadcrumb';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import projectServices from '~/services/projectServices';
import {QUERY_KEY} from '~/constants/config/enum';

function MainInfoContractor({}: PropsMainInfoContractor) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid} = router.query;

	const [openDelete, setOpenDelete] = useState<boolean>(false);
	const [openStart, setOpenStart] = useState<boolean>(false);
	const [openFinish, setOpenFinish] = useState<boolean>(false);

	const funcDeleteProject = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa dự án thành công',
				http: projectServices.updateStatus({
					uuid: _uuid as string,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setOpenDelete(false);
				router.replace(`${PATH.Project}`, undefined, {
					scroll: false,
					shallow: false,
				});
			}
		},
	});

	const funcStartProject = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Dự án được bắt đầu thực hiện!',
				http: projectServices.updateState({
					uuid: _uuid as string,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setOpenStart(false);
				queryClient.invalidateQueries([QUERY_KEY.detail_project]);
			}
		},
	});

	const funcFinishProject = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Kết thúc dự án thành công!',
				http: projectServices.updateState({
					uuid: _uuid as string,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setOpenFinish(false);
				queryClient.invalidateQueries([QUERY_KEY.detail_project]);
			}
		},
	});

	return (
		<Fragment>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.Project,
						title: 'Danh sách dự án',
					},
					{
						path: '',
						title: 'Chi tiết dự án',
					},
				]}
			/>
			<LayoutPages
				listPages={[
					{
						title: 'Thông tin chung',
						path: `${PATH.ProjectInfo}?_uuid=${_uuid}`,
					},
					{
						title: 'Báo cáo công việc',
						path: `${PATH.ProjectWorkReport}?_uuid=${_uuid}`,
					},
					{
						title: 'Tiến độ giải ngân',
						path: `${PATH.ProjectDisbursementProgress}?_uuid=${_uuid}`,
					},
					{
						title: 'Thông tin nhà thầu',
						path: `${PATH.ProjectContractor}?_uuid=${_uuid}`,
					},
				]}
				action={
					<div className={styles.group_btn}>
						<Button p_14_24 rounded_8 primary>
							Kết thúc dự án
						</Button>
						<Button p_14_24 rounded_8 light-red>
							Xóa
						</Button>
						<Button p_14_24 rounded_8 primaryLinear>
							Chỉnh sửa
						</Button>
					</div>
				}
			>
				<div className={clsx(styles.basic_info)}>
					<div className={styles.head}>
						<h4>Thông tin nhà thầu</h4>
					</div>
					<div className={styles.container}>
						<div className={styles.head_filt}>
							<div className={styles.main_search}>
								<div className={styles.search}>
									<Search keyName='_keyword' placeholder='Tìm kiếm theo tên nhà thầu,nhóm nhà thầu' />
								</div>
							</div>
							<div className={styles.btn}>
								<Button
									p_14_24
									rounded_8
									light-blue
									icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
								>
									Thêm mới nhà thầu
								</Button>
							</div>
						</div>
						<WrapperScrollbar>
							<DataWrapper data={[1, 1, 1]}>
								<Table
									data={[1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
									column={[
										{
											title: 'STT',
											render: (data: any, index: number) => <>{index + 1}</>,
										},
										{
											title: 'Thuộc nhóm',
											render: (data: any) => <>Nhà thầu thi công xây lắp</>,
										},
										{
											title: 'Tên nhà thầu',
											render: (data: any) => <>Nhà thầu số 34 HD</>,
										},
										{
											title: 'Hợp đồng dự án',
											render: (data: any) => (
												<>
													{data === 1 && (
														<div className={styles.contract_link}>
															<Link1 color='#2970FF' />
															<Link href={`#`} className={styles.link}>
																Hợp đồng số 3 A
															</Link>
														</div>
													)}
													{data === 2 && (
														<div className={styles.contract_link}>
															<Add color='#06D7A0' />
															<Link href={`#`} className={styles.link_add}>
																Thêm hợp đồng
															</Link>
														</div>
													)}
												</>
											),
										},
										{
											title: 'Bảo lãnh hợp đồng dự án',
											render: (data: any) => (
												<>
													{data === 1 && (
														<div className={styles.contract_link}>
															<Link1 color='#2970FF' />
															<Link href={`#`} className={styles.link}>
																Hợp đồng số 3 A
															</Link>
														</div>
													)}
													{data === 2 && (
														<div className={styles.contract_link}>
															<Add color='#06D7A0' />
															<Link href={`#`} className={styles.link_add}>
																Thêm hợp đồng
															</Link>
														</div>
													)}
												</>
											),
										},
										{
											title: 'Bảo lãnh hợp đồng giải ngân',
											render: (data: any) => (
												<>
													{data === 1 && (
														<div className={styles.contract_link}>
															<Link1 color='#2970FF' />
															<Link href={`#`} className={styles.link}>
																Hợp đồng số 3 A
															</Link>
														</div>
													)}
													{data === 2 && (
														<div className={styles.contract_link}>
															<Add color='#06D7A0' />
															<Link href={`#`} className={styles.link_add}>
																Thêm hợp đồng
															</Link>
														</div>
													)}
												</>
											),
										},
										{
											title: 'Hành động',
											fixedRight: true,
											render: (data: any) => (
												<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
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
							</DataWrapper>
							<Pagination currentPage={1} pageSize={20} total={20} />
						</WrapperScrollbar>
					</div>
				</div>
			</LayoutPages>
		</Fragment>
	);
}

export default MainInfoContractor;
