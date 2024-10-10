import React, {useState} from 'react';

import {PropsMainUpdateTask} from './interfaces';
import styles from './MainUpdateTask.module.scss';
import {useRouter} from 'next/router';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Form, {Input} from '~/components/common/Form';
import clsx from 'clsx';

function MainUpdateTask({}: PropsMainUpdateTask) {
	const router = useRouter();

	const [form, setForm] = useState<{name: string}>({
		name: '',
	});

	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.Task,
						title: 'Danh sách quy trình',
					},
					{
						path: '',
						title: 'Chỉnh sửa quy trình',
					},
				]}
				action={
					<div className={styles.group_btn}>
						<Button
							p_14_24
							rounded_8
							light-red
							onClick={(e) => {
								e.preventDefault();
								window.history.back();
							}}
						>
							Hủy bỏ
						</Button>
						<Button p_14_24 rounded_8 primaryLinear>
							Lưu lại
						</Button>
					</div>
				}
			/>
			<div className={styles.main}>
				<Form form={form} setForm={setForm}>
					<div className={styles.basic_info}>
						<div className={styles.head}>
							<h4>Thông tin quy trình</h4>
						</div>
						<div className={styles.form}>
							<Input
								label={
									<span>
										Tên quy trình <span style={{color: 'red'}}>*</span>
									</span>
								}
								type='text'
								placeholder='Nhập tên quy trình'
								name='name'
								value={form?.name}
								isRequired={true}
								blur={true}
							/>
						</div>
					</div>

					<div className={clsx(styles.basic_info, styles.mt)}>
						<div className={styles.head}>
							<h4>Công việc của quy trình</h4>
						</div>
						<div className={styles.form}></div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default MainUpdateTask;
