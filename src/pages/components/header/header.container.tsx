import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { option } from 'fp-ts';
import { sessionViewModel } from '../../../app/App';
import { Header } from './header.component';

export const HeaderContainer = withRX(Header)(() => {
	const { userDetails$, onLogout } = sessionViewModel;
	return {
		defaultProps: {
			onLogout,
			userDetails: option.none,
		},
		props: {
			userDetails: userDetails$,
		},
	};
});
