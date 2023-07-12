import clsx from 'clsx';

import { Button } from '@app/components';

import { DeleteOutlineIcon, VisibilityOutlinedIcon } from '@assets/icons';
import { IconButton, useTheme } from '@mui/material';

const ViewButton = ({ className, ...props }: ViewButtonProps) => {
  return (
    <Button color='primary' icon={<VisibilityOutlinedIcon />} outlined className={clsx(className)} {...props}>
      Ver
    </Button>
  );
};

export const ViewIconButton = ({ ...props }) => {
  const theme = useTheme();
  return (
    <IconButton
      color='primary'
      aria-label='view'
      {...props}
      sx={{
        ':hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          transition: 'ease-out',
          // transitionDuration: '0.3s',
          transitionDuration: theme.transitions.duration.standard,
        },
      }}
    >
      <VisibilityOutlinedIcon />
    </IconButton>
  );
};

type ViewButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default ViewButton;
