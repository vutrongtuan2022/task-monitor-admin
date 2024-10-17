import React from 'react';

import {PropsMainDetailReportOverview} from './interfaces';
import styles from './MainDetailReportOverview.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';

function MainDetailReportOverview({}: PropsMainDetailReportOverview) {
	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.ReportOverview,
						title: 'Báo cáo tổng hợp',
					},
					{
						path: '',
						title: 'Chi tiết báo cáo',
					},
				]}
			/>
		</div>
	);
}

export default MainDetailReportOverview;
