import React, {useState} from 'react';

import {PropsProcedureTree} from './interfaces';
import styles from './ProcedureTree.module.scss';
import {FaMinusCircle} from 'react-icons/fa';
import clsx from 'clsx';
import {IoMdAddCircle} from 'react-icons/io';

function ProcedureTree({}: PropsProcedureTree) {
	const [open, setOpen] = useState<boolean>(false);
	console.log('open', open);

	return (
		<div>
			{open ? (
				<div className={styles.add} onClick={() => setOpen(false)}>
					<FaMinusCircle size={18} color='#F95B5B' />
				</div>
			) : (
				<div
					className={clsx(styles.add)}
					onClick={() => {
						setOpen(true);
					}}
				>
					<IoMdAddCircle size={20} color='#2D74FF' />
				</div>
			)}
		</div>
	);
}

export default ProcedureTree;
