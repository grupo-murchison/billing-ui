import jwt_decode, { JwtPayload }  from 'jwt-decode';

export const isTokenExpired = (token: string | null ): boolean => {
  try {
    if (!token) {
      return true;
    }
  
    const decodedToken: JwtPayload = jwt_decode(token);
    const exp = decodedToken?.exp
    if (!exp) {
      console.log('token expirado', exp)
      return true;
    }
  
    return Date.now() >= exp * 1000;
    
  } catch (error) {
    console.log(error)
    return true
  }
};

export const getUserNameByJwt = (): string => {

  const token = localStorage.getItem('token')

  try {
    if (!token) {
      return 'Nombre de Usuario'
    }
  
    const decodedToken: AnyValue = jwt_decode(token);
    const username = decodedToken?.username
    if (!username) {
      console.log('Sin nombre de usuario', decodedToken)
      return 'Nombre de Usuario'
    } else {
      return username
    }

  } catch (error) {
    console.log(error)
    return 'Nombre de Usuario'
  }
};