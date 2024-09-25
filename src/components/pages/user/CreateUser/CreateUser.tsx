import React, {useState} from 'react';

import {PropsCreateUser} from './interfaces';
import styles from './CreateUser.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import Loading from '~/components/common/Loading';
import TextArea from '~/components/common/Form/components/TextArea';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import {IoClose} from 'react-icons/io5';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Select, {Option} from '~/components/common/Select';
import provineServices from '~/services/provineServices';

function CreateUser({onClose}: PropsCreateUser) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{
		uuid: string;
		code: string;
		fullName: string;
		email: string;
		gender: number;
		phone: string;
		birthday: string;
		address: string;
		matp: string;
		maqh: string;
		xaid: string;
	}>({
		uuid: '',
		code: '',
		fullName: '',
		email: '',
		gender: 0,
		phone: '',
		birthday: '',
		address: '',
		matp: '',
		maqh: '',
		xaid: '',
	});

	const funcCreateGroupContractor = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm nhân viên thành công!',
				http: userServices.upsertUser({
					uuid: form.uuid,
					code: form.code,
					fullName: form.fullName,
					email: form.email,
					gender: form.gender,
					phone: form.phone,
					birthday: form.birthday,
					address: form.address,
					matp: form.matp,
					maqh: form.maqh,
					xaid: form.xaid,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					uuid: '',
					code: '',
					fullName: '',
					email: '',
					gender: 0,
					phone: '',
					birthday: '',
					address: '',
					matp: '',
					maqh: '',
					xaid: '',
				});
				queryClient.invalidateQueries([QUERY_KEY.table_list_user]);
			}
		},
	});

	const listProvince = useQuery([QUERY_KEY.dropdown_province], {
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

	const listDistrict = useQuery([QUERY_KEY.dropdown_district, form.matp], {
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

	const listTown = useQuery([QUERY_KEY.dropdown_town, form.maqh], {
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
		<Form form={form} setForm={setForm} onSubmit={funcCreateGroupContractor.mutate}>
			<Loading loading={funcCreateGroupContractor.isLoading} />
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm mới nhóm nhà thầu</h4>
				<div className={styles.form}>
					<Input
						placeholder='Nhập họ và tên'
						name='name'
						type='text'
						value={form.fullName}
						isRequired
						label={
							<span>
								Họ và tên <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>
					<Input
						placeholder='Nhập email'
						name='email'
						type='text'
						value={form.email}
						isRequired
						label={
							<span>
								Email <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>
					<Input
						placeholder='Nhập số điện thoại'
						name='phone'
						type='text'
						value={form.phone}
						isRequired
						label={
							<span>
								Số điện thoại <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>
					<Input
						placeholder='Nhập ngày sinh'
						name='birthday'
						type='date'
						value={form.birthday}
						isRequired
						label={
							<span>
								Ngày sinh <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>
					<Input
						placeholder='Nhập địa chỉ'
						name='address'
						type='text'
						value={form.address}
						isRequired
						label={
							<span>
								Địa chỉ <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>
					<div className={styles.select}>
						<Select
							isSearch
							name='provinceId'
							value={form.matp}
							placeholder='Chọn tỉnh/thành phố'
							label={<span>Tỉnh/Thành phố</span>}
						>
							{listProvince?.data?.map((v: any) => (
								<Option
									key={v?.matp}
									value={v?.matp}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											provinceId: v?.matp,
											districtId: '',
											townId: '',
										}))
									}
								/>
							))}
						</Select>

						<Select
							isSearch
							name='provinceId'
							value={form.matp}
							placeholder='Chọn quận/ Huyện'
							label={<span>Quận/ Huyện</span>}
						>
							{listDistrict?.data?.map((v: any) => (
								<Option
									key={v?.maqh}
									value={v?.maqh}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											districtId: v?.maqh,
											townId: '',
										}))
									}
								/>
							))}
						</Select>

						<Select isSearch name='provinceId' value={form.matp} placeholder='Chọn xã/ Phường' label={<span>Xã/ Phường</span>}>
							{listTown?.data?.map((v: any) => (
								<Option
									key={v?.xaid}
									value={v?.xaid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											townId: v?.xaid,
										}))
									}
								/>
							))}
						</Select>
					</div>

					<div className={styles.note}>
						<TextArea name='note' placeholder='Nhập mô tả' label='Mô tả' />
					</div>
				</div>
				<div className={styles.group_button}>
					<div>
						<Button p_12_20 grey rounded_6 onClick={onClose}>
							Hủy bỏ
						</Button>
					</div>
					<FormContext.Consumer>
						{({isDone}) => (
							<div className={styles.btn}>
								<Button disable={!isDone} p_12_20 primary rounded_6 icon={<FolderOpen size={18} color='#fff' />}>
									Lưu lại
								</Button>
							</div>
						)}
					</FormContext.Consumer>
				</div>
				<div className={styles.close} onClick={onClose}>
					<IoClose size={28} color='#8492A6' />
				</div>
			</div>
		</Form>
	);
}

export default CreateUser;
