import { RxHttpRequestResponse } from '@akanass/rx-http-request';
import { LOCALHOST_ORIGIN_URI } from '../config/env';

export type RequestStatus = 'SUCCESS' | 'FAILURE';

export interface RemoteDataSuccess<A> {
	status: 'SUCCESS';
	data: A;
}

export interface RemoteDataFailure {
	status: 'FAILURE';
	error: string;
	statusCode: number;
}

export type RD<A> = RemoteDataSuccess<A> | RemoteDataFailure;

export const toRemoteData = <A>(request: RxHttpRequestResponse<A>): RD<A> => {
	if (request.response.statusCode === 200) {
		return {
			status: 'SUCCESS',
			data: request.response.body,
		};
	}
	return {
		status: 'FAILURE',
		error: 'Error',
		statusCode: request.response.statusCode,
	};
};

export const REQUEST_CONFIG_WITH_CREDENTIALS = {
	json: true,
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin': LOCALHOST_ORIGIN_URI,
	},
};
