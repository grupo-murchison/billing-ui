import { Alert, Snackbar } from '@mui/material';
import { memo } from 'react';
import { ToastDeprecatedProps, ToastProps } from './types';

export function ToastDeprecated({ open, message, error, onClose }: ToastDeprecatedProps) {
  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
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

const Toast = ({ duration, open, message, severity, onClose }: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={severity} variant='filled' sx={{ width: '100%' }} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default memo(Toast);
