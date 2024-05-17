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