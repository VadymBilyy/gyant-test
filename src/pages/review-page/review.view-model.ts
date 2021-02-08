import { array, option } from 'fp-ts';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mapTo, pluck, shareReplay, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { constant, constVoid, flow, pipe } from 'fp-ts/lib/function';
import { createAdapter, createPropertyAdapter } from '../../utils/rx.utils';
import {
	Case,
	ConditionID,
	ConditionReviewComplete,
	conditionsJSONtoSelectOptions,
} from '../../models/condition.model';
import { casesController } from '../../controllers/cases';
import { isRequestFailure, isRequestSuccessful, unautorizedRedirect } from '../../utils/request.utils';
import { mapJSONCasesToCases } from './review.model';
import { Effect } from '../../utils/function.utils';
import { SelectOption } from '../../models/select.model';

interface ReviewViewModel {
	availableCases$: Observable<Case[]>;
	availableConditions$: Observable<SelectOption<ConditionID>[]>;
	onCaseProcess: Effect<ConditionReviewComplete>;
	isProcessing$: Observable<boolean>;
	isDataLoading$: Observable<boolean>;
	isCasesListEmpty$: Observable<boolean>;
	currentCase$: Observable<option.Option<Case>>;
	processCaseError$: Observable<option.Option<string>>;
	isDataError$: Observable<boolean>;
}

export const createReviewViewModel = (): ReviewViewModel => {
	const { getCases, getConditions, processCase } = casesController;
	const [onCaseProcess, processCaseAction$] = createAdapter<ConditionReviewComplete>();
	const [onCurrentCaseChange, currentCase$] = createPropertyAdapter<option.Option<Case>>(option.none);
	const [handleProcessingState, isProcessing$] = createAdapter<boolean>();

	const handleLoading = (isLoading: boolean) => () => handleProcessingState(isLoading);

	const availableCasesRequest$ = getCases().pipe(shareReplay());
	const availableConditionsRequest$ = getConditions().pipe(shareReplay());

	const availableCases$ = availableCasesRequest$.pipe(
		tap(unautorizedRedirect),
		filter(isRequestSuccessful),
		map((remoteData) => mapJSONCasesToCases(remoteData.data)),
		tap(flow(array.head, onCurrentCaseChange)),
	);

	const availableConditions$ = availableConditionsRequest$.pipe(
		tap(unautorizedRedirect),
		filter(isRequestSuccessful),
		pluck('data'),
		map(
			flow(
				array.head,
				option.map((a) => conditionsJSONtoSelectOptions(a.conditions)),
				option.getOrElse(constant<SelectOption<ConditionID>[]>([])),
			),
		),
	);

	const isCasesListEmpty$ = availableCases$.pipe(map(array.isEmpty));
	const isDataLoading$ = combineLatest(availableCases$, availableConditions$).pipe(mapTo(false));
	const isDataError$ = combineLatest(availableCasesRequest$, availableConditionsRequest$).pipe(
		map(array.some(isRequestFailure)),
	);

	const processCaseRequest$ = processCaseAction$.pipe(
		tap(handleLoading(true)),
		withLatestFrom(currentCase$, availableCases$),
		switchMap(([processedCase, currentCase, availableCases]) =>
			processCase(processedCase.caseId, processedCase.conditions).pipe(
				tap((request) => {
					if (isRequestSuccessful(request)) {
						pipe(
							currentCase,
							option.fold(constVoid, (currentCase) => {
								const currentCaseIndex = availableCases.findIndex(
									(el) => el.caseId === currentCase.caseId,
								);
								const nextAvailableCaase = option.fromNullable(availableCases[currentCaseIndex + 1]);
								onCurrentCaseChange(nextAvailableCaase);
							}),
						);
					}
					handleProcessingState(false);
				}),
			),
		),
	);

	const processCaseError$ = processCaseRequest$.pipe(
		map((request) => (!isRequestSuccessful(request) ? option.some('Invalid Credentials') : option.none)),
	);

	return {
		availableCases$,
		availableConditions$,
		isCasesListEmpty$,
		isDataLoading$,
		onCaseProcess,
		currentCase$,
		isProcessing$,
		processCaseError$,
		isDataError$,
	};
};
