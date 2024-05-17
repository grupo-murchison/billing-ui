import { useCallback, useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Unstable_Grid2 as Grid, FormControlLabel, Checkbox, Button, IconButton } from '@mui/material';

import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { AuthContext } from '@app/contexts';

import FormTextField from '@app/components/Form/FormInputs/FormTextField';

import { ValidationSchemaLogin } from '@domains/auth/repository/login.schema';
import AuthRepository from '@domains/auth/repository/auth.repository';
import { FormDataLogin } from '@domains/auth/repository/auth.types';

import { ViewIcon } from '@assets/icons';
import './AuthLogin.scss';

const AuthLogin = () => {
  const _navigate = useNavigate();

  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const { allowAccess } = useContext(AuthContext);
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(ValidationSchemaLogin),
  });

  const onSubmit: SubmitHandler<FormDataLogin> = useCallback(
    async data => {
      setIsLoginFailed(false)
      await AuthRepository.login({ username: data.username, password: data.password })
        .then(async response => {
          // TODO esto es solo para pruebas de conexion con backend. Falta terminar de desarrollar la funcionalidad y ruteo.
          console.info('auth info', response.data);
          const accessToken = response.data.access_token

          // TODO este se debe invocar donde corresponda ( acá no, no tiene sentido )
          await AuthRepository.validateToken(response.data.access_token).then(response => {
            console.info('Token válido? status code 200, sino lanza un 401: ', response.status, response.data);
          });

          allowAccess(accessToken);
          _navigate('/');
        })
        .catch(error => {
          //TODO: setear en el back distintos mensajes de error para mostrar en componente
          setIsLoginFailed(true)
          console.error('Longin falló');
        });
    },
    [allowAccess, _navigate],
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className='auth-login'>
      <Card className='login__card' variant='outlined'>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <div className='lc__logo'>
              <img src='/logo/logo-murchison.png' alt='LOGO' />
            </div>
          </Grid>
          <Grid xs={12}>
            <div className='lc__advice'>
              <span className='muted'>Ingrese credenciales para continuar</span>
            </div>
            {isLoginFailed &&  
              <div className='lc__advice'>
                <span className='muted' >Error al iniciar sesión, credenciales invalidas</span>
              </div>
            }
          </Grid>
          <Grid xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <FormTextField fullWidth name='username' label='Usuario ( email )' control={control} />
                </Grid>
                <Grid xs={12}>
                  <FormTextField
                    control={control}
                    fullWidth
                    label='Contraseña'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <ViewIcon />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid sm={6}>
                  <FormControlLabel control={<Checkbox {...register('rememberMe')} />} label='Recordar' disabled />
                </Grid>
                <Grid sm={6}>
                  <div className='lc__recover-password'>
                    <span>Olvidó su contraseña?</span>
                  </div>
                </Grid>
                <Grid xs={12}>
                  <Button variant='contained' fullWidth size='large' type='submit'>
                    INICIAR SESIÓN
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          {/* <Grid sm={12}>
            <div className='lc__create-account'>
              <span>Crear usuario</span>
            </div>
          </Grid> */}
        </Grid>
      </Card>
    </div>
  );
};

export default AuthLogin;
