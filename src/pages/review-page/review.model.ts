import { Case, ConditionID } from '../../models/condition.model';

export interface CaseJSON {
	conditions: ConditionID[];
	description: string;
	isResolved: boolean;
	_id: string;
}

export const mapJSONCasesToCases = (cases: CaseJSON[]): Case[] =>
	cases.map(({ description, _id }) => ({
		description,
		caseId: _id,
	}));
