import { VisibilityOutlinedIcon } from '@assets/icons';
import { IconButton, useTheme } from '@mui/material';

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
          transitionDuration: 3000,
        },
      }}
    >
      <VisibilityOutlinedIcon />
    </IconButton>
  );
};
