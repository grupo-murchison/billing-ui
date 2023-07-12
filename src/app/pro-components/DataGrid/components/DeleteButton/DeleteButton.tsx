import clsx from 'clsx';

import { Button } from '@app/components';

import { DeleteOutlineIcon } from '@assets/icons';
import { IconButton, useTheme } from '@mui/material';

const DeleteButton = ({ className, ...props }: DeleteButtonProps) => {
  return (
    <Button color='primary' icon={<DeleteOutlineIcon />} outlined className={clsx(className)} {...props}>
      Eliminar
    </Button>
  );
};

export const DeleteIconButton = ({ ...props }) => {
  const theme = useTheme();
  return (
    <IconButton
      color='primary'
      aria-label='delete'
      {...props}
      sx={{
        ':hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          transition: 'ease-out',
          transitionDuration: '0.3s',
          // transitionDuration: theme.transitions.duration.standard,
        },
      }}
    >
      <DeleteOutlineIcon />
    </IconButton>
  );
};

type DeleteButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default DeleteButton;
