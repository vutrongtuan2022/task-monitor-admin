import {ContextBaseLayout} from '../../BaseLayout';
import {PropsHeader} from './interfaces';
import TippyHeadless from '@tippyjs/react/headless';

import {TContextBaseLayout} from '../../interfaces';
import styles from './Header.module.scss';
import ImageFill from '~/components/common/ImageFill';
import icons from '~/constants/images/icons';
import {useContext} from 'react';
import Image from 'next/image';

function Header({title}: PropsHeader) {
	const context = useContext<TContextBaseLayout>(ContextBaseLayout);

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.top}>
					<div className={styles.box_icon} onClick={() => context?.setShowFull!(!context?.showFull)}>
						<ImageFill src={icons.iconHum} alt='icon show hide' className={styles.icon} />
					</div>
					<h4 className={styles.title}>{title}</h4>
				</div>
				<div className={styles.main_action}>
					<div className={styles.btn}>
						<Image src={icons.iconAdd} alt='icon add' width={20} height={20} />
						<p>Nhập file</p>
					</div>
					<div className={styles.btn}>
						<Image src={icons.iconDown} alt='icon down' width={20} height={20} />
						<p>Xuất file</p>
					</div>
				</div>
			</div>
			<div className={styles.right}></div>
		</div>
	);
}

export default Header;
