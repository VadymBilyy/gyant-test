import { sequenceT } from 'fp-ts/lib/Apply';
import { option } from 'fp-ts/lib/Option';

export const sequenceTOption = sequenceT(option);
