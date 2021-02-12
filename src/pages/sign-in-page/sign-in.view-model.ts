import { option } from 'fp-ts';
import { merge, Observable } from 'rxjs';
import { filter, map, mapTo, pluck, switchMap, tap } from 'rxjs/operators';
import { sessionController } from '../../controllers/session';
import { Lazy } from 'fp-ts/lib/function';
import { LoginData } from '../../models/login.model';
import { UserDetails } from '../../models/user.model';
import { Effect } from '../../utils/function.utils';
import { isRequestSuccessful } from '../../utils/request.utils';
import { createAdapter, hold } from '../../utils/rx.utils';

interface SignInViewModel {
	onLogin: Effect<LoginData>;
	onLogout: Lazy<void>;
	userDetails$: Observable<option.Option<UserDetails>>;
	isLoading$: Observable<boolean>;
	isLoginSuccessful$: Observable<boolean>;
	error$: Observable<option.Option<string>>;
}

export const createSessionViewModel = (): SignInViewModel => {
	const { login, logout } = sessionController;
	const [onLogin, login$] = createAdapter<LoginData>();
	const [onLogout, logout$] = createAdapter<void>();
	const [handleLoadingState, isLoading$] = createAdapter<boolean>();
	const [setSuccessLogin, isLoginSuccessful$] = createAdapter<boolean>();

	const handleLoading = (isLoading: boolean) => () => handleLoadingState(isLoading);

	const loginRequest$ = login$.pipe(
		tap(handleLoading(true)),
		switchMap(({ username, password }) => login(username, password).pipe(tap(handleLoading(false)), hold())),
		hold(),
	);

	const userDetailsFromLogin$ = loginRequest$.pipe(filter(isRequestSuccessful), pluck('data'), map(option.some));

	const userDetailsFromLogout$ = logout$.pipe(switchMap(logout), filter(isRequestSuccessful), mapTo(option.none));

	const userDetails$ = merge(userDetailsFromLogin$, userDetailsFromLogout$);

	const error$ = loginRequest$.pipe(
		tap((request) => isRequestSuccessful(request) && setSuccessLogin(true)),
		map((request) => (isRequestSuccessful(request) ? option.none : option.some('Invalid Credentials'))),
	);

	return {
		onLogin,
		onLogout,
		userDetails$,
		isLoading$,
		error$,
		isLoginSuccessful$,
	};
};
