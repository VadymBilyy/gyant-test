import { array, option } from 'fp-ts';
import { constNull, constant, Lazy } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import React, { Fragment, memo, useEffect, useState } from 'react';

import { Case, ConditionID, ConditionReviewComplete } from '../../models/condition.model';
import { SelectOption } from '../../models/select.model';
import { Button } from '../../ui-kit/button/button';
import { EmptyState } from '../../ui-kit/emptyState/emptyState';
import { Effect } from '../../utils/function.utils';
import { ConditionSelector } from '../components/conditionSelector/conditionSelector.component';
import { FilePreview } from '../components/filePreview/filePreview.component';
import { useReviewStyles } from './review-page.styles';

interface ReviewPageProps {
	onProcessCase: Effect<ConditionReviewComplete>;
	onRefreshCases: Lazy<void>;
	isProcessing: boolean;
	isCasesListEmpty: boolean;
	isDataLoading: boolean;
	isDataError: boolean;
	availableConditions: SelectOption<ConditionID>[];
	currentCase: option.Option<Case>;
	processCaseError: option.Option<string>;
}

export const ReviewPage = memo<ReviewPageProps>(
	({
		onProcessCase,
		onRefreshCases,
		availableConditions,
		currentCase,
		isProcessing,
		isDataLoading,
		isDataError,
		isCasesListEmpty,
		processCaseError,
	}) => {
		const classes = useReviewStyles();

		const [selectedConditions, onConditionSelect] = useState<ConditionID[]>([]);
		const isConditionsNotSelected = array.isEmpty(selectedConditions);

		useEffect(() => {
			!isProcessing && onConditionSelect([]);
		}, [isProcessing]);

		const selectConditionHandler = (id: ConditionID) => {
			const conditions = selectedConditions.slice();
			const index = conditions.indexOf(id);

			index === -1 ? conditions.push(id) : conditions.splice(index, 1);

			onConditionSelect(conditions);
		};

		const handleProcessCase = () => {
			const caseId = pipe(
				currentCase,
				option.map((currentCase) => currentCase.caseId),
				option.getOrElse(constant('')),
			);
			onProcessCase({ caseId, conditions: selectedConditions });
		};

		const renderError = (error: option.Option<string>) =>
			pipe(
				error,
				option.fold(constNull, (error) => <span className={classes.error}>{error}</span>),
			);

		const renderCase = (currentCase: Case) => (
			<Fragment>
				<div className={classes.column}>
					<FilePreview text={currentCase.description} />
				</div>
				<div className={classes.column}>
					<div className={classes.conditions}>
						<ConditionSelector
							selectedConditions={selectedConditions}
							conditions={availableConditions}
							onSelectCondition={selectConditionHandler}
						/>
					</div>
					<Button onClick={handleProcessCase} disabled={isProcessing || isConditionsNotSelected}>
						Next Case
					</Button>
					{renderError(processCaseError)}
				</div>
			</Fragment>
		);

		const renderContent = () => {
			if (isDataError) {
				return <EmptyState state={'ERROR'} />;
			}
			return isDataLoading ? (
				<EmptyState state={'LOADING'} />
			) : isCasesListEmpty ? (
				<EmptyState onRefresh={onRefreshCases} state={'NO_CASES'} />
			) : (
				pipe(
					currentCase,
					option.fold(
						constant(<EmptyState onRefresh={onRefreshCases} state={'ALL_PROCESSED'} />),
						renderCase,
					),
				)
			);
		};

		return <div className={classes.container}>{renderContent()}</div>;
	},
);
