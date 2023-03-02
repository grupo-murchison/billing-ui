import { Button, Col, Row } from '@app/components';
import { CardActions } from '@mui/material';

export const CardCrudActions = ({ isSubmitting, handleClose, labelSubmitButton }: ActionsCrudCard): JSX.Element => {
  return (
    <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button color='secondary' outlined disabled={isSubmitting} onClick={handleClose}>
        Cancelar
      </Button>
      <Button color='primary' type='submit' disabled={isSubmitting}>
        {labelSubmitButton ? labelSubmitButton : 'Enviar'}
      </Button>
    </CardActions>
  );
};

interface ActionsCrudCard {
  isSubmitting: boolean;
  handleClose: () => void;
  labelSubmitButton?: string;
}
