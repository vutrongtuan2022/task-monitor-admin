import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageUserWork from '~/components/pages/user-work/MainPageUserWork';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Công việc nhân viên</title>
				<meta name='description' content='Công việc nhân viên' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageUserWork />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Danh sách công việc của nhân viên '>{Page}</BaseLayout>;
};
