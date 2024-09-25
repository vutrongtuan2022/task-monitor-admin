import React, {useState} from 'react';

import {PropsFormCreateAccount} from './interfaces';
import styles from './FormCreateAccount.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import Select, {Option} from '~/components/common/Select';
import Button from '~/components/common/Button';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {toastWarn} from '~/common/funcs/toast';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import {RiCloseFill} from 'react-icons/ri';
import {httpRequest} from '~/services';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import roleServices from '~/services/roleServices';
import {useRouter} from 'next/router';
import accountServices from '~/services/accountServices';
import md5 from 'md5';

function FormCreateAccount({dataCreateAccount, onClose}: PropsFormCreateAccount) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword} = router.query;
	const [form, setForm] = useState<{
		userUuid: string;
		username: string;
		password: string;
		roleUuid: string;
	}>({userUuid: '', username: '', roleUuid: '', password: ''});

	const listRole = useQuery([QUERY_KEY.table_role, _page, _pageSize, _keyword], {
		queryFn: () =>
			httpRequest({
				http: roleServices.listRole({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcCreateAccount = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Cấp tài khoản thành công',
				http: accountServices.register({
					userUuid: dataCreateAccount?.uuid || '',
					username: form.username || '',
					roleUuid: form.roleUuid || '',
					password: md5(`${form?.password}${process.env.NEXT_PUBLIC_KEY_PASS}`),
				}),
			}),
		onSuccess(data) {
			if (data) {
				queryClient.invalidateQueries([QUERY_KEY.table_list_user]);
				onClose();
			}
		},
	});

	const handleSubmit = async () => {
		if (!form?.roleUuid) {
			return toastWarn({msg: 'Vui lòng chọn nhóm quyền'});
		}

		return funcCreateAccount.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcCreateAccount.isLoading} />
			<div className={styles.header}>
				<h3 className={styles.title}>Cấp tài khoản</h3>
			</div>
			<div className={styles.btn_close}>
				<RiCloseFill size={30} onClick={onClose} />
			</div>

			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.form}>
					<Input
						name='username'
						placeholder='Nhập tên đăng nhập'
						label={
							<span>
								Tên đăng nhập <span style={{color: 'var(--error)'}}>*</span>
							</span>
						}
						type='text'
					/>
					<Input
						name='password'
						placeholder='Nhập mật khẩu'
						label={
							<span>
								Nhập mật khẩu <span style={{color: 'var(--error)'}}>*</span>
							</span>
						}
						type='password'
					/>

					<div className={styles.select}>
						<Select
							isSearch
							name='roleUuid'
							value={form.roleUuid}
							placeholder='Lựa chọn'
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									roleUuid: e.target.value,
								}))
							}
							label={
								<span>
									Nhóm quyền<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listRole?.data?.map((v: any) => (
								<Option key={v?.uuid} title={v?.name} value={v?.uuid} />
							))}
						</Select>
					</div>
					<div className={styles.group_button}>
						<div className={styles.btn}>
							<div>
								<Button p_12_20 white_outline rounded_8 onClick={onClose} maxContent>
									Hủy bỏ
								</Button>
							</div>

							<FormContext.Consumer>
								{({onSubmit}) => (
									<div className={styles.btn}>
										<Button
											icon={<Image alt='icon add' src={icons.folder_open} width={20} height={20} />}
											p_12_20
											primary
											rounded_8
											maxContent
											onClick={handleSubmit}
										>
											Lưu lại
										</Button>
									</div>
								)}
							</FormContext.Consumer>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
}

export default FormCreateAccount;
