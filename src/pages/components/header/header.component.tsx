import { constVoid, Lazy } from 'fp-ts/lib/function';
import React, { FC, memo } from 'react';
import HealingIcon from '@material-ui/icons/Healing';
import { Button } from '@material-ui/core';
import { option } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { useHistory } from 'react-router';
import { useButtonStyles, useHeaderStyles, useIconStyles } from './header.styles';
import { UserDetails } from '../../../models/user.model';
import { Link } from 'react-router-dom';

interface HeaderProps {
	userDetails: option.Option<UserDetails>;
	onLogout: Lazy<void>;
}

export const Header: FC<HeaderProps> = memo(({ userDetails, onLogout }) => {
	const classes = useHeaderStyles();
	const iconClasses = useIconStyles();
	const buttonClasses = useButtonStyles();

	const history = useHistory();

	const handleLogout = () => {
		onLogout();
		history.push('/');
	};

	const renderUSerSection = pipe(
		userDetails,
		option.fold(constVoid, (userDetails) => (
			<div className={classes.userSection}>
				<span className={classes.name}>{userDetails.fullName}</span>
				<Button disableRipple className={buttonClasses.root} variant={'text'} onClick={handleLogout}>
					Logout
				</Button>
			</div>
		)),
	);

	return (
		<header className={classes.container}>
			<Link to={'/'}>
				<HealingIcon classes={iconClasses} color={'primary'} fontSize={'large'} />
			</Link>
			{renderUSerSection}
		</header>
	);
});
