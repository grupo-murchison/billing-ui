import { ReactNode } from 'react';

import { Row, Col } from '@app/components';
import { Button } from '@mui/material';

const Form = ({ children, isSubmitting, onSubmit, handleClose, update }: FromProps) => {
  return (
    <form noValidate onSubmit={onSubmit} autoComplete='off'>
      <>{children}</>

      <Row>
        <Col md={12}>
          <Button color='secondary' variant='outlined' disabled={isSubmitting} onClick={handleClose}>
            Cancelar
          </Button>
          <Button color='primary' variant='contained' type='submit' disabled={isSubmitting}>
            {update ? 'Actualizar' : 'Crear'}
          </Button>
        </Col>
      </Row>
    </form>
  );
};

type FromProps = {
  children?: ReactNode;
  onSubmit: any;
  isSubmitting: boolean;
  handleClose: any;
  update?: boolean;
};

export default Form;
