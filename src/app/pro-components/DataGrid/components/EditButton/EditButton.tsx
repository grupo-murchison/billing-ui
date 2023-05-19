import clsx from 'clsx';

import { Button } from '@app/components';

import { EditOutlinedIcon } from '@assets/icons';
import { IconButton } from '@mui/material';

const EditButton = ({ className, ...props }: EditButtonProps) => {
  return (
    <Button color='primary' icon={<EditOutlinedIcon />} outlined className={clsx(className)} {...props}>
      Editar
    </Button>
  );
};

export const EditIconButton = ({ ...props }) => {
  return (
    <IconButton color='primary' aria-label='edit' {...props}>
      <EditOutlinedIcon />
    </IconButton>
  );
};

type EditButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default EditButton;
