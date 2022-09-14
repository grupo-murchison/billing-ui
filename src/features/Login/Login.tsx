import { useCallback, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Card, TextField, Unstable_Grid2 as Grid, FormControlLabel, Checkbox, Button } from '@mui/material';

import { AuthContext } from '@contexts';

const Login = () => {
  const _navigate = useNavigate();

  const { allowAccess } = useContext(AuthContext);

  const { register, handleSubmit: rhfHandleSubmit } = useForm();

  const handleSubmit = useCallback(
    (data: AnyValue) => {
      console.log({ data });
      allowAccess();
      _navigate('/');
    },
    [allowAccess, _navigate],
  );

  return (
    <Card className='ft-login' variant='outlined'>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <div className='login__logo'>
            <img src='./logo/logo-placeholder.png' alt='LOGO' />
          </div>
        </Grid>
        <Grid xs={12}>
          <div className='login__advice'>
            <span className='muted'>Ingrese credenciales para continuar</span>
          </div>
        </Grid>
        <Grid xs={12}>
          <form onSubmit={rhfHandleSubmit(handleSubmit)}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <TextField fullWidth id='username' label='Usuario' variant='outlined' {...register('username')} />
              </Grid>
              <Grid xs={12}>
                <TextField fullWidth id='password' label='Contraseña' variant='outlined' {...register('password')} />
              </Grid>
              <Grid sm={6}>
                <FormControlLabel control={<Checkbox {...register('rememberMe')} />} label='Recordar' />
              </Grid>
              <Grid sm={6}>
                <div className='login__recover-password'>
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
        <Grid sm={12}>
          <div className='login__create-account'>
            <span>Crear usuario</span>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Login;
