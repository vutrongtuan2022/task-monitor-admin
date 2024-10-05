interface IGroupContractor {
	idGroupContractor: number;
	uuidGroupContractor: string;
	codeGroupContractor: string;
	nameGroupContractor: string;
	uuidContractor: string;
	codeContractor: string;
	nameContractor: string;
}

export interface PropsGroupContractor {
	data: IGroupContractor;
	listContractor: IGroupContractor[];
	setListContractor: (any: any) => void;
}
