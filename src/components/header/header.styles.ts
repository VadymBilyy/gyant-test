import { makeStyles } from '@material-ui/styles';
import { palette } from '../../config/palette';

export const useHeaderStyles = makeStyles({
	container: {
		height: 50,
		background: palette.headerBackgroundColor,
		borderBottom: `1px solid ${palette.headerBorderBottom}`,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0 30px',
		color: 'white',

		'& .MuiButtonBase-root': {
			padding: '0 0 0 10px',
			color: 'white',

			'&:hover': {
				background: 'none',
			},
		},
	},
	userSection: {},
	name: {
		borderRight: `1px solid ${palette.defaultColor}`,
		paddingRight: 10,
		fontSize: 14,
	},
	logout: {
		paddingLeft: 10,
	},
});

export const useIconStyles = makeStyles({
	colorPrimary: {
		color: 'white',
	},
});

export const useButtonStyles = makeStyles({
	root: {
		color: 'white',
	},
});
