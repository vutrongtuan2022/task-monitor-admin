import React, {useState} from 'react';

import {PropsCreateGroupContractor} from './interfaces';
import styles from './CreateGroupContractor.module.scss';
import {IoClose} from 'react-icons/io5';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import Form, {Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';

function CreateGroupContractor({}: PropsCreateGroupContractor) {
	const [form, setForm] = useState<{name: string; note: string}>({
		name: '',
		note: '',
	});

	return (
		<Form form={form} setForm={setForm}>
			<div className={styles.container}>
				<h4 className={styles.title}>Thêm mới nhóm nhà thầu</h4>
				<div className={styles.form}>
					<Input
						placeholder='Nhập tên nhóm nhà thầu'
						name='name'
						type='text'
						value={form.name}
						isRequired
						label={
							<span>
								Tên nhóm nhà thầu <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>
					<div className={styles.note}>
						<TextArea name='note' placeholder='Nhập mô tả' label='Mô tả' />
					</div>
				</div>
				<div className={styles.group_button}>
					<div>
						<Button p_12_20 grey rounded_6>
							Hủy bỏ
						</Button>
					</div>
					{/* <FormContext.Consumer>
						{({onSubmit}) => ( */}
					<div className={styles.btn}>
						<Button p_12_20 primary rounded_6 icon={<FolderOpen size={18} color='#fff' />}>
							Lưu lại
						</Button>
					</div>
					{/* )}
					</FormContext.Consumer> */}
				</div>
				<div className={styles.close}>
					<IoClose size={28} color='#8492A6' />
				</div>
			</div>
		</Form>
	);
}

export default CreateGroupContractor;
