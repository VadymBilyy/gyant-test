import { Paper } from '@material-ui/core';
import { option } from 'fp-ts';
import React, { ChangeEvent, memo, useState } from 'react';
import { Effect } from '../../utils/function.utils';
import { useSignInInputStyles, useSignInStyles } from './sign-in.styles';
import { Input } from '@material-ui/core';
import { not, pipe } from 'fp-ts/lib/function';
import { isEmpty } from '../../utils/string.utils';
import { Button } from '../../ui-kit/button/button';
import { LoginData } from '../../models/login.model';

const INITIAL_LOGIN_DATA: LoginData = {
	login: option.none,
	password: option.none,
};

interface SignInPageProps {
	onLogin: Effect<LoginData>;
	isLoading: boolean;
}

export const SignInPage = memo<SignInPageProps>(({ onLogin, isLoading }) => {
	const classes = useSignInStyles();
	const classesInput = useSignInInputStyles();

	const [formData, onFormDataChange] = useState<LoginData>(INITIAL_LOGIN_DATA);

	const onFormValueChange = (field: keyof LoginData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = pipe(e.target.value, option.fromPredicate(not(isEmpty)));
		onFormDataChange({
			...formData,
			[field]: value,
		});
	};
	const submitHandler = () => onLogin(formData);

	return (
		<div className={classes.container}>
			<Paper elevation={3}>
				<form className={classes.form} onSubmit={submitHandler}>
					<Input
						value={pipe(formData.login, option.toUndefined)}
						required
						onChange={onFormValueChange('login')}
						type={'text'}
						classes={classesInput}
					/>
					<Input
						value={pipe(formData.password, option.toUndefined)}
						required
						onChange={onFormValueChange('password')}
						type={'password'}
						classes={classesInput}
					/>
					<Button disabled={isLoading} type={'submit'}>
						Log In
					</Button>
				</form>
			</Paper>
		</div>
	);
});
