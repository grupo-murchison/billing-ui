import { Container, Tipography, TextField, Button, Grid } from '@app/design-system/material-ui';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem } from '@mui/material';
import { useState } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import './ProductoSoftlandCreate.scss';

const ProductoSoftlandSchema = z.object({
  // idProductoSoftland: z.string(),
  agrupacionProducto: z.string().max(50, { message: 'Ha superado el límite de caracteres' }),
  codigoProducto: z.string().max(50, { message: 'Ha superado el límite de caracteres' }),
  descripcion: z.string().max(250, { message: 'Ha superado el límite de caracteres' }),
  estado: z.string(),
  fechaEstado: z.date(),
});

type ProductoSoftlandSchemaType = z.infer<typeof ProductoSoftlandSchema>;

const ProductoSoftland = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductoSoftlandSchemaType>({
    defaultValues: {
      // idProductoSoftland: undefined,
      agrupacionProducto: '',
      codigoProducto: '',
      descripcion: '',
      estado: '',
      fechaEstado: undefined,
    },
    resolver: zodResolver(ProductoSoftlandSchema),
  });

  const onSubmit: SubmitHandler<ProductoSoftlandSchemaType> = data => {
    console.log(data);
    alert('creado con éxito');
  };
  const estados = [
    {
      value: 'activo',
      label: 'Activo',
    },
    {
      value: 'baja',
      label: 'Dado de baja',
    },
    {
      value: 'completado',
      label: 'Completado',
    },
  ];

  const [value, setValue] = useState<Dayjs | null>(null);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <>
      <Container className='login-container'>
        <Tipography className='login__title'>Producto Softland</Tipography>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} direction='row-reverse'>
            {/* <Grid item xs={12}>
              <Autocomplete
                options={tiposID}
                id='customerEmail'
                autoComplete
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='ID Producto Softland'
                    margin='dense'
                    {...register('idProductoSoftland')}
                  />
                )}
                freeSolo
                fullWidth
                error={!!errors.idProductoSoftland}
                helperText={errors?.idProductoSoftland?.message}
              />
            </Grid> */}
            <Grid item xs={6}>
              <TextField
                className='login__input'
                variant='outlined'
                id='agrupacionProducto'
                label='Agrupación Producto'
                {...register('agrupacionProducto', { required: 'true' })}
                error={!!errors.agrupacionProducto}
                helperText={errors?.agrupacionProducto?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className='login__input'
                variant='outlined'
                id='codigoProducto'
                label='Código Producto'
                {...register('codigoProducto', { required: 'true' })}
                error={!!errors.codigoProducto}
                helperText={errors?.codigoProducto?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className='login__input'
                variant='outlined'
                id='descripcion'
                label='Descripción'
                autoFocus
                {...register('descripcion')}
                error={!!errors.descripcion}
                helperText={errors?.descripcion?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  inputFormat='DD/MM/YYYY'
                  value={value}
                  onChange={handleChange}
                  renderInput={params => (
                    <TextField
                      {...params}
                      className='login__input'
                      variant='outlined'
                      id='fechaEstado'
                      label='Fecha'
                      {...register('fechaEstado', { valueAsDate: true })}
                      error={!!errors.fechaEstado}
                      helperText={errors?.fechaEstado?.message}
                    />
                  )}
                />
              </LocalizationProvider>
              {/* <TextField
                id='fechaEstado'
                label='Fecha'
                type='date'
                {...register('fechaEstado')}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                variant='outlined'
              /> */}
            </Grid>
            <Grid item xs={6}>
              <TextField id='tipo estado' select fullWidth label='Estado' {...register('estado')}>
                {estados.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item>
              <Button
                type='submit'
                variant='contained'
                className='login__button'
                // onClick={() => {
                //   alert('Desea confirmar?');
                // }}
              >
                Add Invoice
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Container className='respuesta-container'>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </Container>
    </>
  );
};

export default ProductoSoftland;
