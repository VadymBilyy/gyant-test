import { makeStyles } from '@material-ui/core';
import { palette, mobilePalette } from '../../config/palette';

export const useSignInStyles = makeStyles({
	container: {
		display: 'flex',
		paddingTop: 40,
		justifyContent: 'center',
		'@media (max-width: 410px)': {
			flex: 1,
			alignItems: 'center',
			background: mobilePalette.loginContainerBackground,
		},
	},
	form: {
		padding: 20,
		display: 'flex',
		flexDirection: 'column',
	},
	error: {
		background: palette.errorBackgroundColor,
		padding: '10px',
		textAlign: 'center',
		color: palette.defaultColor,
		marginBottom: 10,
	},
	signInButtton: {
		'@media (max-width: 410px)': {
			height: 50,
		},
	},
});

export const useSignInInputStyles = makeStyles({
	root: {
		width: 300,
		marginBottom: 20,
	},
	input: {
		padding: '10px',
		'@media (max-width: 410px)': {
			padding: '0 10px',
			height: 50,
			fontSize: 25,
		},
	},
});
