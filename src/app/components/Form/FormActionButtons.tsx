import { Button, Stack, CircularProgress } from '@mui/material';
import { ActionButtonsProps } from './form.interfaces';
import { margin } from '@mui/system';

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
        {isSubmitting && <CircularProgress color='primary' size={15} sx={{ marginLeft: '5px' }} />}
      </Button>
    </Stack>
  );
};

export default FormActionButtons;
