import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import DetailPlanNextMonth from '~/components/pages/plan-next-month/DetailPlanNextMonth';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chi tiết kế hoạch tháng tới</title>
				<meta name='description' content='Chi tiết kế hoạch tháng tới' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<DetailPlanNextMonth />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Chi tiết kế hoạch tháng tới'>{Page}</BaseLayout>;
};
