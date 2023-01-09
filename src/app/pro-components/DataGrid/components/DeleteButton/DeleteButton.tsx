import clsx from 'clsx';

import { Button } from '@app/components';

import { DeleteOutlineIcon } from '@assets/icons';

const DeleteButton = ({ className, ...props }: DeleteButtonProps) => {
  return (
    <Button color='primary' icon={<DeleteOutlineIcon />} outlined className={clsx(className)} {...props}>
      Eliminar
    </Button>
  );
};

type DeleteButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default DeleteButton;
