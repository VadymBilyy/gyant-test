import { makeStyles } from '@material-ui/core';
import { palette } from '../../config/palette';

export const useButtonStyles = makeStyles({
	root: {
		width: '100%',
		background: palette.processButtonBackground,
		color: palette.defaultColor,

		'&:hover': {
			background: palette.processButtonHoveredBackground,
		},
	},
});
