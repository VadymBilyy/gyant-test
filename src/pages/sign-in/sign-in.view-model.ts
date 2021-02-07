import { filterMapSuccessRD } from '../../utils/rx.utils';
import { option } from 'fp-ts';
import { LoginData } from '../../models/login.model';
import { Effect } from '../../utils/function.utils';
import { Observable } from 'rxjs';
import { observable } from '@devexperts/rx-utils/dist/observable.utils';
import { mapRD } from '@devexperts/rx-utils/dist/rd/operators/mapRD';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { initial, isFailure, isPending } from '@devexperts/remote-data-ts';

interface UserInfoTO {
	doctorName: string;
}

interface SignInViewModel {
	onLogin: Effect<LoginData>;
	fullName$: Observable<option.Option<string>>;
	isLoading$: Observable<boolean>;
	error$: Observable<option.Option<string>>;
}

export const createSessionViewModel = (): SignInViewModel => {
	const [onLogin, login$] = observable.createAdapter<LoginData>();

	const loginRequest$ = login$.pipe(switchMap(() => of(initial)));

	const fullName$ = loginRequest$.pipe(
		mapRD((response: UserInfoTO) => option.some(response.doctorName)),
		filterMapSuccessRD(),
	);

	const isLoading$ = loginRequest$.pipe(map(isPending));
	const error$ = loginRequest$.pipe(filter(isFailure), mapTo(option.some('Login Error')));

	return {
		onLogin,
		fullName$,
		isLoading$,
		error$,
	};
};
