import React, {Fragment, useState} from 'react';
import {PropsProcedureTree} from './interfaces';
import styles from './ProcedureTree.module.scss';
import {IoIosAddCircle, IoIosRemoveCircle} from 'react-icons/io';
import clsx from 'clsx';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import Button from '../Button';
import IconCustom from '../IconCustom';
import {Trash} from 'iconsax-react';

function ProcedureTree({}: PropsProcedureTree) {
	interface TreeNode {
		id: string;
		level: string;
		task: number;
		subtask: number;
		title: string;
		children: TreeNode[];
	}
	const [treeData, setTreeData] = useState<TreeNode[]>([{id: '1', level: 'A', task: 0, subtask: 0, title: 'Dự án 01', children: []}]);

	const [open, setOpen] = useState<string[]>([]);

	const handleInputChange = (id: string, field: keyof TreeNode, value: string | number) => {
		const updatedTree = [...treeData];
		const updateNode = (nodes: TreeNode[]) => {
			nodes.forEach((node) => {
				if (node.id === id) {
					(node as any)[field] = value; // Cập nhật giá trị của trường
				} else {
					updateNode(node.children);
				}
			});
		};
		updateNode(updatedTree);
		setTreeData(updatedTree);
	};

	const addNewTask = (id: string) => {
		const updatedTree = [...treeData];
		const updateNode = (nodes: TreeNode[]) => {
			nodes.forEach((node) => {
				if (node.id === id) {
					const newLevelChar = String.fromCharCode(node.level.charCodeAt(0) + 1);
					node.children.push({
						id: `${node.id}.${node.children.length + 1}`,
						level: newLevelChar,
						title: '',
						task: 0,
						subtask: 0,
						children: [],
					});
				} else {
					updateNode(node.children);
				}
			});
		};
		updateNode(updatedTree);
		setTreeData(updatedTree);
	};

	const removeLevel = (id: string) => {
		const updatedTree = treeData.filter((node) => node.id !== id);
		setTreeData(updatedTree);
	};

	const toggleNode = (id: string) => {
		setOpen((prev) => (prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]));
	};

	console.log(treeData);

	const renderTree = (nodes: TreeNode[]) => {
		return (
			<ul>
				{nodes.map((node) => (
					<li key={node.id}>
						<div className={styles.container}>
							<div>
								<Button p_4_4 onClick={() => toggleNode(node.id)} inhenrit>
									{open.includes(node.id) ? (
										<IoIosRemoveCircle color='#F95B5B' size={20} />
									) : (
										<IoIosAddCircle color='#2D74FF' size={20} />
									)}
								</Button>
							</div>

							<div className={styles.group_input}>
								<div className={styles.rank}>{node.id}</div>
								<input
									type='text'
									className={styles.input}
									value={node.title}
									onChange={(e) => handleInputChange(node.id, 'title', e.target.value)}
								/>
							</div>

							<div className={styles.group_task}>
								<p className={styles.task}>Task: {node.task}</p>
								<p className={styles.task}>SubTask: {node.subtask}</p>
							</div>

							<div>
								<Button
									p_14_23
									rounded_8
									light-blue
									onClick={() => addNewTask(node.id)}
									icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
								>
									Thêm mới
								</Button>
							</div>

							<div>
								<Button p_12_12 rounded_8 error onClick={() => removeLevel(node.id)}>
									<Trash fontSize={20} fontWeight={600} />
								</Button>
							</div>
						</div>
						{open.includes(node.id) && node.children.length > 0 && renderTree(node.children)}
					</li>
				))}
			</ul>
		);
	};

	return <div className={styles.container}>{renderTree(treeData)}</div>;
}

export default ProcedureTree;
