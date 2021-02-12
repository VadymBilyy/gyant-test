import { makeStyles } from '@material-ui/core';
import { palette } from '../../config/palette';

export const useEmptyStateStyles = makeStyles({
	noContentContainer: {
		position: 'absolute',
		color: palette.loaderIconColor,
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		opacity: 0.5,
		'& > svg': {
			width: 50,
			height: 50,
		},
	},
	emptyStateWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	emptyStateTitle: {
		marginLeft: 5,
	},
	withCallback: {
		flexDirection: 'column',
		'& > button': {
			marginTop: 20,
		},
	},
});
