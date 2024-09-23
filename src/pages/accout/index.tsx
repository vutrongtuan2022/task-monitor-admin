import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';

export default function Home() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý tài khoản</title>
				<meta name='description' content='Quản lý tài khoản' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>Quản lý tài khoản</div>
		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout isAction={false} title='Quản lý tài khoản'>
			{Page}
		</BaseLayout>
	);
};
