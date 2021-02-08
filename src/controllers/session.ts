import { RxHR } from '@akanass/rx-http-request';
import { FunctionN, Lazy } from 'fp-ts/lib/function';
import { Observable } from 'rxjs';
import { DEFAULT_API_URI } from '../config/env';
import { UserDetails } from '../models/user.model';
import { RD, REQUEST_CONFIG_WITH_CREDENTIALS, toRemoteData } from './controller.model';
import { map } from 'rxjs/operators';

interface SessionController {
	login: FunctionN<[string, string], Observable<RD<UserDetails>>>;
	logout: Lazy<Observable<RD<void>>>;
}

export const sessionController: SessionController = {
	login: (userName: string, password: string) =>
		RxHR.post<UserDetails>(`${DEFAULT_API_URI}/user/login`, {
			...REQUEST_CONFIG_WITH_CREDENTIALS,
			body: { userName, password },
		}).pipe(map(toRemoteData)),
	logout: () =>
		RxHR.post<void>(`${DEFAULT_API_URI}/user/logout`, REQUEST_CONFIG_WITH_CREDENTIALS).pipe(map(toRemoteData)),
};
