import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageUser from '~/components/pages/user/MainPageUser';

export default function Home() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý nhân viên</title>
				<meta name='description' content='Quản lý nhân viên' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<MainPageUser />
		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout isAction={false} title='Quản lý nhân viên'>
			{Page}
		</BaseLayout>
	);
};
