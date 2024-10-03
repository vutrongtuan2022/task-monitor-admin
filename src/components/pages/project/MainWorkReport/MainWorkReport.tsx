import React from 'react';

import { PropsMainWorkReport } from './interfaces';
import styles from './MainWorkReport.module.scss';
import LayoutPages from '~/components/layouts/LayoutPages';
import { PATH } from '~/constants/config';
import { useRouter } from 'next/router';
import Button from '~/components/common/Button';
import Image from 'next/image';
import icons from '~/constants/images/icons';

function MainWorkReport({ }: PropsMainWorkReport) {
	const router = useRouter();

	const { _uuid } = router.query;

	return (
		<LayoutPages
			listPages={[
				{
					title: 'Thông tin chung',
					path: `${PATH.ProjectInfo}?_uuid=${_uuid}`,
				},
				{
					title: 'Báo cáo công việc',
					path: `${PATH.ProjectWorkReport}?_uuid=${_uuid}`,
				},
				{
					title: 'Tiến độ giải ngân',
					path: `${PATH.ProjectDisbursementProgress}?_uuid=${_uuid}`,
				},
				{
					title: 'Thông tin nhà thầu',
					path: `${PATH.ProjectContractor}?_uuid=${_uuid}`,
				},
			]}
			action={
				<div className={styles.group_btn}>

					<Button
						p_14_24
						rounded_8
						primary
						href={''}
						onClick={() => { }}
					// icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
					>
						Kết thúc dự án
					</Button>

					<Button
						p_14_24
						rounded_8
						light-red
						href={''}
						onClick={() => { }}
					// icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
					>
						Xóa
					</Button>

					<Button
						p_14_24
						rounded_8
						primaryLinear
						href={''}
						onClick={() => { }}
					// icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
					>
						Chỉnh sửa
					</Button>
				</div>
			}
		>
			<div className={styles.basic_info}></div>
		</LayoutPages>
	);
}

export default MainWorkReport;
