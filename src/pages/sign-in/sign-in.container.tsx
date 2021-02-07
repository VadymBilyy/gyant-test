import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { createSessionViewModel } from './sign-in.view-model';
import { SignInPage } from './sign-in';

const sessionInViewModel = createSessionViewModel();

export const SignInPageContainer = withRX(SignInPage)(() => {
	const { onLogin, isLoading$ } = sessionInViewModel;
	return {
		defaultProps: {
			onLogin,
			isLoading: false,
		},
		props: {
			isLoading: isLoading$,
		},
	};
});
