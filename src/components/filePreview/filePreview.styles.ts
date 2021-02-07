import { makeStyles } from '@material-ui/styles';
import { palette } from '../../config/palette';

export const useFilePreviewStyles = makeStyles({
	container: {},
	title: {
		color: palette.titleColor,
	},
	root: {},
});

export const usePaperStyles = makeStyles({
	root: {
		padding: 20,
		overflow: 'scroll',
		lineHeight: '24px',
		height: '100%',
	},
});
