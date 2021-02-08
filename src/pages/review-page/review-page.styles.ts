import { makeStyles } from '@material-ui/core';
import { mobilePalette, palette } from '../../config/palette';

export const useReviewStyles = makeStyles({
	container: {
		height: '100%',
		display: 'grid',
		gridTemplateColumns: '55% 45%',
		position: 'relative',

		'@media (max-width: 410px)': {
			height: 'auto',
			display: 'flex',
			flexDirection: 'column',
			background: mobilePalette.reviewContainerBackground,
		},
	},
	column: {
		padding: '0 20px',
		'@media (max-width: 410px)': {
			'&:last-child': {
				paddingBottom: 20,
			},
		},
	},
	conditions: {
		paddingBottom: 40,
	},
	error: {
		background: palette.errorBackgroundColor,
		padding: '10px',
		textAlign: 'center',
		color: palette.defaultColor,
		marginBottom: 10,
	},
});
