import Head from 'next/head';
import { Fragment, ReactElement, useState } from 'react';
import ButtonSelectMany from '~/components/common/ButtonSelectMany';
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

			<ButtonSelectMany
				dataChecked={listChecked}
				dataList={[
					{ uuid: '1', name: '11111111111111' },
					{ uuid: '2', name: '21111111111' },
					{ uuid: '3', name: '311111111' },
					{ uuid: '4', name: '4111111111' },
					{ uuid: '5', name: '511111111111111' },

				]}
				description='chọn'
				placeholder='chọn'
				setDataChecked={setListChecked}
				title='chọn'
				label={<span>chọn</span>} />

		</Fragment>
	);
}

Home.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Trang chủ'>{Page}</BaseLayout>;
};
