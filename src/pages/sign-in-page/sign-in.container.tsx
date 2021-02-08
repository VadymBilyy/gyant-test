import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { option } from 'fp-ts';
import { sessionViewModel } from '../../App';
import { SignInPage } from './sign-in.component';

export const SignInPageContainer = withRX(SignInPage)(() => {
	const { onLogin, isLoading$, isLoginSuccessful$, error$ } = sessionViewModel;
	return {
		defaultProps: {
			onLogin,
			isLoading: false,
			error: option.none,
			isLoginSuccessful: false,
		},
		props: {
			isLoading: isLoading$,
			error: error$,
			isLoginSuccessful: isLoginSuccessful$,
		},
	};
});
