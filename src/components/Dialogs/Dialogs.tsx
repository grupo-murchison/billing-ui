import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const DeleteDialog = ({ handleSave, count, open, setOpen }: any) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        {count === 0 ? (
          <DialogTitle id='responsive-dialog-title'>{`¿ Desea eliminar ${count + 1} registro/s?`}</DialogTitle>
        ) : (
          <DialogTitle id='responsive-dialog-title'>{`¿ Desea eliminar ${count} registro/s?`}</DialogTitle>
        )}
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
          <Button onClick={handleSave} autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
