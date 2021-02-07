import { RemoteData, toOption } from '@devexperts/remote-data-ts';
import { observable } from '@devexperts/rx-utils/dist/observable.utils';
import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs';
import { Effect } from './function.utils';

export type PropertyAdapter<A> = [Effect<A>, Observable<A>];

export const filterMapSuccessRD = <L, A>(): OperatorFunction<RemoteData<L, A>, A> =>
	observable.filterMap<RemoteData<L, A>, A>(toOption);

export const createPropertyAdapter = <A>(initial: A): PropertyAdapter<A> => {
	const bs = new BehaviorSubject(initial);
	return [(a) => bs.getValue() !== a && bs.next(a), bs.asObservable()];
};
