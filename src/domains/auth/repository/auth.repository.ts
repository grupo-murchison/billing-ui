import { RepositoryUtils } from '@app/utils';

import { AuthService } from './auth.service';
import { LoginData } from './auth.types';

class AuthRepository {
  static login = async (login: LoginData) => {
    return await RepositoryUtils.fromRxjs(AuthService.login(login));
  };

  static validateToken = async (access_token: string) => {
    return await RepositoryUtils.fromRxjs(AuthService.validateToken(access_token));
  };


  //Cuando esten hechas las modificiaciones de auth.service.ts implementar correctamenta para consumir la url que devuelve rutas
  static getUserRoutes = async (access_token: string) => {
    return await RepositoryUtils.fromRxjs(AuthService.getAllowedRoutes(access_token));
  };

}

export default AuthRepository;
