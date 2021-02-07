import { makeStyles } from '@material-ui/core';

export const useReviewStyles = makeStyles({
	container: {
		display: 'grid',
		gridTemplateColumns: '55% 45%',
	},
	column: {
		padding: '0 20px',
	},
	conditions: {
		paddingBottom: 40,
	},
});
