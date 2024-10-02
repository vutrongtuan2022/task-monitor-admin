import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import CreateProject from '~/components/pages/project/CreateProject';
import MainPageProject from '~/components/pages/project/MainPageProject';

export default function Home() {
	return (
		<Fragment>
			<Head>
				<title>Thêm mới dự án</title>
				<meta name='description' content='Thêm mới dự án' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<CreateProject />
		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout isAction={false} title='Thêm mới dự án'>
			{Page}
		</BaseLayout>
	);
};
