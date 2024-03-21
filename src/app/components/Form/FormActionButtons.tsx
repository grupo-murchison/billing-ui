import { Button, Stack, CircularProgress } from '@mui/material';
import { ActionButtonsProps } from './form.interfaces';

const FormActionButtons = ({ isSubmitting, handleClose, label, handleConfirm }: ActionButtonsProps) => {
  return (
    <Stack direction='row' justifyContent='end' gap={2}>
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

      {label && (
        <ActionButton
          isSubmitting={isSubmitting || false}
          label={
            (label === 'update' && 'Actualizar') ||
            (label === 'search' && 'Buscar') ||
            (label === 'create' && 'Crear') ||
            label ||
            ''
          }
        />
      )}

      {handleConfirm && (
        <Button
          color='primary'
          variant='contained'
          // type='button'
          disabled={isSubmitting}
          onClick={handleConfirm}
          sx={{ minWidth: '120px' }}
        >
          Confirmar
        </Button>
      )}
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
