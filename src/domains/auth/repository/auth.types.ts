export type LoginData = { username: string; password: string };

export type FormDataLogin = LoginData & Record<'rememberMe', boolean>;

export type AuthInfo = { access_token: string };

export type ValidToken = { ok: boolean };
