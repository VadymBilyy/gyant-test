import { option } from 'fp-ts';
import { constant } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import React, { Fragment, memo, useState } from 'react';
import { ConditionSelector } from '../../components/conditionSelector/conditionSelector.component';
import { FilePreview } from '../../components/filePreview/filePreview.component';
import { Button } from '../../ui-kit/button/button';
import { ConditionID, ConditionReviewComplete, Case } from '../../models/condition.model';
import { SelectOption } from '../../models/select.model';
import { Effect } from '../../utils/function.utils';
import { useReviewStyles } from './review-page.styles';

interface ReviewPageProps {
	onCaseProcess: Effect<ConditionReviewComplete>;
	isProcessing: boolean;
	availableConditions: SelectOption<ConditionID>[];
	currentCase: option.Option<Case>;
}

export const ReviewPage = memo<ReviewPageProps>(({ onCaseProcess, availableConditions, currentCase, isProcessing }) => {
	const classes = useReviewStyles();
	const [selectedConditions, onConditionSelect] = useState<ConditionID[]>([]);

	const selectConditionHandler = (id: ConditionID) => {
		const conditions = selectedConditions.slice();
		const index = conditions.indexOf(id);

		index === -1 ? conditions.push(id) : conditions.splice(index, 1);

		onConditionSelect(conditions);
	};

	const handleProcessCase = () => {
		const caseId = pipe(
			currentCase,
			option.map((currentCase) => currentCase.id),
			option.getOrElse(constant(0)),
		);
		onCaseProcess({ caseId, conditions: selectedConditions });
		onConditionSelect([]);
	};

	const caseDesciption = pipe(
		currentCase,
		option.map((currentCase) => currentCase.text),
		option.getOrElse(constant('')),
	);

	const renderCase = (currentCase: Case) => (
		<Fragment>
			<div className={classes.column}>
				<FilePreview text={caseDesciption} />
			</div>
			<div className={classes.column}>
				<div className={classes.conditions}>
					<ConditionSelector
						selectedConditions={selectedConditions}
						conditions={availableConditions}
						onSelectCondition={selectConditionHandler}
					/>
				</div>
				<Button onClick={handleProcessCase} disabled={isProcessing}>
					Next Case
				</Button>
			</div>
		</Fragment>
	);

	const renderNoUnreviewedCases = constant(<h3>You are Done</h3>);

	return (
		<div className={classes.container}>{pipe(currentCase, option.fold(renderNoUnreviewedCases, renderCase))}</div>
	);
});
