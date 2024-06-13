import { ReactNode, createContext, useContext } from 'react';
import Toast from './Toast';
import { useToast } from './useToast';
import { ToastContextProps, ToastOptions } from './types';



const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const { open, message, severity, duration, show, hide } = useToast();

  const showToast = (options: ToastOptions) => {
    show(options);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast: hide }}>
      {children}
      <Toast open={open} message={message} severity={severity} duration={duration} onClose={hide} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
