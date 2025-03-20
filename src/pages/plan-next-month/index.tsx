import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPlanNextMonth from '~/components/pages/plan-next-month/MainPlanNextMonth';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Kế hoạch tháng tới</title>
				<meta name='description' content='Kế hoạch tháng tới' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPlanNextMonth />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Kế hoạch tháng tới'>{Page}</BaseLayout>;
};
