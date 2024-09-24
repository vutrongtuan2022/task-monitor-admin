import React, {useState} from 'react';

import {PropsFormLogin} from './interfaces';
import styles from './FormLogin.module.scss';
import ImageFill from '~/components/common/ImageFill';
import icons from '~/constants/images/icons';
import Form, {FormContext, Input} from '~/components/common/Form';
import {useSelector} from 'react-redux';
import {RootState, store} from '~/redux/store';
import {setRememberPassword} from '~/redux/reducer/site';
import Link from 'next/link';
import {PATH} from '~/constants/config';
import SwitchButton from '~/components/common/SwitchButton';
import Button from '~/components/common/Button';
import {useRouter} from 'next/router';

function FormLogin({}: PropsFormLogin) {
	const router = useRouter();

	const {isRememberPassword} = useSelector((state: RootState) => state.site);

	const [form, setForm] = useState<{
		username: string;
		password: string;
	}>({
		username: '',
		password: '',
	});

	const handleLogin = () => {
		router.replace(PATH.Home, undefined, {scroll: false});
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleLogin}>
			<div className={styles.container}>
				<div className={styles.box_logo}>
					<ImageFill src={icons.logoSmall} className={styles.logo} alt='Logo viettinbank' />
				</div>
				<h4 className={styles.title}>ĐĂNG NHẬP TÀI KHOẢN</h4>
				<p className={styles.des}>Chào mừng bạn đến với hệ thống VietinBank. Đăng nhập để bắt đầu sử dụng</p>
				<div className={styles.form}>
					<Input type='text' placeholder='Tên tài khoản' name='username' value={form?.username} onClean isRequired />
					<Input type='password' placeholder='Mật khẩu' name='password' value={form?.password} onClean isRequired />

					<div className={styles.list_action}>
						<div className={styles.rememberLogin}>
							<SwitchButton
								name='isRememberPassword'
								value={isRememberPassword}
								onChange={() => store.dispatch(setRememberPassword(!isRememberPassword))}
							/>
							<p className={styles.desRemember}>Ghi nhớ đăng nhập</p>
						</div>
						<Link href={PATH.ForgotPassword} className={styles.text_forgot}>
							Quên mật khẩu?
						</Link>
					</div>

					<div className={styles.btn}>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button primaryLinear bold rounded_8 disable={!isDone}>
									Đăng nhập
								</Button>
							)}
						</FormContext.Consumer>
					</div>
				</div>
			</div>
		</Form>
	);
}

export default FormLogin;
