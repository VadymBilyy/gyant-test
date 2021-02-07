import { Button as MUIButton, ButtonProps } from '@material-ui/core';
import { memo } from 'react';
import { useButtonStyles } from './button.styles';

export const Button = memo<ButtonProps>((props) => {
	const classes = useButtonStyles();
	return <MUIButton classes={classes} {...props} />;
});
