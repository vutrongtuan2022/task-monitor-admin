import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import ProcedureTree from '~/components/common/ProcedureTree';
import BaseLayout from '~/components/layouts/BaseLayout';

export default function Home() {
	return (
		<Fragment>
			<Head>
				<title>Trang chủ</title>
				<meta name='description' content='Trang chủ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div style={{backgroundColor: '#fff', height: '600px'}}>
				<ProcedureTree />
			</div>
		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Trang chủ'>{Page}</BaseLayout>;
};
