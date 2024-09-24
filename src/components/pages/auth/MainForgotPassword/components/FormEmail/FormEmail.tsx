import React, {useContext} from 'react';

import {PropsFormEmail} from './interfaces';
import styles from './FormEmail.module.scss';
import {ContextForgotPassword, IContextForgotPassword} from '../../context';
import Form, {FormContext, Input} from '~/components/common/Form';
import Button from '~/components/common/Button';
import Link from 'next/link';
import {PATH} from '~/constants/config';
import {TYPE_FORGOT_PASWORD} from '../../MainForgotPassword';
import {useRouter} from 'next/router';
import {useMutation} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import accountServices from '~/services/accountServices';
import Loading from '~/components/common/Loading';
import Popup from '~/components/common/Popup';
import FormOTP from '../FormOTP';

function FormEmail({}: PropsFormEmail) {
	const router = useRouter();
	const {open, ...rest} = router.query;
	const context = useContext<IContextForgotPassword>(ContextForgotPassword);

	const funcSendOTP = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'OTP đã được gửi về email của bạn!',
				http: accountServices.sendOTP({
					email: context?.form?.email!,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				router.replace(
					{
						query: {...router.query, open: 'otp'},
					},
					undefined,
					{scroll: false}
				);
			}
		},
	});
	console.log(funcSendOTP);

	const handleSendEmail = () => {
		// return funcSendOTP mutate()
		return context.setType(TYPE_FORGOT_PASWORD.OTP);
	};

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>QUÊN MẬT KHẨU</h4>
			<p className={styles.des}>Nhập địa chỉ email liên kết với tài khoản của bạn để lấy lại mật khẩu!</p>
			<div className={styles.form}>
				<Loading loading={funcSendOTP.isLoading} />
				<Form form={context.form} setForm={context.setForm} onSubmit={handleSendEmail}>
					<Input
						type='text'
						name='email'
						value={context?.form?.email}
						placeholder='Nhập email'
						onClean
						isRequired
						isEmail
						label={
							<span>
								Email <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>

					<div className={styles.btn}>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button primaryLinear bold rounded_8 disable={!isDone}>
									Lấy lại mật khẩu
								</Button>
							)}
						</FormContext.Consumer>
					</div>

					<p className={styles.rememberLogin}>
						Bạn đã nhớ tài khoản?
						<Link href={PATH.Login} className={styles.text_login}>
							Đăng nhập ngay.
						</Link>
					</p>
				</Form>
			</div>
			<Popup
				open={open == 'otp'}
				onClose={() =>
					router.replace(
						{
							query: rest,
						},
						undefined,
						{scroll: false}
					)
				}
			>
				<FormOTP />
			</Popup>
		</div>
	);
}

export default FormEmail;
