import React, {useContext, useState} from 'react';

import {PropsFormPassword} from './interfaces';
import styles from './FormPassword.module.scss';
import {ContextForgotPassword, IContextForgotPassword} from '../../context';
import Form, {FormContext, Input} from '~/components/common/Form';
import Button from '~/components/common/Button';
import Popup from '~/components/common/Popup';
import FormSusses from '../FormSusses';

function FormPassword({}: PropsFormPassword) {
	const context = useContext<IContextForgotPassword>(ContextForgotPassword);

	const [openSusses, setOpenSusses] = useState<boolean>(false);

	const handleSubmit = () => {
		setOpenSusses(true);
	};

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>THIẾT LẬP MẬT KHẨU</h4>
			<p className={styles.des}>Mật khẩu mới bao gồm tối thiểu 6 ký tự gồm chữ hoa, chữ thường và số.</p>
			<div className={styles.form}>
				<Form form={context.form} setForm={context.setForm} onSubmit={handleSubmit}>
					<Input
						type='password'
						name='password'
						value={context?.form?.password}
						placeholder='Nhập mật khẩu mới'
						onClean
						isRequired
						label={
							<span>
								Mật khẩu mới <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>

					<Input
						type='password'
						name='rePassword'
						value={context?.form?.rePassword}
						valueConfirm={context?.form?.password}
						placeholder='Nhập lại mật khẩu'
						onClean
						isRequired
						label={
							<span>
								Xác nhận mật khẩu mới <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>

					<div className={styles.btn}>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button primaryLinear bold rounded_8 disable={!isDone}>
									Lưu mật khẩu
								</Button>
							)}
						</FormContext.Consumer>
					</div>
				</Form>
			</div>

			<Popup open={openSusses} onClose={() => setOpenSusses(false)}>
				<FormSusses />
			</Popup>
		</div>
	);
}

export default FormPassword;
