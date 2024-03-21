import { DeleteOutlineIcon } from '@assets/icons';
import { IconButton, useTheme } from '@mui/material';

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
        },
      }}
    >
      <DeleteOutlineIcon />
    </IconButton>
  );
};
