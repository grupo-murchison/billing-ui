import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ConfirmDialog = ({ message, onClickYes, onClickNot, onClose }: AnyValue) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog fullScreen={fullScreen} open onClose={onClose} aria-labelledby='responsive-dialog-title'>
      <DialogTitle id='responsive-dialog-title'>{message}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={onClickNot}>
          No
        </Button>
        <Button onClick={onClickYes} autoFocus>
          Si
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
