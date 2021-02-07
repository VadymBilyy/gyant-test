import { Lazy, constVoid } from 'fp-ts/lib/function';
import React, { FC, memo } from 'react';
import HealingIcon from '@material-ui/icons/Healing';
import { useHeaderStyles, useIconStyles, useButtonStyles } from './header.styles';
import { Button } from '@material-ui/core';
import { option } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';

interface HeaderProps {
	fullName: option.Option<string>;
	onLogout: Lazy<void>;
}

export const Header: FC<HeaderProps> = memo(({ fullName }) => {
	const classes = useHeaderStyles();
	const iconClasses = useIconStyles();
	const buttonClasses = useButtonStyles();

	const renderUSerSection = pipe(
		fullName,
		option.fold(constVoid, (fullName) => (
			<div className={classes.userSection}>
				<span className={classes.name}>{fullName}</span>
				<Button disableRipple className={buttonClasses.root} variant={'text'}>
					Logout
				</Button>
			</div>
		)),
	);

	return (
		<header className={classes.container}>
			<HealingIcon classes={iconClasses} color={'primary'} fontSize={'large'} />
			{renderUSerSection}
		</header>
	);
});
