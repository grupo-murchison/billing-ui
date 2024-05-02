import { AxiosUtils } from '@app/utils';
import { HandlePromise } from '@app/utils/axios.util';
import { LoginProvider } from '@providers';
import { AuthInfo, LoginData, ValidToken } from './auth.types';

class AuthService {
  static login = async (login: LoginData): Promise<HandlePromise<AuthInfo>> => {
    const [response, error] = await AxiosUtils.handleResponse(LoginProvider.post<AuthInfo>('local', login));

    return [response, error];
  };

  static validateToken = async (access_token: string): Promise<HandlePromise<ValidToken>> => {
    const [response, error] = await AxiosUtils.handleResponse(
      LoginProvider.get<ValidToken>('validate', { headers: { Authorization: `Bearer ${access_token}` } }),
    );

    return [response, error];
  };
}

export { AuthService };
