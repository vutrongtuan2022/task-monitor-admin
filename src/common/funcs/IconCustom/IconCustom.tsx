import styles from './IconCustom.module.scss';
import {FaCheckCircle} from 'react-icons/fa';
import clsx from 'clsx';
import {MdOutlineVerified} from 'react-icons/md';

function IconCustom(type: string) {
	console.log('msg from custom icon', type);

	return (
		<div
			className={clsx(
				{[styles.success]: type == 'success', [styles.delete]: type == 'delete', [styles.edit]: type == 'edit'},
				styles.icon
			)}
		>
			{type == 'success' && (
				<div>
					<FaCheckCircle size='20' color='#fff' />
				</div>
			)}
			{type == 'edit' && (
				<div>
					<FaCheckCircle size='20' color='#fff' />
				</div>
			)}
			{type == 'delete' && (
				<div>
					<MdOutlineVerified size='20' color='#fff' />
				</div>
			)}
		</div>
	);
}

export default IconCustom;
