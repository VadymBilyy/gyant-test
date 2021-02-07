import { makeStyles } from '@material-ui/styles';
import { palette } from '../../config/palette';

export const useFilePreviewStyles = makeStyles({
	container: {
		minWidth: 400,
	},
	title: {
		color: palette.titleColor,
	},
	listItem: {
		paddingLeft: 10,
	},
	selectedListItem: {
		color: palette.selectedConditionText,

		'&.MuiListItem-root.Mui-selected': {
			backgroundColor: palette.selectedConditionBg,
		},
	},
});

export const usePaperStyles = makeStyles({
	root: {
		overflow: 'scroll',
		maxHeight: 500,
	},
});
