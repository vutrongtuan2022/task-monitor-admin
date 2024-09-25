import React, {useState} from 'react';

import {PropsCreateContractor} from './interfaces';
import styles from './CreateContractor.module.scss';
import {IoClose} from 'react-icons/io5';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import contractorcatServices from '~/services/contractorcatServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import contractorServices from '~/services/contractorServices';
import Select, {Option} from '~/components/common/Select';

function CreateContractor({onClose}: PropsCreateContractor) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{
		code: string;
		name: string;
		type: number | null;
		note: string;
		matp: string;
		maqh: string;
		xaid: string;
		address: string;
	}>({
		code: '',
		name: '',
		type: null,
		note: '',
		matp: '',
		maqh: '',
		xaid: '',
		address: '',
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

	console.log(form.type);

	return (
		<Form form={form} setForm={setForm}>
			{/* <Loading loading={funcCreateContractor.isLoading} /> */}
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm mới nhà thầu</h4>
				<div className={styles.form}>
					<Input
						placeholder='Nhập tên nhóm nhà thầu'
						name='name'
						type='text'
						value={form.name}
						isRequired
						label={
							<span>
								Tên nhà thầu <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>

					<div className={styles.select}>
						<Select
							isSearch
							name='type'
							value={form.type}
							placeholder='Lựa chọn'
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									type: e.target.value,
								}))
							}
							label={
								<span>
									Thuộc nhóm nhà thầu<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listGroupContractor?.data?.map((v: any) => (
								<Option key={v?.uuid} title={v?.name} value={v?.uuid} />
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

export default CreateContractor;
