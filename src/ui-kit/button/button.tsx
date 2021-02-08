import { Button as MUIButton, ButtonProps } from '@material-ui/core';
import React, { memo } from 'react';
import { useButtonStyles } from './button.styles';

export const Button = memo<ButtonProps>((props) => {
	const classes = useButtonStyles();
	return <MUIButton classes={{ ...props.classes, ...classes }} {...props} />;
});
