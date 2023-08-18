import { Button, Stack, CircularProgress } from '@mui/material';
import { ActionButtonsProps } from './form.interfaces';

const FormActionButtons = ({ isSubmitting, handleClose, label }: ActionButtonsProps) => {
  return (
    <Stack direction='row' justifyContent='end' gap={2} display={!label ? 'none' : 'flex'}>
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
        isSubmitting={isSubmitting || false}
        label={
          (label === 'update' && 'Actualizar') ||
          (label === 'search' && 'Buscar') ||
          (label === 'create' && 'Crear') ||
          label ||
          ''
        }
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
