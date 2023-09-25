import { useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CircularProgress, Stack } from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { CancelIcon, DeleteOutlineIcon, WarningIcon } from '@assets/icons';

// TODO: Update is loading prop in order to show some loading animation.
const ConfirmDialog = ({
  identifier,
  entity,
  onClickYes,
  onClickNot,
  onClose,
  type,
  title,
  message,
}: ConfirmDialogProps) => {
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

      {type === 'ok' && (
        <OkDialog message={'Demo'} title={'Demo'} isLoading={isLoading} handleClickYes={handleClickYes} />
      )}

      {type === 'warning' && (
        <WarningDialog
          isLoading={isLoading}
          handleClickYes={handleClickYes}
          handleClickNot={handleClickNot}
          title={title}
          message={message}
        />
      )}

      {type === 'warning2' && (
        <Warning2Dialog isLoading={isLoading} handleClickYes={handleClickYes} title={title} message={message} />
      )}

      {type === 'danger' && (
        <DangerDialog
          isLoading={isLoading}
          handleClickYes={handleClickYes}
          handleClickNot={handleClickNot}
          title={title}
          message={message}
        />
      )}

      {type === 'reject' && (
        <RejectDialog isLoading={isLoading} handleClickYes={handleClickYes} title={title} message={message} />
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
        {isLoading && <CircularProgress color='primary' size={15} sx={{ marginLeft: '5px' }} />}
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
          {isLoading && <CircularProgress color='primary' size={15} sx={{ marginLeft: '5px' }} />}
          Eliminar
        </Button>
      </DialogActions>
    </Stack>
  );
};

const DangerDialog = ({ isLoading, handleClickYes, handleClickNot, title, message }: ConfirmDialogInternalProps) => {
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
      <DialogTitle variant='h3' color={theme.palette.error.main}>
        {title || 'No es posible realizar esta acción'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
        <Button autoFocus onClick={handleClickNot} disabled={isLoading} color='secondary' variant='outlined'>
          Cancelar
        </Button>
        <Button
          onClick={handleClickYes}
          disabled={isLoading}
          variant='contained'
          sx={{
            'backgroundColor': theme.palette.error.main,
            ':hover': { backgroundColor: theme.palette.error.dark },
          }}
        >
          {isLoading && <CircularProgress color='primary' size={15} sx={{ marginLeft: '5px' }} />}
          Confirmar
        </Button>
      </DialogActions>
    </Stack>
  );
};

const RejectDialog = ({ isLoading, handleClickYes, title, message }: ConfirmDialogInternalProps) => {
  const theme = useTheme();

  return (
    <Stack padding={4} textAlign='center'>
      <CancelIcon
        sx={{
          color: theme.palette.error.main,
          borderRadius: '100%',
          padding: 1,
          width: '100px',
          height: '100px',
          m: 'auto',
        }}
      />
      <DialogTitle variant='h3' color={theme.palette.error.main}>
        {title || 'No es posible realizar esta acción'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
        <Button
          autoFocus
          onClick={handleClickYes}
          disabled={isLoading}
          variant='contained'
          sx={{
            'backgroundColor': theme.palette.error.main,
            ':hover': { backgroundColor: theme.palette.error.dark },
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Stack>
  );
};

const WarningDialog = ({ isLoading, handleClickYes, handleClickNot, title, message }: ConfirmDialogInternalProps) => {
  const theme = useTheme();

  return (
    <Stack padding={4} textAlign='center'>
      <WarningIcon
        sx={{
          color: theme.palette.warning.main,
          borderRadius: '100%',
          padding: 1,
          width: '100px',
          height: '100px',
          m: 'auto',
        }}
      />
      <DialogTitle variant='h3' color={theme.palette.warning.main}>
        {title || 'No es posible realizar esta acción'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
        <Button autoFocus onClick={handleClickNot} disabled={isLoading} color='secondary' variant='outlined'>
          Cancelar
        </Button>
        <Button
          onClick={handleClickYes}
          disabled={isLoading}
          variant='contained'
          sx={{
            'backgroundColor': theme.palette.warning.main,
            ':hover': { backgroundColor: theme.palette.warning.dark },
          }}
        >
          {isLoading && <CircularProgress color='primary' size={15} sx={{ marginLeft: '5px' }} />}
          Confirmar
        </Button>
      </DialogActions>
    </Stack>
  );
};

const Warning2Dialog = ({ isLoading, handleClickYes, title, message }: ConfirmDialogInternalProps) => {
  const theme = useTheme();

  return (
    <Stack padding={4} textAlign='center'>
      <WarningIcon
        sx={{
          color: theme.palette.warning.main,
          borderRadius: '100%',
          padding: 1,
          width: '100px',
          height: '100px',
          m: 'auto',
        }}
      />
      <DialogTitle variant='h3' color={theme.palette.warning.main}>
        {title || 'No es posible realizar esta acción'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
        <Button
          onClick={handleClickYes}
          disabled={isLoading}
          variant='contained'
          sx={{
            'backgroundColor': theme.palette.warning.main,
            ':hover': { backgroundColor: theme.palette.warning.dark },
          }}
        >
          Entendido
        </Button>
      </DialogActions>
    </Stack>
  );
};

export type ConfirmDialogType = 'delete' | 'ok' | 'warning' | 'danger' | 'reject' | 'warning2';

type ConfirmDialogProps = {
  message?: string;
  title?: string;
  identifier?: string;
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
  handleClickYes?: () => void;
  handleClickNot?: () => void;
};

export default ConfirmDialog;
