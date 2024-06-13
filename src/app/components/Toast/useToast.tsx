import { useState, useCallback } from 'react';
import { AlertColor } from '@mui/material';
import { ToastOptions } from './types';

export const useToast = (defaultDuration = 4000) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [duration, setDuration] = useState(defaultDuration);

  const show = useCallback(
    (options: ToastOptions) => {
      const { message, severity: optSeverity = 'info', duration: optDuration = defaultDuration } = options;
      setMessage(message);
      setSeverity(optSeverity);
      setDuration(optDuration);
      setOpen(true);
    },
    [defaultDuration],
  );

  const hide = useCallback(() => {
    setOpen(false);
  }, []);

  return { open, message, severity, duration, show, hide };
};
