import type { ReactNode } from 'react';

import { Button, useTheme } from '@mui/material';

const ActionButton = ({ icon, label, onClick, colorPrimary }: ActionButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      onClick={onClick}
      color={colorPrimary ? 'primary' : 'secondary'}
      sx={{
        width: '130px',
        paddingX: '24px',
        paddingY: '8px',
        // borderRight: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 0,
      }}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

type ActionButtonProps = {
  icon: ReactNode;
  label: string;
  colorPrimary?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default ActionButton;
