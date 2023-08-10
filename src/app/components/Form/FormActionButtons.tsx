import { Button, Stack, CircularProgress } from '@mui/material';
import { ActionButtonsProps } from './form.interfaces';

const FormActionButtons = ({ isSubmitting, isUpdate, handleClose, isView, isSearch }: ActionButtonsProps) => {
  return (
    <Stack direction='row' justifyContent='end' gap={2} display={isView ? 'none' : 'flex'}>
      {handleClose && (
        <Button
          color='secondary'
          variant='outlined'
          disabled={isSubmitting}
          onClick={handleClose}
          sx={{ minWidth: '120px' }}
        >
          Cancelar
        </Button>
      )}

      <ActionButton
        isSubmitting={isSubmitting}
        label={(isUpdate && 'Actualizar') || (isSearch && 'Buscar') || 'Crear'}
      />
    </Stack>
  );
};

const ActionButton = ({ isSubmitting, label }: { label: string; isSubmitting: boolean }) => {
  return (
    <Button color='primary' variant='contained' type='submit' disabled={isSubmitting} sx={{ minWidth: '120px' }}>
      {label}
      {isSubmitting && <CircularProgress color='primary' size={15} sx={{ marginLeft: '5px' }} />}
    </Button>
  );
};

export default FormActionButtons;
