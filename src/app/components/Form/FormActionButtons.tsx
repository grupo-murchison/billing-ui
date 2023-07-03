import { Button, Stack } from '@mui/material';
import { ActionButtonsProps } from './form.interfaces';

const FormActionButtons = ({ isSubmitting, isUpdate, handleClose }: ActionButtonsProps) => {
  return (
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
  );
};

export default FormActionButtons;
