import { ReactNode } from 'react';

import { Row, Col } from '@app/components';
import { Button, Stack } from '@mui/material';

const Form = ({ children, isSubmitting, onSubmit, handleClose, isUpdate }: FromProps) => {
  return (
    <form noValidate onSubmit={onSubmit} autoComplete='off'>
      <>{children}</>

      <Row>
        <Col md={12}>
          <Button color='secondary' variant='outlined' disabled={isSubmitting} onClick={handleClose}>
            Cancelar
          </Button>
          <Button color='primary' variant='contained' type='submit' disabled={isSubmitting}>
            {isUpdate ? 'Actualizar' : 'Crear'}
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export const FormV2 = ({ children, isSubmitting, onSubmit, handleClose, isUpdate }: FromProps) => {
  return (
    <form noValidate onSubmit={onSubmit} autoComplete='off'>
      <>{children}</>

      <Stack direction='row' justifyContent='end' gap={2}>
        <Button
          color='secondary'
          variant='outlined'
          disabled={isSubmitting}
          onClick={handleClose}
          sx={{ width: '120px' }}
        >
          Cancelar
        </Button>
        <Button color='primary' variant='contained' type='submit' disabled={isSubmitting} sx={{ width: '120px' }}>
          {isUpdate ? 'Actualizar' : 'Crear'}
        </Button>
      </Stack>
    </form>
  );
};

type FromProps = {
  children?: ReactNode;
  onSubmit: any;
  isSubmitting: boolean;
  handleClose: any;
  isUpdate?: boolean;
};

export default Form;
