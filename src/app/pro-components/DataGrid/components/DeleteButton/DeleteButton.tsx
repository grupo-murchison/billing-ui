import clsx from 'clsx';

import { Button } from '@app/components';

import { DeleteOutlineIcon } from '@assets/icons';
import { IconButton } from '@mui/material';

const DeleteButton = ({ className, ...props }: DeleteButtonProps) => {
  return (
    <Button color='primary' icon={<DeleteOutlineIcon />} outlined className={clsx(className)} {...props}>
      Eliminar
    </Button>
  );
};

export const DeleteIconButton = ({ ...props }) => {
  return (
    <IconButton color='primary' aria-label='delete' {...props}>
      <DeleteOutlineIcon />
    </IconButton>
  );
};

type DeleteButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default DeleteButton;
