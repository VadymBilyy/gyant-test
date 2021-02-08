import { array, record } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { SelectOption } from './select.model';

export type ConditionID =
	| 'ICD_10'
	| 'A09'
	| 'A64'
	| 'B300'
	| 'B302'
	| 'B308'
	| 'B309'
	| 'B373'
	| 'B9789'
	| 'E860'
	| 'F340'
	| 'F341'
	| 'F39'
	| 'F411'
	| 'F418'
	| 'F419'
	| 'F4321'
	| 'G43001'
	| 'G43009'
	| 'G43019'
	| 'G43501'
	| 'G43509'
	| 'G43519'
	| 'G43701'
	| 'G43709'
	| 'G43711'
	| 'G43719'
	| 'G43809'
	| 'G43811'
	| 'G43819'
	| 'G43829'
	| 'G43909'
	| 'G43911'
	| 'G43919'
	| 'G44209'
	| 'G44219'
	| 'H10029'
	| 'H60339'
	| 'H60399'
	| 'H66009'
	| 'H66019'
	| 'H663X9'
	| 'H10509'
	| 'H10819'
	| 'H65119'
	| 'H65199'
	| 'G4700'
	| 'G4701'
	| 'G5600'
	| 'H1033'
	| 'H1044'
	| 'H1045'
	| 'H1089'
	| 'H6020'
	| 'H6500'
	| 'H6520'
	| 'H6590'
	| 'H6640'
	| 'H6690'
	| 'L240'
	| 'L242'
	| 'L250'
	| 'L251'
	| 'L253'
	| 'L255'
	| 'L259'
	| 'N730'
	| 'N733'
	| 'N739'
	| 'N912'
	| 'N920'
	| 'N921'
	| 'N924'
	| 'N930'
	| 'N946'
	| 'R079'
	| 'R109'
	| 'S53449A'
	| 'S63519A'
	| 'S63599A'
	| 'S638X9A'
	| 'S93419A'
	| 'S93429A'
	| 'S93439A';

export type ConditionsJSON = Record<ConditionID, string>;
export interface ConditionsResponseJSON {
	_id: string;
	conditions: ConditionsJSON;
}
export interface Case {
	description: string;
	caseId: string;
}

export interface ConditionReviewComplete {
	caseId: string;
	conditions: ConditionID[];
}

export const conditionsJSONtoSelectOptions = (conditions: ConditionsJSON): SelectOption<ConditionID>[] =>
	pipe(
		conditions,
		record.toArray,
		array.map(([value, label]) => ({ label, value })),
	);
