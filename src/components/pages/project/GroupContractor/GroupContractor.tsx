import React, {useState} from 'react';

import {PropsGroupContractor} from './interfaces';
import styles from './GroupContractor.module.scss';
import Form, {Input} from '~/components/common/Form';
import Select, {Option} from '~/components/common/Select';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import contractorServices from '~/services/contractorServices';

function GroupContractor({data, listContractor, setListContractor}: PropsGroupContractor) {
	const [form, setForm] = useState<{nameGroupContractor: string}>({
		nameGroupContractor: data?.nameGroupContractor,
	});

	const {data: dropdownContractor} = useQuery([`${QUERY_KEY.dropdown_contractor}_${data?.uuidGroupContractor}`], {
		queryFn: () =>
			httpRequest({
				http: contractorServices.categoryContractor({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					type: data?.uuidGroupContractor,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const handleChangeValue = (contractor: {uuid: string; code: string; name: string}) => {
		const updatedContractors = listContractor.map((group) => {
			if (group.uuidGroupContractor === data.uuidGroupContractor) {
				return {
					...group,
					uuidContractor: contractor.uuid,
					codeContractor: contractor.code,
					nameContractor: contractor.name,
				};
			}
			return group;
		});

		setListContractor(updatedContractors);
	};

	return (
		<div className={styles.main}>
			<Form form={form} setForm={setForm}>
				<div className={styles.col_2}>
					<Input
						type='text'
						placeholder='Mã tài khoản'
						name='nameGroupContractor'
						value={form?.nameGroupContractor}
						readOnly={true}
					/>
					<Select isSearch={true} name='uuidContractor' value={data?.uuidContractor} placeholder='Chọn'>
						{dropdownContractor?.map((v: any) => (
							<Option
								key={v.uuid}
								value={v.uuid}
								title={v?.name}
								onClick={() =>
									handleChangeValue({
										uuid: v?.uuid,
										code: v?.code,
										name: v?.name,
									})
								}
							/>
						))}
					</Select>
				</div>
			</Form>
		</div>
	);
}

export default GroupContractor;
