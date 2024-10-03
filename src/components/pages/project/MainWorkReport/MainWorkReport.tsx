import React from 'react';

import {PropsMainWorkReport} from './interfaces';
import styles from './MainWorkReport.module.scss';
import LayoutPages from '~/components/layouts/LayoutPages';
import {PATH} from '~/constants/config';
import {useRouter} from 'next/router';

function MainWorkReport({}: PropsMainWorkReport) {
	const router = useRouter();

	const {_uuid} = router.query;

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
			action={<div>action</div>}
		>
			MainWorkReport
		</LayoutPages>
	);
}

export default MainWorkReport;
