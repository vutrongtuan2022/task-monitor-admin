import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';

export default function Home() {
	return (
		<Fragment>
			<Head>
				<title>Thông tin cá nhân</title>
				<meta name='description' content='Thông tin cá nhân' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>Thông tin cá nhân</div>
		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout isAction={false} title='Thông tin cá nhân'>
			{Page}
		</BaseLayout>
	);
};
