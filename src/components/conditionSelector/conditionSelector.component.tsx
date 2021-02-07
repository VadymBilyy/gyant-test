import React, { FC, memo } from 'react';
import { useFilePreviewStyles, usePaperStyles } from './conditionSelector.styles';
import { List, ListItem, Paper } from '@material-ui/core';
import { Effect } from '../../utils/function.utils';
import { SelectOption } from '../../models/select.model';
import { ConditionID } from '../../models/condition.model';
import clsx from 'clsx';

interface ConditionSelectorProps {
	conditions: SelectOption<ConditionID>[];
	onSelectCondition: Effect<ConditionID>;
	selectedConditions: ConditionID[];
}

export const ConditionSelector: FC<ConditionSelectorProps> = memo(
	({ conditions, onSelectCondition, selectedConditions }) => {
		const classes = useFilePreviewStyles();
		const classesPaper = usePaperStyles();

		const isItemSelected = (id: ConditionID) => selectedConditions.includes(id);

		const renderConditions = (conditions: SelectOption<ConditionID>[]) =>
			conditions.map(({ value, label }) => {
				const onItemClick = () => {
					console.log('here');
					onSelectCondition(value);
				};
				const isSelected = isItemSelected(value);

				const listItemClassName = clsx(isSelected && classes.selectedListItem);
				return (
					<ListItem
						className={listItemClassName}
						key={value}
						button
						selected={isSelected}
						onClick={onItemClick}>
						{label}
					</ListItem>
				);
			});

		return (
			<div className={classes.container}>
				<h3 className={classes.title}>Select Condition</h3>
				<Paper classes={classesPaper} elevation={3}>
					<List>{renderConditions(conditions)}</List>
				</Paper>
			</div>
		);
	},
);
