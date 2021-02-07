import { option } from 'fp-ts';
import { constVoid } from 'fp-ts/lib/function';
import React from 'react';
import { Header } from './components/header/header.component';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useAppStyles } from './App.styles';
import { SignInPageContainer } from './pages/sign-in/sign-in.container';
import { ReviewPageContainer } from './pages/review/review-page.container';

export const App = () => {
	const classes = useAppStyles();
	return (
		<div className={classes.container}>
			<Header fullName={option.some('Vadim')} onLogout={constVoid} />
			<BrowserRouter>
				<Switch>
					<Route path={'/sign-in'} render={() => <SignInPageContainer />} />
					<Route path={'/review'} render={() => <ReviewPageContainer />} />
					<Redirect to={'/sign-in'} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};
