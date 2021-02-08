import { option } from 'fp-ts';

export interface LoginFormData {
	username: option.Option<string>;
	password: option.Option<string>;
}

export interface LoginData {
	username: string;
	password: string;
}

export const INITIAL_LOGIN_DATA: LoginFormData = {
	username: option.none,
	password: option.none,
};
