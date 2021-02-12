import { RxHR } from '@akanass/rx-http-request';
import { FunctionN, Lazy } from 'fp-ts/lib/function';
import { Observable } from 'rxjs';
import { DEFAULT_API_URI } from '../config/env';
import { ConditionID, ConditionsResponseJSON } from '../models/condition.model';
import { CaseJSON } from '../pages/review-page/review.model';
import { RD, REQUEST_CONFIG_WITH_CREDENTIALS, toRemoteData } from './controller.model';
import { map } from 'rxjs/operators';

interface CasesController {
	getCases: Lazy<Observable<RD<CaseJSON[]>>>;
	refreshCases: Lazy<Observable<RD<void>>>;
	getConditions: Lazy<Observable<RD<ConditionsResponseJSON[]>>>;
	processCase: FunctionN<[string, ConditionID[]], Observable<RD<void>>>;
}

export const casesController: CasesController = {
	getCases: () => RxHR.get(`${DEFAULT_API_URI}/api/cases/`, REQUEST_CONFIG_WITH_CREDENTIALS).pipe(map(toRemoteData)),
	getConditions: () =>
		RxHR.get(`${DEFAULT_API_URI}/api/conditions/`, REQUEST_CONFIG_WITH_CREDENTIALS).pipe(map(toRemoteData)),
	processCase: (caseId: string, conditions: ConditionID[]) =>
		RxHR.post(`${DEFAULT_API_URI}/api/cases/update/${caseId}`, {
			...REQUEST_CONFIG_WITH_CREDENTIALS,
			body: { conditions },
		}).pipe(map(toRemoteData)),
	refreshCases: () =>
		RxHR.post(`${DEFAULT_API_URI}/api/cases/refresh/`, REQUEST_CONFIG_WITH_CREDENTIALS).pipe(map(toRemoteData)),
};
