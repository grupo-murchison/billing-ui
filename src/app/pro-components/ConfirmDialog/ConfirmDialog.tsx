import { useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// TODO: Update is loading prop in order to show some loading animation.
const ConfirmDialog = ({ message, title, identifier, entity, onClickYes, onClickNot, onClose }: ConfirmDialogProps) => {
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

  // TODO agregar una prop para indicar como un type y que reciba los valores por ejemplo "deleteDialog", "okDialog"
  // y en funcion de ese type renderizar la ventana <OkDialog/> <DeleteDialog />
  return (
    <Dialog fullScreen={fullScreen} open onClose={onClose}>
      <DeleteDialog
        entity={entity}
        isLoading={isLoading}
        identifier={identifier}
        handleClickYes={handleClickYes}
        handleClickNot={handleClickNot}
      />

      {/* <OkDialog message={message} title={title} isLoading={isLoading} handleClickYes={handleClickYes} /> */}
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

const DeleteDialog = ({ message, title, isLoading, identifier, entity, handleClickYes, handleClickNot }: ConfirmDialogInternalProps) => (
  //TODO: no usar estilos en linea, osea remplazar los existentes
  <>
    <DialogTitle  style={{fontWeight:'Bold'}} color='error'>{`¿Eliminar ${entity}?`}</DialogTitle>
    <DialogContent>
      <DialogContentText>Se eliminará el registro {entity}: <span style={{fontWeight:'Bold'}}>{identifier}</span></DialogContentText> 
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClickNot} disabled={isLoading} color='secondary' variant='outlined'>
        Cancelar
      </Button>
      <Button onClick={handleClickYes} disabled={isLoading} color='error' variant='contained'>
        Eliminar
      </Button>
    </DialogActions>
  </>
);

// TODO: luego de corrobar el alcanze de estos componentes. reemplzar message y title por entity
//* es la razon por la cual los atributos son opcionales

type ConfirmDialogProps = {
  message?: string;
  title?: string;
  identifier: string;
  entity?: string;
  onClickYes: () => void;
  onClickNot: () => void;
  onClose: () => void;
};

type ConfirmDialogInternalProps = {
  message?: string;
  title?: string;
  isLoading: boolean;
  identifier: string;
  entity?: string;
  handleClickYes: () => void;
  handleClickNot?: () => void;
};

export default ConfirmDialog;
