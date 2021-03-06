import React, { Fragment, memo, useCallback } from 'react';
import WatchLater from '@material-ui/icons/WatchLater';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Assignment from '@material-ui/icons/Assignment';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { useEmptyStateStyles } from './emptyState.styles';
import { Lazy } from 'fp-ts/lib/function';
import { Button } from '../button/button';
import clsx from 'clsx';

type State = 'LOADING' | 'ALL_PROCESSED' | 'NO_CASES' | 'ERROR';

interface EmptyStateProps {
	state: State;
	onRefresh?: Lazy<void>;
}

export const EmptyState = memo<EmptyStateProps>(({ state, onRefresh }) => {
	const classes = useEmptyStateStyles();
	const renderRefreshButton = useCallback(
		(onRefresh) => onRefresh && <Button onClick={onRefresh}>Refresh</Button>,
		[],
	);

	const renderEmptyStateContent = (state: State) => {
		switch (state) {
			case 'LOADING':
				return <WatchLater fontSize={'large'} />;
			case 'ALL_PROCESSED':
				return (
					<div>
						<h3 className={classes.emptyStateWrapper}>
							<ThumbUp fontSize={'large'} /> <span className={classes.emptyStateTitle}>You are Done</span>
						</h3>
						{renderRefreshButton(onRefresh)}
					</div>
				);
			case 'NO_CASES':
				return (
					<Fragment>
						<h3 className={clsx(classes.emptyStateWrapper, classes.withCallback)}>
							<Assignment fontSize={'large'} />
							<span className={classes.emptyStateTitle}>No unprocessed cases</span>
							{renderRefreshButton(onRefresh)}
						</h3>
					</Fragment>
				);
			case 'ERROR':
				return (
					<h3 className={classes.emptyStateWrapper}>
						<ErrorOutline fontSize={'large'} />
						<span className={classes.emptyStateTitle}>Network Error</span>
					</h3>
				);
		}
	};

	return <div className={classes.noContentContainer}>{renderEmptyStateContent(state)}</div>;
});
