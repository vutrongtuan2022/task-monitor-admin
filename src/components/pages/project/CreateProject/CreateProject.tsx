import React, {useEffect, useState} from 'react';

import {IFormCreateProject, PropsCreateProject} from './interfaces';
import styles from './CreateProject.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Form, {Input} from '~/components/common/Form';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG, TYPE_ACCOUNT} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import branchesServices from '~/services/branchesServices';
import Select, {Option} from '~/components/common/Select';
import clsx from 'clsx';
import taskCatServices from '~/services/taskCatServices';
import userServices from '~/services/userServices';
import SelectMany from '~/components/common/SelectMany';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import provineServices from '~/services/provineServices';
import DatePicker from '~/components/common/DatePicker';
import TextArea from '~/components/common/Form/components/TextArea';

function CreateProject({}: PropsCreateProject) {
	const [users, setUsers] = useState<any[]>([]);
	const [form, setForm] = useState<IFormCreateProject>({
		branchUuid: '',
		branchCode: '',
		name: '',
		type: null,
		managerUuid: '',
		expectBudget: 0,
		realBudget: 0,
		reserveBudget: 0,
		totalBudget: '',
		matp: '',
		maqh: '',
		xaid: '',
		address: '',
		expectStart: '',
		expectEnd: '',
		realStart: '',
		description: '',
	});

	useEffect(() => {
		setForm((prev) => ({
			...prev,
			totalBudget: convertCoin(price(form.realBudget) + price(form.reserveBudget)),
		}));
	}, [form.realBudget, form.reserveBudget]);

	const {data: listBranches} = useQuery([QUERY_KEY.dropdown_branches], {
		queryFn: () =>
			httpRequest({
				http: branchesServices.categoryBranches({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: listTasks} = useQuery([QUERY_KEY.dropdown_task_cat], {
		queryFn: () =>
			httpRequest({
				http: taskCatServices.categoryTaskCat({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: listUser} = useQuery([QUERY_KEY.dropdown_user], {
		queryFn: () =>
			httpRequest({
				http: userServices.categoryUser({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					roleUuid: '',
					type: TYPE_ACCOUNT.USER,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: listManager} = useQuery([QUERY_KEY.dropdown_manager], {
		queryFn: () =>
			httpRequest({
				http: userServices.categoryUser({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					roleUuid: '',
					type: TYPE_ACCOUNT.MANAGER,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: listProvince} = useQuery([QUERY_KEY.dropdown_province], {
		queryFn: () =>
			httpRequest({
				http: provineServices.listProvine({
					keyword: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: listDistrict} = useQuery([QUERY_KEY.dropdown_district, form.matp], {
		queryFn: () =>
			httpRequest({
				http: provineServices.listDistrict({
					keyword: '',
					idParent: form.matp,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.matp,
	});

	const {data: listTown} = useQuery([QUERY_KEY.dropdown_town, form.maqh], {
		queryFn: () =>
			httpRequest({
				http: provineServices.listTown({
					keyword: '',
					idParent: form.maqh,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.maqh,
	});

	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.Project,
						title: 'Danh sách dự án',
					},
					{
						path: '',
						title: 'Thêm mới dự án',
					},
				]}
			/>
			<div className={styles.main}>
				<Form form={form} setForm={setForm}>
					<div className={styles.grid}>
						<div className={styles.basic_info}>
							<div className={styles.head}>
								<h4>Thông tin cơ bản</h4>
							</div>
							<div className={styles.form}>
								<div className={styles.col_2}>
									<Select
										isSearch={true}
										label={
											<span>
												Tên chi nhánh <span style={{color: 'red'}}>*</span>
											</span>
										}
										name='branchUuid'
										value={form.branchUuid}
										placeholder='Chọn'
									>
										{listBranches?.map((v: any) => (
											<Option
												key={v.uuid}
												value={v.uuid}
												title={v?.name}
												onClick={() =>
													setForm((prev) => ({
														...prev,
														branchUuid: v?.uuid,
														branchCode: v?.code,
													}))
												}
											/>
										))}
									</Select>
									<Input
										label={
											<span>
												Mã chi nhánh <span style={{color: 'red'}}>*</span>
											</span>
										}
										type='text'
										placeholder='Mã tài khoản'
										name='branchCode'
										value={form?.branchCode}
										readOnly={true}
									/>
								</div>
								<div className={clsx(styles.mt, styles.col_2)}>
									<Input
										label={
											<span>
												Tên công trình <span style={{color: 'red'}}>*</span>
											</span>
										}
										type='text'
										placeholder='Nhập tên công trình'
										name='name'
										value={form?.name}
										isRequired={true}
										blur={true}
									/>
									<Select
										isSearch={true}
										label={
											<span>
												Quy trình áp dụng <span style={{color: 'red'}}>*</span>
											</span>
										}
										name='type'
										value={form.type}
										placeholder='Chọn'
									>
										{listTasks?.map((v: any) => (
											<Option
												key={v.id}
												value={v.id}
												title={v?.name}
												onClick={() =>
													setForm((prev) => ({
														...prev,
														type: v?.id,
													}))
												}
											/>
										))}
									</Select>
								</div>
								<div className={clsx(styles.mt, styles.col_2)}>
									<SelectMany
										placeholder='Chọn'
										label={
											<span>
												Cán bộ chuyên quản <span style={{color: 'red'}}>*</span>
											</span>
										}
										value={users}
										setValue={(user) =>
											setUsers(
												users?.find((v: any) => v?.uuid == user.uuid)
													? users?.filter((v: any) => v?.uuid != user.uuid)
													: [...users, user]
											)
										}
										listData={listUser?.map((v: any) => ({
											uuid: v?.uuid,
											title: v?.fullname,
											code: v?.code,
										}))}
									/>
									<Select
										isSearch={true}
										label={
											<span>
												Lãnh đạo phụ trách <span style={{color: 'red'}}>*</span>
											</span>
										}
										name='managerUuid'
										value={form.managerUuid}
										placeholder='Chọn'
									>
										{listManager?.map((v: any) => (
											<Option
												key={v.uuid}
												value={v.uuid}
												title={v?.fullname}
												onClick={() =>
													setForm((prev) => ({
														...prev,
														managerUuid: v?.id,
													}))
												}
											/>
										))}
									</Select>
								</div>
							</div>
						</div>
						<div className={styles.basic_info}>
							<div className={styles.head}>
								<h4>Thông tin vốn dự án</h4>
							</div>
							<div className={styles.form}>
								<Input
									label={
										<span>
											Kế hoạch vốn đầu tư <span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Nhập kế hoạch vốn đầu tư'
									type='text'
									isMoney
									name='expectBudget'
									value={form?.expectBudget}
									isRequired={true}
									blur={true}
									unit='VND'
								/>
								<Input
									label={
										<span>
											Tổng dự toán <span style={{color: 'red'}}>*</span>
										</span>
									}
									type='text'
									placeholder='Nhập tổng dự toán'
									isMoney
									name='realBudget'
									value={form?.realBudget}
									isRequired={true}
									blur={true}
									unit='VND'
								/>
								<Input
									label={
										<span>
											Vốn dự phòng được duyệt <span style={{color: 'red'}}>*</span>
										</span>
									}
									type='text'
									placeholder='Nhập vốn dự phòng được duyệt '
									isMoney
									name='reserveBudget'
									value={form?.reserveBudget}
									isRequired={true}
									blur={true}
									unit='VND'
								/>
								<Input
									label={
										<span>
											Tổng mức đầu tư dự án <span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Nhập tổng mức đầu tư dự án'
									type='text'
									isMoney
									name='totalBudget'
									value={form?.totalBudget}
									readOnly={true}
									unit='VND'
								/>
							</div>
						</div>
					</div>
					<div className={clsx(styles.basic_info, styles.mt)}>
						<div className={styles.head}>
							<h4>Thông tin khác</h4>
						</div>
						<div className={styles.form}>
							<div className={styles.col_3}>
								<DatePicker
									icon={true}
									label={
										<span>
											Thời gian bắt đầu dự kiến <span style={{color: 'red'}}>*</span>
										</span>
									}
									name='expectStart'
									value={form.expectStart}
									placeholder='Chọn thời gian bắt đầu dự kiến'
									onSetValue={(date) =>
										setForm((prev) => ({
											...prev,
											expectStart: date,
										}))
									}
								/>
								<DatePicker
									icon={true}
									label={
										<span>
											Thời gian kết thúc dự kiến <span style={{color: 'red'}}>*</span>
										</span>
									}
									name='expectEnd'
									value={form.expectEnd}
									placeholder='Chọn thời gian kết thúc dự kiến'
									onSetValue={(date) =>
										setForm((prev) => ({
											...prev,
											expectEnd: date,
										}))
									}
								/>
								<DatePicker
									icon={true}
									label={
										<span>
											Thời gian bắt đầu dự án được phê duyệt <span style={{color: 'red'}}>*</span>
										</span>
									}
									name='realStart'
									value={form.realStart}
									placeholder='Chọn thời gian bắt đầu dự án được phê duyệt'
									onSetValue={(date) =>
										setForm((prev) => ({
											...prev,
											realStart: date,
										}))
									}
								/>
							</div>
							<div className={clsx(styles.col_3, styles.mt)}>
								<Select isSearch name='matp' value={form.matp} placeholder='Lựa chọn' label={<span>Tỉnh/ TP</span>}>
									{listProvince?.map((v: any) => (
										<Option
											key={v?.matp}
											value={v?.matp}
											title={v?.name}
											onClick={() =>
												setForm((prev: any) => ({
													...prev,
													matp: v?.matp,
													maqh: '',
													xaid: '',
												}))
											}
										/>
									))}
								</Select>

								<div>
									<Select isSearch name='maqh' value={form.maqh} placeholder='Lựa chọn' label={<span>Quận/ Huyện</span>}>
										{listDistrict?.map((v: any) => (
											<Option
												key={v?.maqh}
												value={v?.maqh}
												title={v?.name}
												onClick={() =>
													setForm((prev: any) => ({
														...prev,
														maqh: v?.maqh,
														xaid: '',
													}))
												}
											/>
										))}
									</Select>
								</div>

								<Select isSearch name='xaid' value={form.xaid} placeholder='Lựa chọn' label={<span>Thị trấn/ Xã </span>}>
									{listTown?.map((v: any) => (
										<Option
											key={v?.xaid}
											value={v?.xaid}
											title={v?.name}
											onClick={() =>
												setForm((prev: any) => ({
													...prev,
													xaid: v?.xaid,
												}))
											}
										/>
									))}
								</Select>
							</div>
							<div className={clsx(styles.col_3, styles.mt)}>
								<TextArea name='address' placeholder='Nhập địa chỉ' label='Địa chỉ' />
								<TextArea name='description' placeholder='Nhập mô tả' label='Mô tả' />
							</div>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default CreateProject;
