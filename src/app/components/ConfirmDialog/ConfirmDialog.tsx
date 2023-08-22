import { useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Stack } from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { DeleteOutlineIcon } from '@assets/icons';

// TODO: Update is loading prop in order to show some loading animation.
const ConfirmDialog = ({ identifier, entity, onClickYes, onClickNot, onClose, type }: ConfirmDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickNot = useCallback(async () => {
    setIsLoading(true);
    await Promise.resolve(onClickNot && onClickNot());
    setIsLoading(false);
  }, [onClickNot]);

  const handleClickYes = useCallback(async () => {
    setIsLoading(true);
    await Promise.resolve(onClickYes && onClickYes());
    setIsLoading(false);
  }, [onClickYes]);

  return (
    <Dialog fullScreen={fullScreen} open onClose={onClose} PaperProps={{ sx: { borderRadius: '8px', minHeight: 300 } }}>
      {type === 'delete' && (
        <DeleteDialog
          entity={entity}
          isLoading={isLoading}
          identifier={identifier}
          handleClickYes={handleClickYes}
          handleClickNot={handleClickNot}
        />
      )}

      {type !== 'delete' && (
        <OkDialog message={'Demo'} title={'Demo'} isLoading={isLoading} handleClickYes={handleClickYes} />
      )}
    </Dialog>
  );
};

const OkDialog = ({ message, title, isLoading, handleClickYes }: ConfirmDialogInternalProps) => (
  <>
    <DialogTitle>{title || 'Servicio Creado con éxito'}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClickYes} disabled={isLoading} color='primary' variant='contained'>
        OK
      </Button>
    </DialogActions>
  </>
);

const DeleteDialog = ({
  isLoading,
  identifier,
  entity,
  handleClickYes,
  handleClickNot,
}: ConfirmDialogInternalProps) => {
  const theme = useTheme();

  return (
    <Stack padding={4} textAlign='center'>
      <DeleteOutlineIcon
        sx={{
          color: theme.palette.common.white,
          backgroundColor: theme.palette.error.main,
          borderRadius: '100%',
          padding: 1,
          width: '100px',
          height: '100px',
          m: 'auto',
        }}
      />
      <DialogTitle variant='h3' color={theme.palette.error.main}>{`¿Eliminar ${entity}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Se eliminará el registro {entity}: <span style={{ fontWeight: 'Bold' }}>{identifier}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
        <Button autoFocus onClick={handleClickNot} disabled={isLoading} color='secondary' variant='outlined'>
          Cancelar
        </Button>
        <Button onClick={handleClickYes} disabled={isLoading} color='error' variant='contained'>
          Eliminar
        </Button>
      </DialogActions>
    </Stack>
  );
};

type ConfirmDialogType = 'delete' | 'ok' | 'warning';

type ConfirmDialogProps = {
  message?: string;
  title?: string;
  identifier: string;
  entity?: string;
  type: ConfirmDialogType;
  onClickYes: () => void;
  onClickNot: () => void;
  onClose: () => void;
};

type ConfirmDialogInternalProps = {
  message?: string;
  title?: string;
  isLoading: boolean;
  identifier?: string;
  entity?: string;
  handleClickYes: () => void;
  handleClickNot?: () => void;
};

export default ConfirmDialog;