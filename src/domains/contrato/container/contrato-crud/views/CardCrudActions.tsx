import { Button, CardActions } from '@mui/material';

export const CardCrudActions = ({ isSubmitting, handleClose, labelSubmitButton }: ActionsCrudCard): JSX.Element => {
  return (
    <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button color='secondary' variant='outlined' disabled={isSubmitting} onClick={handleClose}>
        Cancelar
      </Button>
      <Button color='primary' variant='contained' type='submit' disabled={isSubmitting}>
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
