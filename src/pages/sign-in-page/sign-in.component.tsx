import { Input, Paper } from '@material-ui/core';
import { option } from 'fp-ts';
import React, { ChangeEvent, FormEvent, memo, useEffect, useState } from 'react';
import { constNull, constVoid, not, pipe } from 'fp-ts/lib/function';
import { useHistory } from 'react-router';
import { isEmpty } from '../../utils/string.utils';
import { Button } from '../../ui-kit/button/button';
import { INITIAL_LOGIN_DATA, LoginData, LoginFormData } from '../../models/login.model';
import { sequenceTOption } from '../../utils/option.utils';
import { useSignInInputStyles, useSignInStyles } from './sign-in.styles';
import { Effect } from '../../utils/function.utils';

interface SignInPageProps {
	onLogin: Effect<LoginData>;
	isLoading: boolean;
	isLoginSuccessful: boolean;
	error: option.Option<string>;
}

export const SignInPage = memo<SignInPageProps>(({ onLogin, error, isLoading, isLoginSuccessful }) => {
	const history = useHistory();
	const classes = useSignInStyles();
	const classesInput = useSignInInputStyles();

	useEffect(() => {
		isLoginSuccessful && history.push('/review');
	}, [isLoginSuccessful, history]);

	const [formData, onFormDataChange] = useState<LoginFormData>(INITIAL_LOGIN_DATA);

	const onFormValueChange = (field: keyof LoginData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = pipe(e.target.value, option.fromPredicate(not(isEmpty)));
		onFormDataChange({
			...formData,
			[field]: value,
		});
	};
	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		pipe(
			sequenceTOption(formData.username, formData.password),
			option.fold(constVoid, ([username, password]) => onLogin({ username, password })),
		);
	};

	const renderError = (error: option.Option<string>) =>
		pipe(
			error,
			option.fold(constNull, (error) => <span className={classes.error}>{error}</span>),
		);

	return (
		<div className={classes.container}>
			<Paper elevation={3}>
				<form className={classes.form} onSubmit={submitHandler}>
					{renderError(error)}
					<Input
						value={pipe(formData.username, option.toUndefined)}
						required
						onChange={onFormValueChange('username')}
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
					<Button disabled={isLoading} type={'submit'} className={classes.signInButtton}>
						Log In
					</Button>
				</form>
			</Paper>
		</div>
	);
});
