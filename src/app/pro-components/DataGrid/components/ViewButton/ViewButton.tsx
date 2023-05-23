import clsx from 'clsx';

import { Button } from '@app/components';

import { DeleteOutlineIcon, VisibilityOutlinedIcon } from '@assets/icons';
import { IconButton } from '@mui/material';

const ViewButton = ({ className, ...props }: ViewButtonProps) => {
  return (
    <Button color='primary' icon={<VisibilityOutlinedIcon />} outlined className={clsx(className)} {...props}>
      Ver
    </Button>
  );
};

export const ViewIconButton = ({ ...props }) => {
  return (
    <IconButton color='primary' aria-label='view' {...props}>
      <VisibilityOutlinedIcon />
    </IconButton>
  );
};

type ViewButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default ViewButton;
