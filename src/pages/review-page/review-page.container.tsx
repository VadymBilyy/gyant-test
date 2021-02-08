import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { option } from 'fp-ts';
import { createReviewViewModel } from './review.view-model';

import { ReviewPage } from './review-page.component';

const reviewPageViewModel = createReviewViewModel();

export const ReviewPageContainer = withRX(ReviewPage)(() => {
	const {
		availableConditions$,
		currentCase$,
		isCasesListEmpty$,
		isProcessing$,
		isDataLoading$,
		processCaseError$,
		onCaseProcess,
		isDataError$,
	} = reviewPageViewModel;

	return {
		defaultProps: {
			onCaseProcess,
			isProcessing: false,
			isCasesListEmpty: true,
			isDataLoading: true,
			currentCase: option.none,
			availableConditions: [],
			processCaseError: option.none,
			isDataError: false,
		},
		props: {
			isProcessing: isProcessing$,
			availableConditions: availableConditions$,
			isCasesListEmpty: isCasesListEmpty$,
			isDataLoading: isDataLoading$,
			currentCase: currentCase$,
			processCaseError: processCaseError$,
			isDataError: isDataError$,
		},
	};
});
