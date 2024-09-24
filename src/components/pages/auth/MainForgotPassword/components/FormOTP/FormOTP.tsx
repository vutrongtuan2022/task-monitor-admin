import React, {useContext, useEffect, useState} from 'react';

import {PropsFormOTP} from './interfaces';
import styles from './FormOTP.module.scss';
import InputSingle from '~/components/common/InputSingle';
import {ContextForgotPassword, IContextForgotPassword} from '../../context';
import fancyTimeFormat from '~/common/funcs/fancyTimeFormat';
import Button from '~/components/common/Button';
import {TYPE_FORGOT_PASWORD} from '../../MainForgotPassword';
import {IoClose} from 'react-icons/io5';

function FormOTP({}: PropsFormOTP) {
	const TIME_OTP = 60;

	const context = useContext<IContextForgotPassword>(ContextForgotPassword);

	const [countDown, setCoutDown] = useState<number>(TIME_OTP);

	useEffect(() => {
		if (countDown > 0) {
			const time = setTimeout(() => {
				setCoutDown(countDown - 1);
			}, 1000);
			return () => clearInterval(time);
		}
	}, [countDown]);

	const handleSubmit = () => {
		context.setType(TYPE_FORGOT_PASWORD.PASSWORD);
	};

	const handleClose = () => {
		context.setType(TYPE_FORGOT_PASWORD.EMAIL);
	};

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Xác thực mã OTP</h4>
			<p className={styles.des}>Một mã xác thực đã được gửi cho bạn qua địa chỉ email: Thaihu...68@gmail.com</p>
			<div className={styles.form}>
				<p className={styles.text_otp}>Nhập mã OTP</p>
				<div className={styles.box_code}>
					<InputSingle onSetValue={context.setForm} name='otp' lenght={6} />
				</div>
				<p className={styles.countDown}>
					Bạn chưa nhận được mã.
					{countDown > 0 ? (
						<span className={styles.textGreen}>Gửi lại OTP ({fancyTimeFormat(countDown)})</span>
					) : (
						<span className={styles.textGreen}>Gửi lại OTP</span>
					)}
				</p>
				<div className={styles.btn}>
					<Button primaryLinear bold rounded_8 disable={context?.form?.otp?.length! < 6} onClick={handleSubmit}>
						Xác thực Email
					</Button>
				</div>
			</div>

			<div className={styles.close} onClick={handleClose}>
				<IoClose size={24} />
			</div>
		</div>
	);
}

export default FormOTP;
