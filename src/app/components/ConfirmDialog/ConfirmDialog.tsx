import { useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// TODO: Update is loading prop in order to show some loading animation.
const ConfirmDialog = ({ message, onClickYes, onClickNot, onClose }: ConfirmDialogProps) => {
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
    <Dialog fullScreen={fullScreen} open onClose={onClose}>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleClickNot} disabled={isLoading}>
          No
        </Button>
        <Button onClick={handleClickYes} disabled={isLoading}>
          Si
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type ConfirmDialogProps = {
  message: string;
  onClickYes: () => void;
  onClickNot: () => void;
  onClose: () => void;
};

export default ConfirmDialog;
