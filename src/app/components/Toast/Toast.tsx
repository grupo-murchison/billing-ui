import { Alert, Snackbar } from '@mui/material';

function Toast({ open, message, error, onClose }: Toast) {
  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={error ? 'error' : 'info'} variant='filled' sx={{ width: '100%' }} onClose={handleCloseSnackbar}>
        {message}
      </Alert>
    </Snackbar>
  );
}

type Toast = {
  open: boolean;
  error?: boolean;
  message: string;
  onClose: () => void;
};

export default Toast;
