import React from 'react';

import {PropsCreateProject} from './interfaces';
import styles from './CreateProject.module.scss';

function CreateProject({}: PropsCreateProject) {
	return (
		<div className={styles.container}>
			<div className={styles.top_half}></div>

			<div className={styles.bottom}></div>
		</div>
	);
}

export default CreateProject;
