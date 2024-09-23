import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';

export default function Home() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý nhà thầu</title>
				<meta name='description' content='Quản lý nhà thầu' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>Quản lý nhà thầu</div>
		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout isAction={false} title='Quản lý nhà thầu'>
			{Page}
		</BaseLayout>
	);
};
