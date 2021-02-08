import React, { memo } from 'react';
import WatchLater from '@material-ui/icons/WatchLater';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Assignment from '@material-ui/icons/Assignment';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { useEmptyStateStyles } from './emptyState.styles';

type State = 'LOADING' | 'ALL_PROCESSED' | 'NO_CASES' | 'ERROR';

interface EmptyStateProps {
	state: State;
}

export const EmptyState = memo<EmptyStateProps>(({ state }) => {
	const classes = useEmptyStateStyles();
	const renderEmptyStateContent = (state: State) => {
		switch (state) {
			case 'LOADING':
				return <WatchLater fontSize={'large'} />;
			case 'ALL_PROCESSED':
				return (
					<h3 className={classes.emptyStateWrapper}>
						<ThumbUp fontSize={'large'} /> <span className={classes.emptyStateTitle}>You are Done</span>
					</h3>
				);
			case 'NO_CASES':
				return (
					<h3 className={classes.emptyStateWrapper}>
						<Assignment fontSize={'large'} />
						<span className={classes.emptyStateTitle}>No unprocessed cases</span>
					</h3>
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
