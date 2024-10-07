import React from 'react';

import {PropsUpdateInfoCapital} from './interfaces';
import styles from './UpdateInfoCapital.module.scss';
import {PATH} from '~/constants/config';
import LayoutPages from '~/components/layouts/LayoutPages';
import {useRouter} from 'next/router';
import Button from '~/components/common/Button';
import Breadcrumb from '~/components/common/Breadcrumb';

function UpdateInfoCapital({}: PropsUpdateInfoCapital) {
	const router = useRouter();

	const {_uuid} = router.query;

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
						title: 'Chỉnh sửa dự án',
					},
				]}
			/>
			<LayoutPages
				listPages={[
					{
						title: 'Thông tin chung',
						path: `${PATH.UpdateInfoProject}?_uuid=${_uuid}`,
					},
					{
						title: 'Thông tin kế hoạch vốn',
						path: `${PATH.UpdateInfoCapital}?_uuid=${_uuid}`,
					},
					{
						title: 'Thông tin nhà thầu',
						path: `${PATH.UpdateInfoContractor}?_uuid=${_uuid}`,
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
						<Button p_14_24 rounded_8 blueLinear>
							Lưu lại
						</Button>
					</div>
				}
			>
				<div className={styles.main}></div>
			</LayoutPages>
		</div>
	);
}

export default UpdateInfoCapital;
