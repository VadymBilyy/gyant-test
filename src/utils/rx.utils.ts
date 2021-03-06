import { BehaviorSubject, MonoTypeOperatorFunction, Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Effect } from './function.utils';

export type PropertyAdapter<A> = [Effect<A>, Observable<A>];
export type Adapter<A> = [Effect<A>, Observable<A>];

export const createPropertyAdapter = <A>(initial: A): PropertyAdapter<A> => {
	const bs = new BehaviorSubject(initial);
	return [(a) => bs.getValue() !== a && bs.next(a), bs.asObservable()];
};

export const createAdapter = <A>(): Adapter<A> => {
	const s = new Subject<A>();
	return [(a: A) => s.next(a), s.asObservable()];
};

export const hold = <T>(): MonoTypeOperatorFunction<T> => shareReplay<T>({ refCount: true, bufferSize: 1 });
