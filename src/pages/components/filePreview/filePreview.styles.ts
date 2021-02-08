import { makeStyles } from '@material-ui/styles';
import { palette } from '../../../config/palette';

export const useFilePreviewStyles = makeStyles({
	title: {
		color: palette.titleColor,
	},
});

export const usePaperStyles = makeStyles({
	root: {
		maxHeight: 650,
		padding: 20,
		overflow: 'scroll',
		lineHeight: '24px',
		height: '100%',
	},
});
