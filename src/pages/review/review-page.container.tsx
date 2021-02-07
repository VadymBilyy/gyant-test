import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { option } from 'fp-ts';
import { createReviewViewModel } from './review.view-model';

import { ReviewPage } from './review-page';

const reviewPageViewModel = createReviewViewModel();

export const ReviewPageContainer = withRX(ReviewPage)(() => {
	const { onProcessCase, isProcessing$, availableConditions$, currentCase$ } = reviewPageViewModel;
	return {
		defaultProps: {
			onCaseProcess: onProcessCase,
			isProcessing: false,
			availableConditions: [],
			currentCase: option.none,
		},
		props: {
			isProcessing: isProcessing$,
			availableConditions: availableConditions$,
			currentCase: currentCase$,
		},
	};
});
