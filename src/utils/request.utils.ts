import { RD, RemoteDataSuccess, RemoteDataFailure } from '../controllers/controller.model';

export const isRequestSuccessful = <A>(remoteData: RD<A>): remoteData is RemoteDataSuccess<A> =>
	remoteData.status === 'SUCCESS';

export const isRequestFailure = (remoteData: RD<any>): remoteData is RemoteDataFailure =>
	remoteData.status === 'FAILURE';

export const unautorizedRedirect = <A>(remoteData: RD<A>): void => {
	if (isRequestFailure(remoteData) && remoteData.statusCode === 403) {
		window.location.pathname = '/';
	}
};
