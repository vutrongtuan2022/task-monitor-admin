import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageReportWork from '~/components/pages/report-work/MainPageReportWork';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách báo cáo công việc</title>
				<meta name='description' content='Danh sách báo cáo công việc' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageReportWork />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Danh sách báo cáo công việc'>{Page}</BaseLayout>;
};
