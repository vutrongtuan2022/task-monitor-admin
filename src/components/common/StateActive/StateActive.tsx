import React from 'react';

import {PropsStateActive} from './interfaces';
import styles from './StateActive.module.scss';

function StateActive({stateActive, listState}: PropsStateActive) {
	return (
		<div
			style={{
				color: listState.find((v) => v.state == stateActive)?.textColor,
				background: listState.find((v) => v.state == stateActive)?.backgroundColor,
			}}
			className={styles.container}
		>
			{listState.find((v) => v.state == stateActive)?.text || '---'}
		</div>
	);
}

export default StateActive;
