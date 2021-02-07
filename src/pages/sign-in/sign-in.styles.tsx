import { makeStyles } from '@material-ui/core';

export const useSignInStyles = makeStyles({
	container: {
		display: 'flex',
		paddingTop: 40,
		justifyContent: 'center',
	},
	form: {
		padding: 20,
		display: 'flex',
		flexDirection: 'column',
	},
});

export const useSignInInputStyles = makeStyles({
	root: {
		width: 300,
		marginBottom: 20,
	},
});
