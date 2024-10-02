import Head from 'next/head';
import { Fragment, ReactElement, useState } from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';

export default function Home() {

	const [listChecked, setListChecked] = useState<any[]>([]);
	return (
		<Fragment>
			<Head>
				<title>Trang chủ</title>
				<meta name='description' content='Trang chủ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div>Trang chủ</div>
		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Trang chủ'>{Page}</BaseLayout>;
};
