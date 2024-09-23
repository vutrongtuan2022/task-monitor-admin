import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';

export default function Home() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý quy trình</title>
				<meta name='description' content='Quản lý quy trình' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>Quản lý quy trình</div>
		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout isAction={true} title='Quản lý quy trình'>
			{Page}
		</BaseLayout>
	);
};
