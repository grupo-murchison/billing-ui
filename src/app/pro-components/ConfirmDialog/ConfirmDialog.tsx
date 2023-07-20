import { useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DeleteOutlineIcon } from '@assets/icons';

const centerDialogConfirm = {
  display: 'flex',
  flexDirection: 'column',
  m: 'auto',
  width: 'fit-content',
};

const outlinedCancelButton = {
  ['border-color']: 'red'
}

// TODO: Update is loading prop in order to show some loading animation.
const ConfirmDialog = ({ identifier, entity, onClickYes, onClickNot, onClose }: ConfirmDialogProps) => {
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

const DeleteDialog = ({
  isLoading,
  identifier,
  entity,
  handleClickYes,
  handleClickNot,
}: ConfirmDialogInternalProps) => (
  //TODO: no usar estilos en linea, osea remplazar los existentes
  <>
    <DialogTitle sx={centerDialogConfirm} >
      <DeleteOutlineIcon color='secondary' fontSize='large' 
        sx={{
          color: '#FFFFFF',
          backgroundColor: "#ff0000",
          position: 'absolute',
          borderRadius: 10,
          marginLeft: 'auto',
          marignRight: 'auto',
          top: -20,
          zIndex: 100
        }}
      />
    </DialogTitle>
    <DialogTitle
      style={{ fontWeight: 'Bold' }}
      color='error'
      sx={centerDialogConfirm}
    >{`¿Eliminar ${entity}?`}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Se eliminará el registro {entity}: <span style={{ fontWeight: 'Bold' }}>{identifier}</span>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClickNot} disabled={isLoading} color='secondary' variant='outlined' sx={{...outlinedCancelButton, ...centerDialogConfirm}}>
        Cancelar
      </Button>
      <Button onClick={handleClickYes} disabled={isLoading} color='error' variant='contained' sx={centerDialogConfirm}>
        Eliminar
      </Button>
    </DialogActions>
  </>
);

// TODO: luego de corrobar el alcanze de estos componentes. reemplzar message y title por entity
//* es la razon por la cual los atributos son opcionales

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
  identifier: string;
  entity?: string;
  handleClickYes: () => void;
  handleClickNot?: () => void;
};

export default ConfirmDialog;
