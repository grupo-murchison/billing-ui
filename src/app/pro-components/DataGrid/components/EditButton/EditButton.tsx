import { EditOutlinedIcon } from '@assets/icons';
import { IconButton, useTheme } from '@mui/material';

export const EditIconButton = ({ ...props }) => {
  const theme = useTheme();
  return (
    <IconButton
      color='primary'
      aria-label='edit'
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
      <EditOutlinedIcon />
    </IconButton>
  );
};
