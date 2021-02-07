import { option } from 'fp-ts';

export interface LoginData {
	login: option.Option<string>;
	password: option.Option<string>;
}
