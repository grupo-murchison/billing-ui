import { AlertColor } from '@mui/material';

export interface ToastContextProps {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
}

export interface ToastOptions {
  message: string;
  severity?: AlertColor;
  duration?: number;
}

export type ToastProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  severity?: AlertColor;
  duration: number;
};

export type ToastDeprecatedProps = {
  open: boolean;
  error?: boolean;
  message: string;
  onClose: () => void;
};
