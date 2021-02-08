import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { HeaderContainer } from './pages/components/header/header.container';
import { ReviewPageContainer } from './pages/review-page/review-page.container';
import { useAppStyles } from './App.styles';
import { SignInPageContainer } from './pages/sign-in-page/sign-in.container';
import { createSessionViewModel } from './pages/sign-in-page/sign-in.view-model';

export const sessionViewModel = createSessionViewModel();

export const App = () => {
	const classes = useAppStyles();

	return (
		<div className={classes.container}>
			<BrowserRouter>
				<HeaderContainer />
				<Switch>
					<Route path={'/sign-in'} render={() => <SignInPageContainer />} />
					<Route path={'/review'} render={() => <ReviewPageContainer />} />
					<Redirect to={'/sign-in'} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};
