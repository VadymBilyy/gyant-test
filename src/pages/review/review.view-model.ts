import { Case, ConditionReviewComplete, conditionsJSONtoSelectOptions } from '../../models/condition.model';
import { createPropertyAdapter } from '../../utils/rx.utils';
import { array, option } from 'fp-ts';
import { Effect } from '../../utils/function.utils';
import { Observable } from 'rxjs';
import { observable } from '@devexperts/rx-utils/dist/observable.utils';
import { filter, map, mapTo, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { initial, isFailure, isPending } from '@devexperts/remote-data-ts';
import { SelectOption } from '../../models/select.model';
import { ConditionID } from '../../models/condition.model';
import { CASES_FIXTURE, CONDITIONS_FIXTURE } from '../../mocks';
import { constVoid, flow, pipe } from 'fp-ts/lib/function';
import { tapRD } from '@devexperts/rx-utils/dist/rd/operators/tapRD';

interface ReviewViewModel {
	availableCases$: Observable<Case[]>;
	availableConditions$: Observable<SelectOption<ConditionID>[]>;
	onProcessCase: Effect<ConditionReviewComplete>;
	isProcessing$: Observable<boolean>;
	currentCase$: Observable<option.Option<Case>>;
	error$: Observable<option.Option<string>>;
}

export const createReviewViewModel = (): ReviewViewModel => {
	const [onProcessCase, processCaseAction$] = observable.createAdapter<ConditionReviewComplete>();
	const [onCurrentCaseChange, currentCase$] = createPropertyAdapter<option.Option<Case>>(option.none);

	// should add request call and filterMapSuccessRD
	const availableCases$ = of(CASES_FIXTURE).pipe(tap(flow(array.head, onCurrentCaseChange)));
	const availableConditions$ = of(CONDITIONS_FIXTURE).pipe(map(conditionsJSONtoSelectOptions)); // shoul add request call and filterMapSuccessRD

	const processCaseRequest$ = processCaseAction$.pipe(
		withLatestFrom(currentCase$, availableCases$),
		switchMap(([processedCase, currentCase, availableCases]) =>
			// should add request call with required parameters
			of(initial).pipe(
				tapRD(() => {
					pipe(
						currentCase,
						option.fold(constVoid, (currentCase) => {
							const currentCaseIndex = availableCases.findIndex((el) => el.id === currentCase.id);
							const nextAvailableCaase = option.fromNullable(availableCases[currentCaseIndex]);
							onCurrentCaseChange(nextAvailableCaase);
						}),
					);
				}),
			),
		),
	);

	const isProcessing$ = processCaseRequest$.pipe(map(isPending));
	const error$ = processCaseRequest$.pipe(filter(isFailure), mapTo(option.some('Process case error')));

	return {
		availableCases$,
		availableConditions$,
		onProcessCase,
		currentCase$,
		isProcessing$,
		error$,
	};
};
